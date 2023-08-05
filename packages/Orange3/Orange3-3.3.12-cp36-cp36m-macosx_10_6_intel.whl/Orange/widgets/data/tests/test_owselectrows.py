# Test methods with long descriptive names can omit docstrings
# pylint: disable=missing-docstring
from AnyQt.QtCore import QLocale, Qt
from AnyQt.QtTest import QTest
from AnyQt.QtWidgets import QLineEdit

from Orange.data import (
    Table, ContinuousVariable, StringVariable, DiscreteVariable)
from Orange.widgets.data.owselectrows import (
    OWSelectRows, FilterDiscreteType, SelectRowsContextHandler)
from Orange.widgets.tests.base import WidgetTest

from Orange.data.filter import FilterContinuous, FilterString
from Orange.widgets.tests.utils import simulate, override_locale

CFValues = {
    FilterContinuous.Equal: ["5.4"],
    FilterContinuous.NotEqual: ["5.4"],
    FilterContinuous.Less: ["5.4"],
    FilterContinuous.LessEqual: ["5.4"],
    FilterContinuous.Greater: ["5.4"],
    FilterContinuous.GreaterEqual: ["5.4"],
    FilterContinuous.Between: ["5.4", "6.0"],
    FilterContinuous.Outside: ["5.4", "6.0"],
    FilterContinuous.IsDefined: [],
}


SFValues = {
    FilterString.Equal: ["aardwark"],
    FilterString.NotEqual: ["aardwark"],
    FilterString.Less: ["aardwark"],
    FilterString.LessEqual: ["aardwark"],
    FilterString.Greater: ["aardwark"],
    FilterString.GreaterEqual: ["aardwark"],
    FilterString.Between: ["aardwark", "cat"],
    FilterString.Outside: ["aardwark"],
    FilterString.Contains: ["aa"],
    FilterString.StartsWith: ["aa"],
    FilterString.EndsWith: ["ark"],
    FilterString.IsDefined: []
}

DFValues = {
    FilterDiscreteType.Equal: [0],
    FilterDiscreteType.NotEqual: [0],
    FilterDiscreteType.In: [0, 1],
    FilterDiscreteType.IsDefined: [],
}


