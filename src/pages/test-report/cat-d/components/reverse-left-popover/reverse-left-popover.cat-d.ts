import { Component } from '@angular/core';
import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../../modules/tests/test-data/test-data.constants';

@Component({
  selector: 'reverse-left-popover-cat-d',
  templateUrl: 'reverse-left-popover.cat-d.html',
})
export class ReverseLeftPopoverCatDComponent {

  manoeuvreTypes = ManoeuvreTypes;
  competencies = ManoeuvreCompetencies;

  constructor() { }

  getId = (competency: ManoeuvreCompetencies) => `${ManoeuvreTypes.reverseLeft}-${competency}`;
}
