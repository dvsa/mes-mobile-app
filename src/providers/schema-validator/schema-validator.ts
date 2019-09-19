import { Injectable } from '@angular/core';

import * as remoteConfigSchema from '@dvsa/mes-config-schema/remote-config.json';
import * as joi from 'joi-browser';
import { ValidationResult, Schema } from '@hapi/joi';
import * as enjoi from 'enjoi-browser';

@Injectable()
export class SchemaValidatorProvider {

  validateRemoteConfig = (data: any): ValidationResult<any> => {
    const joiSchema: Schema = enjoi.schema(remoteConfigSchema);
    return joi.validate(data, joiSchema);
  }

}
