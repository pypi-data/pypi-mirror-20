# Copyright (c) 2016, Tim Wentzlau
# Licensed under MIT
"""
A Kervi controller is a class that acts upon input from users or events or the underlaying os.
"""

from kervi.spine import Spine
from kervi.utility.thread import KerviThread
from kervi.utility.component import KerviComponent
from kervi.hal import GPIO
class ControllerSelect(KerviComponent):
    r"""
    Select component for Kervi controller

    Usage:

    .. code-block:: python

        class CameraFrameRate(ControllerSelect):
            def __init__(self, controller):
            ControllerSelect.__init__(self, controller.controllerId+".framerate", "Framerate" , controller)
            self.addOption("5", "5 / sec")
            self.addOption("10", "10 / sec")
            self.addOption("15", "15 / sec", True)

        def change(self, selectedOptions):
            print("Frame rate changed", selectedOptions)

    """
    def __init__(self, select_id, name, controller):
        KerviComponent.__init__(self, select_id, "select", name)
        #self.spine = Spine()
        self.controller = controller
        self.options = []
        self.selected_options = []
        self.change_command = self.component_id + ".change"
        self.spine.register_command_handler(self.change_command, self._on_change_handler)
        self._ui_parameters = {
            "size": 1,
            "type": "dropdown",
            "link_to_header": False,
            "icon": None,
            "flat": False,
            "inline": False
        }

    def link_to_dashboard(self, dashboard_id, section_id, **kwargs):
        r"""
        Links this component to a dashboard section.

        :param dashboard_id:
            id of the dashboard to link to.
        :type section_id: str

        :param section_id:
            id of the section.
        :type section_id: str

        :param \**kwargs:
            Use the kwargs below to override default values set in ui_parameters

        :Keyword Arguments:
            * *ui_size* (``int``) -- Size of the component in dashboard unit size.
                In order to make the sections and components align correct a dashboard unit is defined.
                Default the dashboard unit is a square that is 150 x 150 pixels.
                The width of the select box is ui_size * dashboard unit size.

            * *type* (``str``) -- Type of select box, dropdown or list.
            * *link_to_header* (``str``) -- Add this component to header of section.
            * *icon* (``str``) -- Icon that should be displayed together with label.
            * *flat* (``bool``) -- Flat look and feel.

        """
        KerviComponent.link_to_dashboard(
            self,
            dashboard_id,
            section_id,
            *kwargs
            )

    def _get_info(self):
        return {
            "onSelect": self.change_command,
            "options": self.options,
        }

    def add_option(self, value, text, selected=False):
        """
        Add option to select
        """
        option = {"value": value, "text": text, "selected":selected}
        self.options += [option]
        if selected:
            self.selected_options += [option]


    def _on_change_handler(self, selected_options):
        self.spine.log.debug(
            "controller select change:{0}/{1}",
            self.controller.component_id,
            self.component_id
        )

        for option in self.options:
            option["selected"] = False

        self.selected_options = []

        for selected_option in selected_options:
            for option in self.options:
                if option["value"] == selected_option:
                    option["selected"] = True
                    self.selected_options += [option]

        self.change(self.selected_options)
        self.spine.trigger_event(
            "controllerSelectChange",
            self.component_id,
            {"select":self.component_id, "value":self.options}
        )

    def change(self, selected_options):
        """ Abstract method fill in with your own code to be executed when a change occur. """
        self.spine.log.debug(
            "abstract select change reached:{0}/{1}",
            self.controller.component_id,
            self.component_id,
        )

