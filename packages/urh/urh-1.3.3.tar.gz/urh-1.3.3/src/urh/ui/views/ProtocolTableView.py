from PyQt5.QtCore import pyqtSignal, Qt
from PyQt5.QtWidgets import QHeaderView, QAction, QMenu, QActionGroup
from PyQt5.QtGui import QKeySequence, QDropEvent, QIcon
import numpy

from urh.signalprocessing.MessageType import MessageType
from urh.signalprocessing.ProtocoLabel import ProtocolLabel
from urh.models.ProtocolTableModel import ProtocolTableModel
from urh.ui.views.TableView import TableView


class ProtocolTableView(TableView):
    show_interpretation_clicked = pyqtSignal(int, int, int, int)
    selection_changed = pyqtSignal()
    protocol_view_change_clicked = pyqtSignal(int)
    row_visibility_changed = pyqtSignal()
    writeable_changed = pyqtSignal(bool)
    crop_sync_clicked = pyqtSignal()
    revert_sync_cropping_wanted = pyqtSignal()
    edit_label_clicked = pyqtSignal(ProtocolLabel)
    files_dropped = pyqtSignal(list)
    participant_changed = pyqtSignal()
    new_messagetype_clicked = pyqtSignal(list) # list of protocol messages
    messagetype_selected = pyqtSignal(MessageType, list)

    def __init__(self, parent=None):
        super().__init__(parent)

        self.verticalHeader().setSectionResizeMode(QHeaderView.Fixed)
        self.horizontalHeader().setSectionResizeMode(QHeaderView.Fixed)

        self.ref_message_action = QAction(self.tr("Mark as reference message"), self)
        self.ref_message_action.setShortcut(QKeySequence("R"))
        self.ref_message_action.setShortcutContext(Qt.WidgetWithChildrenShortcut)
        self.ref_message_action.triggered.connect(self.set_ref_message)

        self.hide_row_action = QAction("Hide selected Rows", self)
        self.hide_row_action.setShortcut(QKeySequence("H"))
        self.hide_row_action.setShortcutContext(Qt.WidgetWithChildrenShortcut)
        self.hide_row_action.triggered.connect(self.hide_row)

        self.addAction(self.ref_message_action)
        self.addAction(self.hide_row_action)

    def model(self) -> ProtocolTableModel:
        return super().model()

    @property
    def selected_messages(self):
        messages = self.model().protocol.messages
        rows = set(i.row() for i in self.selectionModel().selectedIndexes())
        return [messages[i] for i in rows]

    def selectionChanged(self, QItemSelection, QItemSelection_1):
        self.selection_changed.emit()
        super().selectionChanged(QItemSelection, QItemSelection_1)

    def dragMoveEvent(self, event):
        event.accept()

    def dragEnterEvent(self, event):
        event.acceptProposedAction()

    def dropEvent(self, event: QDropEvent):
        if len(event.mimeData().urls()) > 0:
            self.files_dropped.emit(event.mimeData().urls())

    def set_ref_message(self, *args, y=None):
        if self.model().refindex == -1:
            return

        if y is None:
            max_row = numpy.max([index.row() for index in self.selectedIndexes()])
            self.model().refindex = max_row
        else:
            self.model().refindex = self.rowAt(y)

    def hide_row(self, *args, row=None):
        if row is None:
            rows = [index.row() for index in self.selectionModel().selectedIndexes()]
        else:
            rows = [row]

        refindex = self.model().refindex
        for row in rows:
            if row == refindex:
                refindex += 1
            self.hideRow(row)
            self.model().hidden_rows.add(row)
        if refindex < self.model().row_count:
            self.model().refindex = refindex
        self.model().update()
        self.row_visibility_changed.emit()

    def contextMenuEvent(self, event):
        menu = QMenu()

        viewgroup = QActionGroup(self)
        viewmenu = menu.addMenu("View")
        bitAction = viewmenu.addAction("Bits")
        bitAction.setCheckable(True)
        hexAction = viewmenu.addAction("Hex")
        hexAction.setCheckable(True)
        asciiAction = viewmenu.addAction("ASCII")
        asciiAction.setCheckable(True)
        bitAction.setActionGroup(viewgroup)
        hexAction.setActionGroup(viewgroup)
        asciiAction.setActionGroup(viewgroup)

        if self.model().proto_view == 0:
            bitAction.setChecked(True)
        elif self.model().proto_view == 1:
            hexAction.setChecked(True)
        elif self.model().proto_view == 2:
            asciiAction.setChecked(True)

        menu.addSeparator()
        row = self.rowAt(event.pos().y())
        cols = [index.column() for index in self.selectionModel().selectedIndexes() if index.row() == row]
        cols.sort()

        pos = event.pos()
        row = self.rowAt(pos.y())
        min_row, max_row, start, end = self.selection_range()
        selected_messages = self.selected_messages
        particpnt_actions = {}

        if len(selected_messages) == 0:
            selected_participant = -1
            selected_message_type = -1
        else:
            selected_participant = selected_messages[0].participant
            selected_message_type  = selected_messages[0].message_type
            for message in selected_messages:
                if selected_participant != message.participant:
                    selected_participant = -1
                if selected_message_type != message.message_type:
                    selected_message_type  = -1
                if selected_message_type == -1 and selected_participant == -1:
                    break


        if self.model().participants and self.model().protocol and not self.selectionModel().selection().isEmpty():

            partigroup = QActionGroup(self)
            participant_menu = menu.addMenu("Participant")
            none_partipnt_action = participant_menu.addAction("None")
            none_partipnt_action.setCheckable(True)
            none_partipnt_action.setActionGroup(partigroup)

            if selected_participant is None:
                none_partipnt_action.setChecked(True)

            for particpnt in self.model().participants:
                pa = participant_menu.addAction(particpnt.name + " (" + particpnt.shortname + ")")
                pa.setCheckable(True)
                pa.setActionGroup(partigroup)
                if selected_participant == particpnt:
                    pa.setChecked(True)

                particpnt_actions[pa] = particpnt
        else:
            none_partipnt_action = 42

        try:
            selected_label = self.controller.get_labels_from_selection(row, row, cols[0],
                                                                      cols[-1])[0]
            editLabelAction = menu.addAction(self.tr("Edit Label ") + selected_label.name)

        except IndexError:
            editLabelAction = 42
            selected_label = None

        menu.addSeparator()

        createLabelAction = menu.addAction(self.tr("Add protocol label"))
        createLabelAction.setIcon(QIcon.fromTheme("list-add"))

        message_type_menu = menu.addMenu(self.tr("Message type"))
        message_type_group = QActionGroup(self)
        message_type_actions = {}
        for message_type in self.model().protocol.message_types:
            action = message_type_menu.addAction(message_type.name)
            action.setCheckable(True)
            action.setActionGroup(message_type_group)

            if selected_message_type == message_type:
                action.setChecked(True)

            message_type_actions[action] = message_type

        new_message_type_action = message_type_menu.addAction("Create new")

        menu.addSeparator()
        if not self.model().is_writeable:
            showInterpretationAction = menu.addAction(self.tr("Show in Interpretation"))
        else:
            showInterpretationAction = 42

        menu.addSeparator()
        menu.addAction(self.hide_row_action)
        hidden_rows = self.model().hidden_rows
        showRowAction = 42
        if len(hidden_rows) > 0:
            showRowAction = menu.addAction(self.tr("Show all rows (reset {0:d} hidden)".format(len(hidden_rows))))

        if self.model().refindex != -1:
            menu.addAction(self.ref_message_action)

        menu.addSeparator()
        if self.model().is_writeable:
            writeAbleAction = menu.addAction(self.tr("Writeable"))
            writeAbleAction.setCheckable(True)
            writeAbleAction.setChecked(True)
        else:
            writeAbleAction = menu.addAction(self.tr("Writeable (decouples from signal)"))
            writeAbleAction.setCheckable(True)
            writeAbleAction.setChecked(False)

        menu.addSeparator()
        undo_stack = self.model().undo_stack
        view = self.model().proto_view

        for plugin in self.controller.plugin_manager.protocol_plugins:
            if plugin.enabled:
                act = plugin.get_action(self, undo_stack, self.selection_range(),
                                        self.controller.proto_analyzer, view)
                if act is not None:
                    menu.addAction(act)

        action = menu.exec_(self.mapToGlobal(pos))
        if action == self.ref_message_action:
            self.set_ref_message(y=pos.y())
        elif action == editLabelAction:
            self.edit_label_clicked.emit(selected_label)
        elif action == createLabelAction:
            self.model().addProtoLabel(start, end - 1, row)
        elif action == showInterpretationAction:
            self.show_interpretation_clicked.emit(min_row, start, max_row, end - 1)
        elif action == showRowAction:
            for i in hidden_rows:
                self.showRow(i)
            self.model().hidden_rows.clear()
            self.model().update()
            self.row_visibility_changed.emit()
        elif action == bitAction:
            self.protocol_view_change_clicked.emit(0)
        elif action == hexAction:
            self.protocol_view_change_clicked.emit(1)
        elif action == asciiAction:
            self.protocol_view_change_clicked.emit(2)
        elif action == writeAbleAction:
            self.writeable_changed.emit(writeAbleAction.isChecked())
        elif action == none_partipnt_action:
            for message in selected_messages:
                message.participant = None
            self.participant_changed.emit()
        elif action in particpnt_actions:
            for message in selected_messages:
                message.participant = particpnt_actions[action]
            self.participant_changed.emit()
        elif action == new_message_type_action:
            self.new_messagetype_clicked.emit(selected_messages)
        elif action in message_type_actions:
            self.messagetype_selected.emit(message_type_actions[action], selected_messages)

