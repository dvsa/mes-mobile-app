import { Injectable } from '@angular/core';

import * as remoteConfigSchema from '@dvsa/mes-config-schema/remote-config.json';
import * as joi from 'joi-browser';
import { ValidationResult, Schema } from '@hapi/joi';
import * as enjoi from 'enjoi-browser';

@Injectable()
export class SchemaValidatorProvider {

  validateRemoteConfig = (data: any): ValidationResult<any> => {
    console.log('### validateRemoteConfig running');
    try {
      const joiSchema: Schema = enjoi.schema(remoteConfigSchema);
      console.log(typeof remoteConfigSchema);
      console.log('### validateRemoteConfig data');
      console.log(data);
      console.log('### ValidationResult');
      return joi.validate(data, joiSchema);
    } catch (err) {
      console.log('### error in validating config');
      console.log(JSON.stringify(err));
    }
  }

}
