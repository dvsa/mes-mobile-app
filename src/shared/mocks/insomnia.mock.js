var InsomniaMock = /** @class */ (function () {
    function InsomniaMock() {
        this.keepAwake = jasmine.createSpy('keepAwake').and.returnValue(Promise.resolve());
        this.allowSleepAgain = jasmine.createSpy('allowSleepAgain');
    }
    return InsomniaMock;
}());
export { InsomniaMock };
//# sourceMappingURL=insomnia.mock.js.map