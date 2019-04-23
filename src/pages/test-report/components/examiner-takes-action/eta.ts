import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { StoreModel } from '../../../../shared/models/store.model';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { ToggleETA } from '../../../../modules/tests/test_data/test-data.actions';
import { getETA, hasExaminerTakenAction } from '../../../../modules/tests/test_data/test-data.selector';
import { ExaminerActions } from '../../../../modules/tests/test_data/test-data.constants';
import { etaLabels } from './eta.constants';

interface ETAComponentState {
  actionTaken$: Observable<boolean>;
}
@Component({
  selector: 'eta',
  templateUrl: 'eta.html',
})
export class EtaComponent implements OnInit {

  @Input()
  eta: ExaminerActions;

  touchStateDelay: number = 100;

  touchState: boolean = false;
  touchTimeout: any;

  componentState: ETAComponentState;
  constructor(private store$: Store<StoreModel>) { }

  ngOnInit(): void {
    this.componentState = {
      actionTaken$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getETA),
        select(eta => hasExaminerTakenAction(eta, this.eta)),
      ),
    };
  }

  getLabel = (): string => etaLabels[this.eta];

  toggleETA = (): void => {
    this.store$.dispatch(new ToggleETA(this.eta));
  }

}