class ControllerButton(KerviComponent):
    def __init__(self, button_id, name, controller):
        KerviComponent.__init__(self, button_id, "button", name)
        self.controller = controller
        self.state = False
        self.click_command = self.component_id + ".click"
        self.spine.register_command_handler(self.click_command, self._on_click_handler)
        self._ui_parameters = {
            "size": 1,
            "type": "normal",
            "link_to_header": False,
            "icon": None,
            "flat": False,
            "inline": False
        }

    def link_to_dashboard(self, dashboard_id, section_id, **kwargs):
        r"""
        Links this component to a dashboard section.

        :param dashboard_id:
            id of the dashboard to link to.
        :type section_id: str

        :param section_id:
            id of the section.
        :type section_id: str

        :param \**kwargs:
            Use the kwargs below to override default values set in ui_parameters

        :Keyword Arguments:
            * *ui_size* (``int``) -- Size of the component in dashboard unit size.
                In order to make the sections and components align correct a dashboard unit is defined.
                Default the dashboard unit is a square that is 150 x 150 pixels.
                The width of the select box is ui_size * dashboard unit size.

            * *type* (``str``) -- Type of select box, dropdown or list.
            * *link_to_header* (``str``) -- Add this component to header of section.
            * *icon* (``str``) -- Icon that should be displayed together with label.
            * *flat* (``bool``) -- Flat look and feel.

        """
        KerviComponent.link_to_dashboard(
            self,
            dashboard_id,
            section_id,
            **kwargs
            )

    def _get_info(self):
        return {
            "onClick":self.click_command
        }

    def _on_click_handler(self):
        self.spine.log.debug(
            "controller button click:{0}/{1}",
            self.controller.component_id,
            self.component_id
        )
        self.click()
        self.spine.trigger_event("controllerButtonClick", self.component_id)

    def click(self):
        """
        Abstract method fill in with your own code that should be executed when button is clicked.
        """
        self.spine.log.debug(
            "abstract click reached:{0}/{1}",
            self.controller.component_id,
            self.component_id,
        )

class ControllerSwitchButton(KerviComponent):
    """
    Switch button controller component, shows a on/off button in UI
    """
    def __init__(self, button_id, name, controller):
        KerviComponent.__init__(self, button_id, "switchButton", name)
        #self.spine = Spine()
        self.controller = controller
        self.state = False

        self.on_command = self.component_id + ".on"
        self.off_command = self.component_id + ".off"

        self.spine.register_command_handler(self.on_command, self._on_on_handler)
        self.spine.register_command_handler(self.off_command, self._on_off_handler)
        self._ui_parameters = {
            "size": 0,
            "type": "normal",
            "link_to_header": False,
            "icon": None,
            "flat": False,
            "on_text": "On",
            "off_text": "Off",
            "show_name": True,
            "inline": False,
            "on_icon": None,
            "off_icon": None,
            "read_only": False
        }

    def link_to_dashboard(self, dashboard_id, section_id, **kwargs):
        r"""
        Links this component to a dashboard section.

        :param dashboard_id:
            id of the dashboard to link to.
        :type section_id: str

        :param section_id:
            id of the section.
        :type section_id: str

        :param \**kwargs:
            Use the kwargs below to override default values set in ui_parameters

        :Keyword Arguments:
            * *ui_size* (``int``) -- Size of the component in dashboard unit size.
                In order to make the sections and components align correct a dashboard unit is defined.
                Default the dashboard unit is a square that is 150 x 150 pixels.
                The width of the select box is ui_size * dashboard unit size.

            * *type* (``str``) -- Type of select box, dropdown or list.
            * *link_to_header* (``str``) -- Add this component to header of section.
            * *icon* (``str``) -- Icon that should be displayed together with label.
            * *flat* (``bool``) -- Flat look and feel.
            * *size* (``int``) -- the size of the button including label and icon. If 0 full width of container
            * *on_text* (``bool``) -- Text to show on button when on.
            * *off_text* (``bool``) -- Text to show on button when off.
            * *on_icon* (``bool``) -- Icon to show on button when on.
            * *off_icon* (``bool``) -- Icon to show on button when off.
            * *show_name* (``bool``) -- Show the name of button as label.
            * *read_only* (``bool``) -- If true the user is not able to change state.
            * *inline* (``bool``) -- Let the button flow in line with other components.


        """
        KerviComponent.link_to_dashboard(
            self,
            dashboard_id,
            section_id,
            *kwargs
            )

    def _get_info(self):
        return {
            "onCommand":self.on_command,
            "offCommand":self.off_command,
            "state":self.state,
        }

    def _on_on_handler(self):
        self.spine.log.debug(
            "controller button on:{0}/{1}",
            self.controller.component_id,
            self.component_id
        )

        if not self.state:
            self.state = True
            self.on()
            self.spine.trigger_event(
                "controllerButtonStateChange",
                self.component_id,
                {"button":self.component_id, "state":self.state}
            )

    def on(self):
        """
        Abstract method fill that is executed when button is turned on.
        """
        self.spine.log.debug(
            "abstract on reached:{0}/{1}",
            self.controller.component_id,
            self.component_id,
        )


    def _on_off_handler(self):
        self.spine.log.debug(
            "controller button off:{0}/{1}",
            self.controller.component_id,
            self.component_id
        )
        if self.state:
            self.state = False
            self.off()
            self.spine.trigger_event(
                "controllerButtonStateChange",
                self.component_id,
                {"button":self.component_id, "state":self.state}
            )

    def off(self):
        """
        Abstract method that is executed then button is turned off.
        """
        self.spine.log.debug(
            "abstract off reached:{0}/{1}",
            self.controller.component_id,
            self.component_id,
        )

