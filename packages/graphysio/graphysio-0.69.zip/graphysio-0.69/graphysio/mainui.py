import sys, csv, os
from functools import partial

import pandas as pd
import numpy as np

from pyqtgraph.Qt import QtGui, QtCore

from graphysio import tsplot, puplot, dialogs, utils, csvio

class MainUi(*utils.loadUiFile('mainwindow.ui')):
    hasdata  = QtCore.pyqtSignal(object)
    haserror = QtCore.pyqtSignal(object)

    def __init__(self, parent=None):
        super().__init__(parent=parent)
        self.setupUi(self)
        self.dircache = os.path.expanduser('~')

        self.tabWidget.tabCloseRequested.connect(self.closeTab)

        launchNewPlot = partial(self.launchReadData, newwidget=True)
        launchAppendPlot = partial(self.launchReadData, newwidget=False)
        self.menuFile.addAction('&New Plot',       launchNewPlot,    QtCore.Qt.CTRL + QtCore.Qt.Key_N)
        self.menuFile.addAction('&Append to Plot', launchAppendPlot, QtCore.Qt.CTRL + QtCore.Qt.Key_A)
        self.menuFile.addSeparator()
        self.menuFile.addAction('&Quit', self.fileQuit, QtCore.Qt.CTRL + QtCore.Qt.Key_Q)

        self.menuData.addAction('Visible &Curves',    self.launchCurveList,      QtCore.Qt.CTRL + QtCore.Qt.Key_C)
        self.menuData.addAction('&Filter',            self.launchFilter,         QtCore.Qt.CTRL + QtCore.Qt.Key_F)
        self.menuData.addAction('Cycle &Detection',   self.launchCycleDetection, QtCore.Qt.CTRL + QtCore.Qt.Key_D)
        self.menuData.addAction('Generate PU-&Loops', self.launchLoop,           QtCore.Qt.CTRL + QtCore.Qt.Key_L)

        self.menuExport.addAction('&Series to CSV',     self.exportSeries)
        self.menuExport.addAction('&Time info to CSV',  self.exportPeriod)
        self.menuExport.addAction('&Cycle info to CSV', self.exportCycles)
        self.menuExport.addAction('&Loop Data',         self.exportLoops)

        self.haserror.connect(self.displayError)

    def launchLoop(self):
        sourcewidget = self.tabWidget.currentWidget()
        if sourcewidget is None:
            return
        dlgSetupPU = dialogs.DlgSetupPULoop(sourcewidget, parent = self)
        if not dlgSetupPU.exec_(): return

        uname, pname = dlgSetupPU.result

        try:
            curves = sourcewidget.curves
            plotdata = sourcewidget.plotdata
            u = curves[uname]
            p = curves[pname]
            subsetrange = sourcewidget.vbrange
            loopwidget = puplot.LoopWidget(u, p, plotdata, subsetrange=subsetrange, parent=self)
        except Exception as e:
            msg = 'Could not create PU loops: {}'.format(e)
            self.haserror.emit(msg)
            return

        tabindex = self.tabWidget.addTab(loopwidget, '{}-loops'.format(plotdata.name))
        self.tabWidget.setCurrentIndex(tabindex)

    def launchCurveList(self):
        plotwidget = self.tabWidget.currentWidget()
        plotwidget.showCurveList()

    def launchCycleDetection(self):
        dlgCycles = dialogs.DlgCycleDetection(parent = self)
        if not dlgCycles.exec_(): return
        choices = dlgCycles.result
        plotwidget = self.tabWidget.currentWidget()
        for curvename, choice in choices.items():
            try:
                curve = plotwidget.curves[curvename]
                plotwidget.addFeet(curve, utils.FootType(choice))
            except Exception as e:
                msg = "{}: {}".format(curvename, e)
                self.haserror.emit(msg)

    def launchFilter(self):
        dlgFilter = dialogs.DlgFilter(parent = self)
        if not dlgFilter.exec_(): return
        choices = dlgFilter.result
        plotwidget = self.tabWidget.currentWidget()
        for curvename, choice in choices.items():
            if choice == 'None':
                continue
            try:
                curve = plotwidget.curves[curvename]
                plotwidget.addFiltered(curve, choice)
            except Exception as e:
                msg = "{}: {}".format(curvename, e)
                self.haserror.emit(msg)

    def launchReadData(self, newwidget=True):
        if newwidget:
            title = "New Plot"
            try:
                self.hasdata.disconnect()
            except:
                pass
            finally:
                self.hasdata.connect(self.createNewPlotWithData)
        else:
            title = "Append to Plot"
            try:
                self.hasdata.disconnect()
            except:
                pass
            finally:
                self.hasdata.connect(self.appendToPlotWithData)

        dlgNewplot = dialogs.DlgNewPlot(parent=self, title=title, directory=self.dircache)
        if not dlgNewplot.exec_(): return
        csvrequest = dlgNewplot.result
        self.dircache = csvrequest.folder
        self.statusBar.showMessage("Loading... {}...".format(csvrequest.name))

        reader = csvio.Reader(csvrequest, self.hasdata, self.haserror)
        QtCore.QThreadPool.globalInstance().start(reader)

    def appendToPlotWithData(self, plotdata):
        plotwidget = self.tabWidget.currentWidget()
        if plotwidget is None:
            self.haserror.emit('No plot selected.')
            return

        qmsg = "Timeshift new curves to make the beginnings coincide?"
        reply = QtGui.QMessageBox.question(self, 'Append to plot', qmsg, QtGui.QMessageBox.Yes, QtGui.QMessageBox.No)
        dorealign = (reply == QtGui.QMessageBox.Yes)

        plotwidget.appendData(plotdata, dorealign)
        self.statusBar.showMessage("Loading... done")

    def createNewPlotWithData(self, plotdata):
        plotwidget = tsplot.PlotWidget(plotdata=plotdata, parent=self)
        tabindex = self.tabWidget.addTab(plotwidget, plotdata.name)
        self.tabWidget.setCurrentIndex(tabindex)
        self.statusBar.showMessage("Loading... done")

    def exportSeries(self):
        plotwidget = self.tabWidget.currentWidget()
        if plotwidget is None:
            return
        #try:
        plotwidget.exporter.seriestocsv()
        #except AttributeError:
        #    self.haserror.emit('Method not available for this plot.')

    def exportPeriod(self):
        plotwidget = self.tabWidget.currentWidget()
        if plotwidget is None:
            return
        try:
            plotwidget.exporter.periodstocsv()
        except AttributeError:
            self.haserror.emit('Method not available for this plot.')

    def exportCycles(self):
        plotwidget = self.tabWidget.currentWidget()
        if plotwidget is None: return
        try:
            plotwidget.exporter.cyclepointstocsv()
        except AttributeError:
            self.haserror.emit('Method not available for this plot.')

    def exportLoops(self):
        plotwidget = self.tabWidget.currentWidget()
        if plotwidget is None: return
        try:
            plotwidget.exporter.exportloops()
        except AttributeError:
            self.haserror.emit('Method not available for this plot.')

    def fileQuit(self):
        self.close()

    def closeTab(self, i):
        w = self.tabWidget.widget(i)
        self.tabWidget.removeTab(i)
        w.close()
        w.deleteLater()
        del w

    def displayError(self, errmsg):
        msgbox = QtGui.QMessageBox()
        msgbox.setWindowTitle("Error")
        msgbox.setText(str(errmsg))
        msgbox.setStandardButtons(QtGui.QMessageBox.Ok)
        msgbox.setIcon(QtGui.QMessageBox.Critical)
        msgbox.exec_()
