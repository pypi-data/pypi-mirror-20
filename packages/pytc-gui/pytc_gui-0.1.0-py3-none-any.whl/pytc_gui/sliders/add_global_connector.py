from qtpy.QtGui import *
from qtpy.QtCore import *
from qtpy.QtWidgets import *

import string, random, inspect, ast

import pytc

class AddGlobalConnectorWindow(QWidget):
    """
    Construct a window that allows the user to build a GlobalConnector object.
    """

    def __init__(self, end_function):
        """
        :param end_function: a function to call when the "OK" button is called.  This
                             should take the connector and param_name to use.
        """
    

        super().__init__()

        self._end_function = end_function

        # Figure out the global connectors loaded
        possible_subclasses = pytc.global_connectors.GlobalConnector.__subclasses__()
        self._global_connectors = dict([(s.__name__,s) for s in possible_subclasses])

        self.layout()

    def layout(self):
        """
        Populate the window.
        """

        main_layout = QGridLayout()
        self.setLayout(main_layout)

        # Combobox widget holding possible connectors
        self._connector_label = QLabel("Select Model: ", self)
        self._connector_select_widget = QComboBox(self)
        connector_names = list(self._global_connectors.keys())
        connector_names.sort()
        for n in connector_names:
            self._connector_select_widget.addItem(n)
        self._connector_select_widget.setCurrentIndex(0)

        # Connector selection call back
        self._connector_select_widget.activated[str].connect(self._update_connector)

        # Input box holding name
        self._connector_name_label = QLabel("Name: ",self)
        self._connector_name_input = QLineEdit(self)

        random_name = "".join([random.choice(string.ascii_letters) for i in range(3)])
        self._connector_name_input.setText(random_name)

        # Connector name call back
        self._connector_name_input.textChanged[str].connect(self._update_connector_name)

        # Parameter selection widget.  This is populated by self._update_connector
        # and self._update_connector_name
        self._connector_args_frame = QFrame(self)
        self._connector_args_layout = QGridLayout(self._connector_args_frame)

        # Populate widgets
        self._update_connector()

        # Final OK button
        self._OK_button = QPushButton("OK", self)
        self._OK_button.clicked.connect(self._return_final_connector)

        # Build grid layout
        main_layout.addWidget(self._connector_label,0,0)
        main_layout.addWidget(self._connector_select_widget,0,1)
        main_layout.addWidget(self._connector_name_label,1,0)
        main_layout.addWidget(self._connector_name_input,1,1)
        main_layout.addWidget(self._connector_args_frame,2,0,1,2)
        main_layout.addWidget(self._OK_button,3,1)

        self.setWindowTitle('Add new global connector')

    def _update_connector(self):
        """
        If the user selects a new connector, repopulate the window appropriately.
        """

        # Grab connector and name
        self._selected_connector_key = self._connector_select_widget.currentText()
        self._connector_name = self._connector_name_input.text()

        # Connector class   
        connector = self._global_connectors[self._selected_connector_key]

        # Create instance of connector class
        self._selected_connector = connector(name=self._connector_name)

        # Remove the existing widgets from args
        while self._connector_args_layout.count():
            item = self._connector_args_layout.takeAt(0)
            if item.widget():
                item.widget().deleteLater()

        # Figure out the args that are specific to this connector
        new_fields = {} 
        connector_args = inspect.getargspec(connector.__init__)
        try:
            offset = len(connector_args.args) - len(connector_args.defaults)
            for i in range(len(connector_args.defaults)):
                new_fields[connector_args.args[i + offset]] = connector_args.defaults[i]

        # TypeError indicates no args...
        except TypeError:
            pass

        # Add the newly selected args back into the connector
        counter = 0
        self._arg_widgets = {}
        for k, v in new_fields.items():

            label = QLabel(k,self)
            box = QLineEdit(self)
            box.setText("{}".format(v))

            self._arg_widgets[k] = box

            self._connector_args_layout.addWidget(label,counter,0)
            self._connector_args_layout.addWidget(box,counter,1)
            counter += 1

        # Create dropdown box for the parameter name to select
        label = QLabel("Select parameter",self)
        parameter_name_box = QComboBox(self)

        # Add the dropdown box to the list
        self._connector_args_layout.addWidget(label,counter,0)      
        self._connector_args_layout.addWidget(parameter_name_box,counter,1) 

        # Update the list of parameters that can be selected
        self._update_param_box()

    def _update_connector_name(self):
        """
        If the user alters the name of the connector, update the parameters.
        """

        # Change inside of connector and update dropdown box with parameters to select
        self._selected_connector.name = self._connector_name_input.text()
        self._update_param_box()

    def _update_param_box(self):
        """
        Update the parameter box.
        """
        
        # Clear existing entries in the dropbox (it's the last widget)
        index = self._connector_args_layout.count() - 1
        param_dropbox = self._connector_args_layout.itemAt(index).widget()
        param_dropbox.clear()

        # Update the names of the parameters
        self._param_names = list(self._selected_connector.local_methods.keys())
        self._param_names.sort()
        for k in self._param_names:
            param_dropbox.addItem(k)
        
    def _return_final_connector(self):
        """
        Construct the final connector, run the end_function, and close.
        """

        # Grab connector and name
        self._selected_connector_key = self._connector_select_widget.currentText()
        self._connector_name = self._connector_name_input.text()
    
        # Connector class   
        connector = self._global_connectors[self._selected_connector_key]

        # Create kwargs to initialize the connector
        kwargs = {} 
        for k, widget in self._arg_widgets.items():
        
            # Parse the value.  
            value = widget.text()

            try:
                final_value = ast.literal_eval(value)
            except ValueError:
                if value.lower() in ["true","t"]:
                    final_value = True
                elif value.lower() in ["false","f"]:
                    final_value = False
                elif value.lower() == "none":
                    final_value = None
                else:
                    final_value = str(value)

            kwargs[k] = final_value

        # Create connector
        self._selected_connector = connector(name=self._connector_name,
                                             **kwargs)

        # Get currently selected parameter name
        index = self._connector_args_layout.count() - 1
        param_dropbox = self._connector_args_layout.itemAt(index).widget()
        var_name = param_dropbox.currentText()

        # Pass data back
        self._end_function(self._selected_connector,self._param_names)

        self.close()
    
