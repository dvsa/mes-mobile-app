import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../modules/tests/test-data/test-data.constants';
import { Component } from '@angular/core';

@Component({
  selector: 'reverse-left-popover',
  templateUrl: 'reverse-left-popover.html',
})
export class ReverseLeftPopoverComponent {
  manoeuvreTypes = ManoeuvreTypes;
  competencies = ManoeuvreCompetencies;

  constructor() { }

  getId = (competency: ManoeuvreCompetencies) => `${ManoeuvreTypes.reverseLeft}-${competency}`;
}
