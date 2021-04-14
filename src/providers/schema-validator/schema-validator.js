var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import * as remoteConfigSchema from '@dvsa/mes-config-schema/remote-config.json';
import { validate } from 'joi-browser';
// The enjoi-browser package doesn't suport ES6 imports
var enjoi = require('../../../node_modules/enjoi-browser/lib/enjoi.js');
var SchemaValidatorProvider = /** @class */ (function () {
    function SchemaValidatorProvider() {
        this.validateRemoteConfig = function (data) {
            var joiSchema = enjoi(remoteConfigSchema);
            return validate(data, joiSchema);
        };
    }
    SchemaValidatorProvider = __decorate([
        Injectable()
    ], SchemaValidatorProvider);
    return SchemaValidatorProvider;
}());
export { SchemaValidatorProvider };
//# sourceMappingURL=schema-validator.js.map