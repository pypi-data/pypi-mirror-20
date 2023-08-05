import copy

from PyQt5.QtWidgets import QUndoCommand

from urh.signalprocessing.ProtocolAnalyzerContainer import ProtocolAnalyzerContainer


class InsertColumn(QUndoCommand):
    def __init__(self, proto_analyzer_container: ProtocolAnalyzerContainer, index: int, rows: list, view: int):
        super().__init__()
        self.proto_analyzer_container = proto_analyzer_container
        self.index = proto_analyzer_container.convert_index(index, from_view=view, to_view=0, decoded=False)[0]
        self.nbits = 1 if view == 0 else 4 if view == 1 else 8
        self.rows = rows

        self.orig_messages = copy.deepcopy(self.proto_analyzer_container.messages)

        self.setText("Insert column at {0:d}".format(index))

    def redo(self):
        for i in self.rows:
            msg = self.proto_analyzer_container.messages[i]
            for j in range(self.nbits):
                msg.insert(self.index + j, False)

    def undo(self):
        self.proto_analyzer_container.messages = self.orig_messages