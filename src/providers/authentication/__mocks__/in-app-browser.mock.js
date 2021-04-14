import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
var InAppBrowserMock = /** @class */ (function () {
    function InAppBrowserMock() {
    }
    InAppBrowserMock.prototype.create = function (url, target, options) {
        return new InAppBrowserObjectMock();
    };
    return InAppBrowserMock;
}());
export { InAppBrowserMock };
var InAppBrowserObjectMock = /** @class */ (function () {
    function InAppBrowserObjectMock() {
    }
    InAppBrowserObjectMock.prototype.show = function () { };
    InAppBrowserObjectMock.prototype.close = function () { };
    InAppBrowserObjectMock.prototype.hide = function () { };
    InAppBrowserObjectMock.prototype.executeScript = function (script) {
        return new Promise(function (resolve) { });
    };
    InAppBrowserObjectMock.prototype.insertCSS = function (css) {
        return new Promise(function (resolve) { });
    };
    InAppBrowserObjectMock.prototype.on = function (event) {
        return new EmptyObservable();
    };
    return InAppBrowserObjectMock;
}());
export { InAppBrowserObjectMock };
var InAppBrowserEventMock = /** @class */ (function () {
    function InAppBrowserEventMock() {
        this.type = 'type';
        this.url = 'url';
        this.code = 123;
        this.message = 'message';
    }
    return InAppBrowserEventMock;
}());
export { InAppBrowserEventMock };
//# sourceMappingURL=in-app-browser.mock.js.map