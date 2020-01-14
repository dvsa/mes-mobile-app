import { Component, Input } from '@angular/core';
import { Competencies } from '../../../../../modules/tests/test-data/test-data.constants';
import { speedCheckLabels } from '../../../../../shared/constants/competencies/cata-mod1-competencies';

@Component({
  selector: 'speed-check',
  templateUrl: 'speed-check.html',
})
export class SpeedCheckComponent {

  @Input()
  competency: Competencies;

  // todo: PREP-AMOD1 to be implemented using state as part of MES - 4419
  actionTaken: boolean;

  constructor() { }

  // todo: PREP-AMOD1 MES - 4419 implement
  ngOnInit(): void { }

  // todo: PREP-AMOD1 MES - 4419 implement
  ngOnDestroy(): void { }

  // todo: PREP-AMOD1 MES - 4419 implement
  toggleNotMet():void { }

  getLabel = (): string => speedCheckLabels[this.competency];

  onTap = () => {
    // todo: PREP-AMOD1 implement addOrRemoveFault();
  }

  onPress = () => {
    // todo: PREP-AMOD1 implement addOrRemoveFault();
  }

  showSerious() {
    // todo: PREP-AMOD1 implement showSerious() to return fault label
  }

  showDangerous() {
    // todo: PREP-AMOD1 implement showDangerous() to return fault label
  }
}