class ControllerGPIOInput(ControllerSwitchButton):
    """
    GPIO input component, listen to a GPIO pin for going high and low events.
    Shows a on/off button in UI, all the ui parameters for ControllerSwitchButton applies to 
    this input.
    """
    def __init__(self, button_id, name, controller, pin, read_only=True):
        ControllerSwitchButton.__init__(self, button_id, name, pin)
        self.pin = pin
        GPIO.listen(self.pin, self._on_edge)

    def _on_edge(self, state):
        print("state", state)
        if GPIO.get(self.pin):
            self.on_high()
        else:
            self.on_low()

    def on_high(self):
        """
        Abstract method that is executed when pin is going high.
        """
        self.spine.log.debug(
            "abstract on_high reached:{0}/{1}",
            self.controller.component_id,
            self.component_id,
        )

    def on_low(self):
        """
        Abstract method that is executed when pin is going low.
        """
        self.spine.log.debug(
            "abstract on_high reached:{0}/{1}",
            self.controller.component_id,
            self.component_id,
        )


class ControllerNumberInput(KerviComponent):
    """
    A number input component shows as a slider on dashboards.
    """
    def __init__(self, input_id, name, controller):
        KerviComponent.__init__(self, input_id, "number-input", name)
        #self.spine = Spine()
        self.controller = controller
        self.min_value = -100
        self.max_value = 100
        self.unit = ""
        self.value = 0
        self.command = self.component_id + ".setValue"
        self.spine.register_command_handler(self.command, self._set_value)
        self._ui_parameters = {
            "size": 1,
            "type": "horizontal_slider",
            "link_to_header": False,
            "icon": None,
            "flat": False,
            "inline": False
        }


    def link_to_dashboard(self, dashboard_id, section_id, **kwargs):
        r"""
        Links this component to a dashboard section.

        :param dashboard_id:
            id of the dashboard to link to.
        :type section_id: str

        :param section_id:
            id of the section.
        :type section_id: str

        :param \**kwargs:
            Use the kwargs below to override default values set in ui_parameters

        :Keyword Arguments:
            * *ui_size* (``int``) -- Size of the component in dashboard unit size.
                In order to make the sections and components align correct a dashboard unit is defined.
                Default the dashboard unit is a square that is 150 x 150 pixels.
                The width of the select box is ui_size * dashboard unit size.

            * *type* (``str``) -- Type of select box, dropdown or list.
            * *link_to_header* (``str``) -- Add this component to header of section.
            * *icon* (``str``) -- Icon that should be displayed together with label.
            * *flat* (``bool``) -- Flat look and feel.

        """
        KerviComponent.link_to_dashboard(
            self,
            dashboard_id,
            section_id,
            *kwargs
            )

    def _set_value(self, nvalue):
        if self.value != nvalue:
            self.spine.log.debug(
                "value change on input:{0}/{1} value:{2}",
                self.controller.component_id,
                self.component_id,
                nvalue
            )
            old_value = self.value
            self.value = nvalue
            self.value_changed(nvalue, old_value)
            self.spine.trigger_event(
                "changeControllerInputValue",
                self.component_id,
                {"input":self.component_id, "value":nvalue}
            )

    def value_changed(self, newValue, old_value):
        self.spine.log.debug(
            "abstract valueChanged reached:{0}/{1}",
            self.controller.component_id,
            self.component_id,
        )

    def _get_info(self):
        return {
            "unit":self.unit,
            "value":self.value,
            "maxValue":self.max_value,
            "minValue":self.min_value,
            "command":self.command,
        }

    def on_get_value(self):
        return self.value

