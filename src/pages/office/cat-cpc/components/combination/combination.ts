import { Component, Input } from '@angular/core';

import { CombinationCodes } from '@dvsa/mes-test-schema/categories/CPC';

@Component({
  selector: 'combination',
  templateUrl: 'combination.html',
})
export class CombinationComponent {

  @Input()
  combination: CombinationCodes;

  @Input()
  combinationAdditionalText: string;

  constructor() { }

}