class TestOWSelectRows(WidgetTest):
    def setUp(self):
        self.widget = self.create_widget(OWSelectRows)  # type: OWSelectRows

    def test_filter_cont(self):
        iris = Table("iris")[::5]
        self.widget.auto_commit = True
        self.widget.set_data(iris)

        for i, (op, _) in enumerate(OWSelectRows.Operators[ContinuousVariable]):
            self.widget.remove_all()
            self.widget.add_row(1, i, CFValues[op])
            self.widget.conditions_changed()
            self.widget.unconditional_commit()

    def test_filter_str(self):
        zoo = Table("zoo")[::5]
        self.widget.auto_commit = False
        self.widget.set_data(zoo)
        for i, (op, _) in enumerate(OWSelectRows.Operators[StringVariable]):
            self.widget.remove_all()
            self.widget.add_row(1, i, SFValues[op])
            self.widget.conditions_changed()
            self.widget.unconditional_commit()

    def test_filter_disc(self):
        lenses = Table("lenses")
        self.widget.auto_commit = False
        self.widget.set_data(lenses)

        for i, (op, _) in enumerate(OWSelectRows.Operators[DiscreteVariable]):
            self.widget.remove_all()
            self.widget.add_row(0, i, DFValues[op])
            self.widget.conditions_changed()
            self.widget.unconditional_commit()

    @override_locale(QLocale.C)  # Locale with decimal point
    def test_continuous_filter_with_c_locale(self):
        iris = Table("iris")[:5]
        self.send_signal("Data", iris)

        # Validating with C locale should accept decimal point
        self.widget.remove_all_button.click()
        self.enterFilter(iris.domain[2], "is below", "5.2")
        self.assertEqual(self.widget.conditions[0][2], ("5.2",))

        # but not decimal comma
        self.widget.remove_all_button.click()
        self.enterFilter(iris.domain[2], "is below", "5,2")
        self.assertEqual(self.widget.conditions[0][2], ("52",))

    @override_locale(QLocale.Slovenian)  # Locale with decimal comma
    def test_continuous_filter_with_sl_SI_locale(self):
        iris = Table("iris")[:5]
        self.send_signal("Data", iris)

        # sl_SI locale should accept decimal comma
        self.widget.remove_all_button.click()
        self.enterFilter(iris.domain[2], "is below", "5,2")
        self.assertEqual(self.widget.conditions[0][2], ("5,2",))

        # but not decimal point
        self.widget.remove_all_button.click()
        self.enterFilter(iris.domain[2], "is below", "5.2")
        self.assertEqual(self.widget.conditions[0][2], ("52",))

    def enterFilter(self, variable, filter, value, value2=None):
        row = self.widget.cond_list.model().rowCount()
        self.widget.add_button.click()

        var_combo = self.widget.cond_list.cellWidget(row, 0)
        simulate.combobox_activate_item(var_combo, variable.name, delay=0)

        oper_combo = self.widget.cond_list.cellWidget(row, 1)
        simulate.combobox_activate_item(oper_combo, filter, delay=0)

        value_inputs = self.widget.cond_list.cellWidget(row, 2).children()
        value_inputs = [w for w in value_inputs if isinstance(w, QLineEdit)]
        QTest.mouseClick(value_inputs[0], Qt.LeftButton)
        QTest.keyClicks(value_inputs[0], value, delay=0)
        QTest.keyClick(value_inputs[0], Qt.Key_Enter)
        if value2 is not None:
            QTest.mouseClick(value_inputs[1], Qt.LeftButton)
            QTest.keyClicks(value_inputs[1], value2, delay=0)
            QTest.keyClick(value_inputs[1], Qt.Key_Enter)

    @override_locale(QLocale.Slovenian)
    def test_stores_settings_in_invariant_locale(self):
        iris = Table("iris")[:5]
        self.send_signal("Data", iris)

        # sl_SI locale should accept decimal comma
        self.widget.remove_all_button.click()
        self.enterFilter(iris.domain[2], "is below", "5,2")
        self.assertEqual(self.widget.conditions[0][2], ("5,2",))

        context = self.widget.current_context
        self.send_signal("Data", None)
        saved_condition = context.values["conditions"][0]
        self.assertEqual(saved_condition[2][0], 5.2)



    @override_locale(QLocale.C)
    def test_restores_continuous_filter_in_c_locale(self):
        iris = Table("iris")[:5]
        # Settings with string value
        self.widget = self.widget_with_context(
            iris.domain, [["sepal length", 2, ("5.2",)]])
        self.send_signal("Data", iris)

        values = self.widget.conditions[0][2]
        self.assertTrue(values[0].startswith("5.2"))

        # Settings with float value
        self.widget = self.widget_with_context(
            iris.domain, [["sepal length", 2, (5.2,)]])
        self.send_signal("Data", iris)

        values = self.widget.conditions[0][2]
        self.assertTrue(values[0].startswith("5.2"))

    @override_locale(QLocale.Slovenian)
    def test_restores_continuous_filter_in_sl_SI_locale(self):
        iris = Table("iris")[:5]
        # Settings with string value
        self.widget = self.widget_with_context(
            iris.domain, [["sepal length", 2, ("5.2",)]])
        self.send_signal("Data", iris)

        values = self.widget.conditions[0][2]
        self.assertTrue(values[0].startswith("5,2"))

        # Settings with float value
        self.widget = self.widget_with_context(
            iris.domain, [["sepal length", 2, (5.2,)]])
        self.send_signal("Data", iris)

        values = self.widget.conditions[0][2]
        self.assertTrue(values[0].startswith("5,2"))

    def widget_with_context(self, domain, conditions):
        ch = SelectRowsContextHandler()
        context = ch.new_context(domain, *ch.encode_domain(domain))
        context.values = dict(conditions=conditions)
        settings = dict(context_settings=[context])

        return self.create_widget(OWSelectRows, settings)