class ControllerTextInput(KerviComponent):
    """
    Text input component
    """
    def __init__(self, input_id, name, controller):
        KerviComponent.__init__(self, input_id, "text-input", name)
        #self.spine = Spine()
        self.controller = controller
        self.value = ""
        self.command = self.component_id + ".setValue"
        self.spine.register_command_handler(self.command, self._set_value)
        self.input_type = "text"
        self._ui_parameters = {
            "size": 1,
            "type": "text",
            "link_to_header": False,
            "icon": None,
            "flat": False,
            "inline": False
        }

    def link_to_dashboard(self, dashboard_id, section_id, **kwargs):
        r"""
        Links this component to a dashboard section.

        :param dashboard_id:
            id of the dashboard to link to.
        :type section_id: str

        :param section_id:
            id of the section.
        :type section_id: str

        :param \**kwargs:
            Use the kwargs below to override default values set in ui_parameters

        :Keyword Arguments:
            * *ui_size* (``int``) -- Size of the component in dashboard unit size.
                In order to make the sections and components align correct a dashboard unit is defined.
                Default the dashboard unit is a square that is 150 x 150 pixels.
                The width of the select box is ui_size * dashboard unit size.

            * *type* (``str``) -- Type of select box, dropdown or list.
            * *link_to_header* (``str``) -- Add this component to header of section.
            * *icon* (``str``) -- Icon that should be displayed together with label.
            * *flat* (``bool``) -- Flat look and feel.

        """
        KerviComponent.link_to_dashboard(
            self,
            dashboard_id,
            *kwargs)

    def _set_value(self, nvalue):
        if self.value != nvalue:
            self.spine.log.debug(
                "value change on input:{0}/{1} value:{2}",
                self.controller.component_id,
                self.component_id,
                nvalue
            )
            old_value = self.value
            self.value = nvalue
            self.value_changed(nvalue, old_value)
            self.spine.trigger_event(
                "changeControllerInputValue",
                self.component_id,
                {"input":self.component_id, "value":nvalue}
            )

    def value_changed(self, new_value, old_value):
        """
        Abstract method called when the content of the text box change.
        """
        self.spine.log.debug(
            "abstract valueChange reached:{0}/{1} value:{2} oldvalue:{3}",
            self.controller.component_id,
            self.component_id,
            new_value,
            old_value
        )

    def _get_info(self):
        return {
            "value":self.value,
            "command":self.command
        }

    def on_get_value(self):
        return self.value

