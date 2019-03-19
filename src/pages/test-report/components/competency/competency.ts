import { Component, Input } from '@angular/core';

@Component({
  selector: 'competency',
  templateUrl: 'competency.html',
})
export class CompetencyComponent {

  @Input()
  label: string;

  constructor() {}

}
