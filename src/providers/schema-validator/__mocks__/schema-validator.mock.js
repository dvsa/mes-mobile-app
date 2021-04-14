var SchemaValidatorProviderMock = /** @class */ (function () {
    function SchemaValidatorProviderMock() {
        this.validateRemoteConfig = function (data) {
            return {
                error: null,
                value: {},
                then: jasmine.createSpy('then', function () { }),
                catch: jasmine.createSpy('catch', function () { }),
            };
        };
    }
    return SchemaValidatorProviderMock;
}());
export { SchemaValidatorProviderMock };
//# sourceMappingURL=schema-validator.mock.js.map