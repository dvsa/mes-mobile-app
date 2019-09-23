import { Injectable } from '@angular/core';

import * as remoteConfigSchema from '@dvsa/mes-config-schema/remote-config.json';
import { validate } from 'joi-browser';
import { ValidationResult, Schema } from '@hapi/joi';
// The enjoi-browser package doesn't suport ES6 imports
const enjoi = require('../../../node_modules/enjoi-browser/lib/enjoi.js');

@Injectable()
export class SchemaValidatorProvider {

  validateRemoteConfig = (data: any): ValidationResult<any> => {
    const joiSchema: Schema = enjoi(remoteConfigSchema);
    return validate(data, joiSchema);
  }

}
