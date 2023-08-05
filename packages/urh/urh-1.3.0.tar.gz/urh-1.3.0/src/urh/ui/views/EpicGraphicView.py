from PyQt5.QtCore import Qt, QPoint, pyqtSignal, pyqtSlot
from PyQt5.QtGui import QIcon, QKeySequence
from PyQt5.QtWidgets import QAction

from urh import constants
from urh.signalprocessing.ProtocolAnalyzer import ProtocolAnalyzer
from urh.ui.views.EditableGraphicView import EditableGraphicView


class EpicGraphicView(EditableGraphicView):
    """
    Tied to Signal Frame (Interpretation)
    """
    save_clicked = pyqtSignal()

    def __init__(self, parent=None):
        super().__init__(parent)

        self.save_enabled = True
        self.create_new_signal_enabled = True
        self.participants_assign_enabled = True
        self.cache_qad = True
        self.y_sep = 0

        self.parent_frame = self.parent().parent().parent()
        self._init_undo_stack(self.parent_frame.undo_stack)

        self.save_action = QAction(self.tr("Save"), self)  # type: QAction
        self.save_action.setIcon(QIcon.fromTheme("document-save"))
        self.save_action.setShortcut(QKeySequence.Save)
        self.save_action.triggered.connect(self.on_save_action_triggered)
        self.save_action.setShortcutContext(Qt.WidgetWithChildrenShortcut)
        self.addAction(self.save_action)

    @property
    def sample_rate(self):
        try:
            return self.signal.sample_rate
        except AttributeError:
            return None

    @sample_rate.setter
    def sample_rate(self, value):
        raise ValueError("Not implemented for epic graphic view")

    @property
    def signal(self):
        return self.parent_frame.signal

    @property
    def protocol(self) -> ProtocolAnalyzer:
        return self.parent_frame.proto_analyzer

    @property
    def scene_type(self):
        return self.parent_frame.ui.cbSignalView.currentIndex()

    @property
    def selected_messages(self):
        if not self.selection_area.is_empty:
            pa = self.parent_frame.proto_analyzer
            sb, _, eb, _ = pa.get_bitseq_from_selection(self.selection_area.start, abs(self.selection_area.width), self.signal.bit_len)
            return pa.messages[sb:eb + 1]
        else:
            return []

    def is_pos_in_separea(self, pos: QPoint):
        if self.scene_type == 0:
            return False
        padding = constants.SEPARATION_PADDING * self.view_rect().height()
        return self.y_sep - padding <= pos.y() <= self.y_sep + padding

    @pyqtSlot()
    def on_save_action_triggered(self):
        self.save_clicked.emit()

