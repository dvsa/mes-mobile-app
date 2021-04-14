import { EMPTY } from 'rxjs';
var ScreenOrientationMock = /** @class */ (function () {
    function ScreenOrientationMock() {
        this.ORIENTATIONS = {
            PORTRAIT_PRIMARY: 'portrait-primary',
            PORTRAIT_SECONDARY: 'portrait-secondary',
            LANDSCAPE_PRIMARY: 'landscape-primary',
            LANDSCAPE_SECONDARY: 'landscape-secondry',
            PORTRAIT: 'portrait',
            LANDSCAPE: 'landscape',
            ANY: 'any',
        };
        this.type = this.ORIENTATIONS.ANY;
        this.onChange = jasmine.createSpy('onChange').and.returnValue(EMPTY);
        this.lock = jasmine.createSpy('lock').and.returnValue(Promise.resolve());
        this.unlock = jasmine.createSpy('unlock');
    }
    return ScreenOrientationMock;
}());
export { ScreenOrientationMock };
//# sourceMappingURL=screen-orientation.mock.js.map