export var MARK_AS_REKEY = '[Rekey Actions] Mark the test as being rekeyed';
export var MARK_AS_NON_REKEY = '[Rekey Actions] Mark the test as not being a rekey';
export var END_REKEY = '[Rekey Actions] End rekey';
var MarkAsRekey = /** @class */ (function () {
    function MarkAsRekey() {
        this.type = MARK_AS_REKEY;
    }
    return MarkAsRekey;
}());
export { MarkAsRekey };
var MarkAsNonRekey = /** @class */ (function () {
    function MarkAsNonRekey() {
        this.type = MARK_AS_NON_REKEY;
    }
    return MarkAsNonRekey;
}());
export { MarkAsNonRekey };
var EndRekey = /** @class */ (function () {
    function EndRekey() {
        this.type = END_REKEY;
    }
    return EndRekey;
}());
export { EndRekey };
//# sourceMappingURL=rekey.actions.js.map