class ControllerDateTimeInput(KerviComponent):
    """
    A date and time component.
    """
    def __init__(self, input_id, name, input_type, controller):
        KerviComponent.__init__(self, input_id, "datetime-input", name)
        #self.spine = Spine()
        self.controller = controller
        self.input_type = input_type
        self.value = ""
        self.command = self.component_id + ".setValue"
        self.spine.register_command_handler(self.command, self._set_value)
        self._ui_parameters = {
            "size": 1,
            "type": "datetime",
            "link_to_header": False,
            "icon": None,
            "flat": False,
            "inline": False
        }

    def link_to_dashboard(self, dashboard_id, section_id, **kwargs):
        r"""
        Links this component to a dashboard section.

        :param dashboard_id:
            id of the dashboard to link to.
        :type section_id: str

        :param section_id:
            id of the section.
        :type section_id: str

        :param \**kwargs:
            Use the kwargs below to override default values set in ui_parameters

        :Keyword Arguments:
            * *ui_size* (``int``) -- Size of the component in dashboard unit size.
                In order to make the sections and components align correct a dashboard unit is defined.
                Default the dashboard unit is a square that is 150 x 150 pixels.
                The width of the select box is ui_size * dashboard unit size.

            * *type* (``str``) -- Type of select box, dropdown or list.
            * *link_to_header* (``str``) -- Add this component to header of section.
            * *icon* (``str``) -- Icon that should be displayed together with label.
            * *flat* (``bool``) -- Flat look and feel.

        """
        KerviComponent.link_to_dashboard(
            self,
            dashboard_id,
            *kwargs
            )

    def _set_value(self, nvalue):
        if self.value != nvalue:
            self.spine.log.debug(
                "value change on input:{0}/{1} value:{2}",
                self.controller.component_id,
                self.component_id,
                nvalue
            )
            old_value = self.value
            self.value = nvalue
            self.value_changed(nvalue, old_value)
            self.spine.trigger_event(
                "changeControllerInputValue",
                self.component_id,
                {"input":self.component_id, "value":nvalue}
            )

    def value_changed(self, newValue, oldValue):
        self.spine.log.debug(
            "abstract valueChanged reached:{0}/{1}",
            self.controller.component_id,
            self.component_id,
        )

    def _get_info(self):
        return {
            "inputType": self.input_type,
            "value":self.value,
            "command":self.command
        }

    def on_get_value(self):
        return self.value

class Controller(KerviComponent):
    """
    A Kervi controller is a class that acts upon input from users or events or the underlaying os.

    Examples for controllers are motor control, servo control, output to IO.

    """
    def __init__(self, controller_id, name):
        KerviComponent.__init__(self, controller_id, "controller", name)
        self.components = []
        self.type = "unknown"
        self.parameters = {}
        self._ui_parameters = {
            "size": 1,
            "type": "normal",
            "link_to_header": False,
            "icon": None,
            "flat": False,
            "inline": False
        }

    def link_to_dashboard(self, dashboard_id, section_id, **kwargs):
        r"""
        Links this component to a dashboard section.

        :param dashboard_id:
            id of the dashboard to link to.
        :type section_id: str

        :param section_id:
            id of the section.
        :type section_id: str

        :param \**kwargs:
            Use the kwargs below to override default values set in ui_parameters

        :Keyword Arguments:
            * *ui_size* (``int``) -- Size of the component in dashboard unit size.
                In order to make the sections and components align correct a dashboard unit is defined.
                Default the dashboard unit is a square that is 150 x 150 pixels.
                The width of the select box is ui_size * dashboard unit size.

            * *type* (``str``) -- Type of select box, dropdown or list.
            * *link_to_header* (``str``) -- Add this component to header of section.
            * *icon* (``str``) -- Icon that should be displayed together with label.
            * *flat* (``bool``) -- Flat look and feel.

        """
        KerviComponent.link_to_dashboard(
            self,
            dashboard_id,
            section_id,
            *kwargs
            )

    def add_components(self, *args):
        for component in args:
            self.components += [component]

    def _get_info(self):
        components = []
        for component in self.components:
            components += [component.get_reference()]

        template = None
        try:
            import os.path
            import sys
            modulepath = os.path.dirname(sys.modules[self.__class__.__module__].__file__)
            class_name = self.__class__.__name__
            cpath = os.path.join(modulepath, class_name + ".tmpl.html")
            if os.path.isfile(cpath):
                template_file = open(cpath, 'r')
                template = template_file.read()
        except:
            pass

        return {
            "components":components,
            "template" : template,
            "type": self.type
        }
