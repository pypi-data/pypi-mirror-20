import pytc
from qtpy.QtGui import *
from qtpy.QtCore import *
from qtpy.QtWidgets import *

import inspect
import re

class AddExperimentWindow(QWidget):
    """
    add experiment pop-up box
    """

    def __init__(self, fitter, on_close_function):

        super().__init__()

        subclasses = pytc.indiv_models.ITCModel.__subclasses__()
        self._models = {re.sub(r"(\w)([A-Z])", r"\1 \2", i.__name__): i for i in subclasses}

        self._exp_file = None
        self._shot_start = 1
        self._fitter = fitter

        self._on_close_function = on_close_function

        self.layout()

    def layout(self):
        """
        """
        # exp text, model dropdown, shots select
        main_layout = QGridLayout(self)

        new_widgets = QFrame()
        self._new_w_layout = QGridLayout()
        new_widgets.setLayout(self._new_w_layout)
        new_widgets.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)

        self._gen_widgets = {}

        model_select = QComboBox(self)
        model_names = list(self._models.keys())
        model_names.sort()

        for k in model_names:
            model_select.addItem(k)

        self._exp_model = self._models[str(model_select.currentText())]
        model_select.activated[str].connect(self.model_select)

        load_exp = QPushButton("Load File", self)
        load_exp.clicked.connect(self.add_file)

        self._exp_label = QLabel("...", self)
        model_label = QLabel("Select Model: ", self)
        shot_label = QLabel("Shot Start: ", self)

        shot_start_text = QLineEdit(self)
        shot_start_text.setText("0")
        shot_start_text.textChanged[str].connect(self.shot_select)

        gen_exp = QPushButton("OK", self)
        gen_exp.clicked.connect(self.generate)

        self.update_widgets()

        main_layout.addWidget(load_exp, 0, 0)
        main_layout.addWidget(self._exp_label, 0, 1)
        main_layout.addWidget(model_label, 1, 0)
        main_layout.addWidget(model_select, 1, 1)
        main_layout.addWidget(shot_label, 2, 0)
        main_layout.addWidget(shot_start_text, 2, 1)
        main_layout.addWidget(new_widgets, 3, 0, 1, 2)
        main_layout.addWidget(gen_exp, 4, 1)

        self.setWindowTitle('Add Experiment to Fitter')

    def update_widgets(self):
        """
        """
        # check for any model specific parameters and update text fields with those values
        self._gen_widgets = {}

        for i in reversed(range(self._new_w_layout.count())): 
            self._new_w_layout.itemAt(i).widget().deleteLater()

        parent_req = pytc.indiv_models.ITCModel()

        sig_parent = inspect.getargspec(parent_req.__init__)
        sig_child = inspect.getargspec(self._exp_model.__init__)

        args = {arg: param for arg, param in zip(sig_child.args[1:], sig_child.defaults)}

        unique = list(set(sig_child.args) - set(sig_parent.args))

        for i in unique:
            self._gen_widgets[i] = QLineEdit(self)
            self._gen_widgets[i].setText(str(args[i]))

        # add widgets to the pop-up box
        position = 0

        for name, entry in self._gen_widgets.items():
            label_name = str(name).replace("_", " ") + ": "
            label = QLabel(label_name.title(), self)

            self._new_w_layout.addWidget(label, position, 0)
            self._new_w_layout.addWidget(entry, position, 1)

            position += 1

    def model_select(self, model):
        """
        """
        self._exp_model = self._models[model]
        self.update_widgets()

    def shot_select(self, shot):
        """
        """
        try:
            self._shot_start = int(shot)
        except:
            pass

    def add_file(self):
        """
        """
        file_name, _ = QFileDialog.getOpenFileName(self, "Select a file...", "", filter="DH Files (*.DH)")
        self._exp_file = str(file_name)
        self._exp_name = file_name.split("/")[-1]
        self._exp_label.setText(self._exp_name)

    def generate(self):
        """
        """
        if self._exp_file != None:

            # set up dictionary for paramter names and their values in float or int
            model_param = {}
            for k, v in self._gen_widgets.items():
                val = None
                if "." in v.text():
                    val = float(v.text())
                else:
                    val = int(v.text())

                model_param[k] = val

            itc_exp = pytc.ITCExperiment(self._exp_file, self._exp_model, shot_start = self._shot_start, **model_param)
            self._fitter.add_experiment(itc_exp)

            self._on_close_function()
            self.close()
        else:
            error_message = QMessageBox.warning(self, "warning", "No .DH file provided", QMessageBox.Ok)
            
