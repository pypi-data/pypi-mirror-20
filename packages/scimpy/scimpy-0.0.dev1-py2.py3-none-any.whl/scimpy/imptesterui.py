# -*- coding: utf-8 -*-
"""
Created on Mon Mar  7 22:18:45 2016

@author: showard
"""
import pyaudio
import scimpy.speakertest as speakertest
from matplotlib import use
use('Qt4Agg')
from matplotlib.backends import qt_compat
use_pyside = qt_compat.QT_API == qt_compat.QT_API_PYSIDE
if use_pyside:
    from PySide import QtGui
else:
    from PyQt4 import QtGui


class MeasurementParamsForm(QtGui.QGroupBox):
    """Widget form for entering measurement parameters"""
    def __init__(self, title):
        super(MeasurementParamsForm, self).__init__(title)
        layout = QtGui.QFormLayout()
        self.sampleratelineedit = QtGui.QLineEdit()
        self.bufferlineedit = QtGui.QLineEdit("0")
        self.bufferlineedit.setToolTip("0=auto")
        self.bitwidthcombobox = QtGui.QComboBox()
        self.bitwidthcombobox.addItems(["8", "16", "32"])
        self.bitwidthcombobox.setCurrentIndex(1)
        self.durationlineedit = QtGui.QLineEdit("2")
        layout.addRow("Sampling Rate (kHz):", self.sampleratelineedit)
        layout.addRow("Buffer Size (frames, 0=auto):", self.bufferlineedit)
        layout.addRow("Data width (bits):", self.bitwidthcombobox)
        layout.addRow("Measurement Duration (s):", self.durationlineedit)
        self.setLayout(layout)


class SoundDeviceGroupBox(QtGui.QGroupBox):
    def __init__(self, title, parent, role):
        assert role == "Input" or "Output"
        super(SoundDeviceGroupBox, self).__init__(title, parent)

        def get_sc_info():
            """Returns a list of available devices on the default host api
            along with the information on the default input device"""
            pya = pyaudio.PyAudio()
            sc_info = [pya.get_device_info_by_index(n)
                       for n in range(pya.get_device_count())]
            default_device = pya.get_default_host_api_info()[
                "default"+role+"Device"]
            return [sc_info, default_device]

        def set_layout():
            layout = QtGui.QVBoxLayout()
            layout.addWidget(self.devlistwidg)
            layout.addWidget(self.deviceinfolabel)
            self.setLayout(layout)

        def populate_dev_list(sc_info, role):
            for k in sc_info:
                if k['max'+role+'Channels'] > 0:
                    # Just show cards with inputs
                    self.devlistwidg.addItem("%s" % k["name"])
                else:
                    # Adding a hidden item for devices with
                    # no inputs to maintain the index offset
                    hiddenitem = QtGui.QListWidgetItem()
                    hiddenitem.setText("%s" % k["name"])
                    self.devlistwidg.addItem(hiddenitem)
                    hiddenitem.setHidden(True)

        def update_textbox(current):
            """When input device selection changes, this function updates the
            displayed device information and sets the output device index"""
            new_row = self.devlistwidg.row(current)
            devinfolabel = self.deviceinfolabel
            print(sc_info[new_row])
            devinfolabel.setText("Default Sampling Rate (Hz): {0:.0f}\n"
                                 "Max {4} Channels: {1}\n"
                                 "Suggested {4} Buffer (frames): {2}-{3}\n"
                                 .format(sc_info[new_row]["defaultSampleRate"],
                                         sc_info[new_row]
                                         ["max"+role+"Channels"],
                                         int(sc_info[new_row]
                                             ["defaultLow"+role+"Latency"] *
                                             sc_info[new_row]
                                             ["defaultSampleRate"]),
                                         int(sc_info[new_row]
                                             ["defaultHigh"+role+"Latency"] *
                                             sc_info[new_row]
                                             ["defaultSampleRate"]),
                                         role))
            self.parentWidget().measformwidget.sampleratelineedit.setText(
                "{}".format(int(sc_info[new_row]["defaultSampleRate"])))
            self.parentWidget().measurement_engine.set_device_ndx(
                new_row, role)

        [sc_info, default_device] = get_sc_info()
        self.devlistwidg = QtGui.QListWidget()
        self.deviceinfolabel = QtGui.QLabel()
        populate_dev_list(sc_info, role)

        self.devlistwidg.currentItemChanged.connect(update_textbox)
        self.devlistwidg.setCurrentItem(self.devlistwidg.item(default_device))

        set_layout()


class ImpTester(QtGui.QWidget):
    """Widget to control and analyze impedance measurements"""
    def __init__(self, parent):
        super(ImpTester, self).__init__(parent)
        self.measurement_engine = speakertest.SpeakerTestEngine(
            self.window().plotwidget.canvas)
        self.measformwidget = MeasurementParamsForm("Measurement Parameters")
        self.init_ui()

    def init_ui(self):
        """Method to initialize UI and widget callbacks"""

        pya = pyaudio.PyAudio()

        def verify_sc_settings():
            """Tests whether current settings are supported and displays result
            in statusbar"""
            inlistwidg = inputcardgroup.devlistwidg
            outlistwidg = outputcardgroup.devlistwidg
            measformwidget = self.measformwidget
            try:
                supported = pya.is_format_supported(
                    rate=float(measformwidget.sampleratelineedit.text()),
                    input_device=inlistwidg.row(inlistwidg.currentItem()),
                    input_channels=2,
                    input_format=pya.get_format_from_width(
                        int(measformwidget.bitwidthcombobox.currentText())/8),
                    output_device=outlistwidg.row(outlistwidg.currentItem()),
                    output_channels=2,
                    output_format=pya.get_format_from_width(
                        int(measformwidget.bitwidthcombobox.currentText())/8))
                if supported:
                    statusbar.showMessage(
                        "These settings are supported!", 3000)
            except ValueError as err:
                statusbar.showMessage("ERROR: "+str(err), 3000)

        def run_measurement():
            """Performs measurement with user selected settings"""
            measformwidget = self.measformwidget
            self.measurement_engine.run(
                framesize=int(measformwidget.bufferlineedit.text()),
                datarate=int(float(measformwidget.sampleratelineedit.text())),
                duration=float(measformwidget.durationlineedit.text()),
                width=int(measformwidget.bitwidthcombobox.currentText())/8.0)

        statusbar = self.window().statusbar

        btn = QtGui.QPushButton('Verify Soundcard Capabillities')
        btn.clicked.connect(verify_sc_settings)

        runbtn = QtGui.QPushButton('Begin Test')
        runbtn.clicked.connect(run_measurement)

        inputcardgroup = SoundDeviceGroupBox("Input Device", self, "Input")
        outputcardgroup = SoundDeviceGroupBox("Output Device", self, "Output")

        layout = QtGui.QVBoxLayout()
        layout.addWidget(outputcardgroup)
        layout.addWidget(inputcardgroup)
        layout.addWidget(self.measformwidget)
        layout.addWidget(btn)
        layout.addWidget(runbtn)

        self.setLayout(layout)
