import { Injectable } from '@angular/core';

import * as remoteConfigSchema from '@dvsa/mes-config-schema/remote-config.json';
// import joi, { ValidationResult } from '@hapi/joi';
import * as enjoi from 'enjoi';

@Injectable()
export class SchemaValidatorProvider {

  validateRemoteConfig = (data: any): boolean => { // ValidationResult<any> => {
    const joiSchema = enjoi.schema(remoteConfigSchema);

    joiSchema + 1;
    // return joi.validate(data, joiSchema);
    return ;
  }

}
