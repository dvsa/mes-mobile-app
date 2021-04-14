export var REVERSE_DIAGRAM_VIEW_DID_ENTER = '[ReverseDiagramPage] Reverse Diagram Did Enter';
export var REVERSE_DIAGRAM_OPENED = '[ReverseDiagramPage] Reverse Diagram Opened';
export var REVERSE_DIAGRAM_CLOSED = '[ReverseDiagramPage] Reverse Diagram Closed';
export var REVERSE_DIAGRAM_LENGTH_CHANGED = '[ReverseDiagramPage] Change Vehicle Length';
export var REVERSE_DIAGRAM_WIDTH_CHANGED = '[ReverseDiagramPage] Change Vehicle Width';
var ReverseDiagramViewDidEnter = /** @class */ (function () {
    function ReverseDiagramViewDidEnter() {
        this.type = REVERSE_DIAGRAM_VIEW_DID_ENTER;
    }
    return ReverseDiagramViewDidEnter;
}());
export { ReverseDiagramViewDidEnter };
var ReverseDiagramOpened = /** @class */ (function () {
    function ReverseDiagramOpened() {
        this.type = REVERSE_DIAGRAM_OPENED;
    }
    return ReverseDiagramOpened;
}());
export { ReverseDiagramOpened };
var ReverseDiagramClosed = /** @class */ (function () {
    function ReverseDiagramClosed() {
        this.type = REVERSE_DIAGRAM_CLOSED;
    }
    return ReverseDiagramClosed;
}());
export { ReverseDiagramClosed };
var ReverseDiagramLengthChanged = /** @class */ (function () {
    function ReverseDiagramLengthChanged(previousLength, newLength) {
        this.previousLength = previousLength;
        this.newLength = newLength;
        this.type = REVERSE_DIAGRAM_LENGTH_CHANGED;
    }
    return ReverseDiagramLengthChanged;
}());
export { ReverseDiagramLengthChanged };
var ReverseDiagramWidthChanged = /** @class */ (function () {
    function ReverseDiagramWidthChanged(previousWidth, newWidth) {
        this.previousWidth = previousWidth;
        this.newWidth = newWidth;
        this.type = REVERSE_DIAGRAM_WIDTH_CHANGED;
    }
    return ReverseDiagramWidthChanged;
}());
export { ReverseDiagramWidthChanged };
//# sourceMappingURL=reverse-diagram-modal.actions.js.map