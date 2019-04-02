import { Component, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

import { StoreModel } from '../../../../shared/models/store.model';
import { AddDrivingFault, AddSeriousFault } from '../../../../modules/tests/test_data/test-data.actions';
import { HammerProvider } from '../../../../providers/hammer/hammer';
import { Competencies } from '../../../../modules/tests/test_data/test-data.constants';
import { competencyLabels } from './competency.constants';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { getTests } from '../../../../modules/tests/tests.reducer';
import {
  getDrivingFaultCount,
  hasSeriousFault,
  hasDangerousFault,
} from '../../../../modules/tests/test_data/test-data.selector';
import { getTestReportState } from '../../test-report.reducer';
import { isSeriousMode, isDangerousMode } from '../../test-report.selector';
import { ToggleSeriousFaultMode } from '../../test-report.actions';

enum CssClassesEnum {
  RIPPLE_EFFECT = 'ripple-effect',
}

interface CompetencyState {
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;

  drivingFaultCount$: Observable<number>;
  hasSeriousFault$: Observable<boolean>;
  hasDangerousFault$: Observable<boolean>;
}

@Component({
  selector: 'competency',
  templateUrl: 'competency.html',
  providers: [HammerProvider],
})
export class CompetencyComponent {

  @Input()
  competency: Competencies;

  @ViewChild('competencyButton')
  button: ElementRef;

  rippleEffectAnimationDuration: number = 300;

  competencyState: CompetencyState;
  subscription: Subscription;

  faultCount: number;

  isSeriousMode: boolean = false;
  hasSeriousFault: boolean = false;

  isDangerousMode: boolean = false;
  hasDangerousMode: boolean = false;

  constructor(
    public hammerProvider: HammerProvider,
    private renderer: Renderer2,
    private store$: Store<StoreModel>,
  ) {}

  ngOnInit(): void {
    this.hammerProvider.init(this.button);
    this.hammerProvider.addPressAndHoldEvent(this.recordFault);

    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.competencyState = {
      isSeriousMode$: this.store$.pipe(
        select(getTestReportState),
        select(isSeriousMode)),
      isDangerousMode$: this.store$.pipe(
        select(getTestReportState),
        select(isDangerousMode)),
      drivingFaultCount$: currentTest$.pipe(
        select(getTestData),
        select(testData => getDrivingFaultCount(testData, this.competency))),
      hasSeriousFault$: currentTest$.pipe(
        select(getTestData),
        select(testData => hasSeriousFault(testData, this.competency))),
      hasDangerousFault$: currentTest$.pipe(
        select(getTestData),
        select(testData => hasDangerousFault(testData, this.competency)),
      ),
    };

    const {
      drivingFaultCount$,
      isSeriousMode$,
      hasSeriousFault$,
      isDangerousMode$,
      hasDangerousFault$,
    } = this.competencyState;

    const merged$ = merge(
      drivingFaultCount$.pipe(map(count => this.faultCount = count)),
      isSeriousMode$.pipe(map(toggle => this.isSeriousMode = toggle)),
      hasSeriousFault$.pipe(map(toggle => this.hasSeriousFault = toggle)),
      isDangerousMode$.pipe(map(toggle => this.isDangerousMode = toggle)),
      hasDangerousFault$.pipe(map(toggle => this.hasDangerousMode = toggle)),
    );

    this.subscription = merged$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getLabel = (): string => competencyLabels[this.competency];

  recordFault = (): void => {
    // Record Serious Faults
    // Must be in serious mode
    // Unable to mark a serious fault if there is already a dangerous fault on button
    if (this.isSeriousMode) {
      this.store$.dispatch(new AddSeriousFault(this.competency));
      this.store$.dispatch(new ToggleSeriousFaultMode());
    // Record Driving Faults
    // Unable to mark a DF if there is already a Serious or Dangerous Fault on Butotn
    } else if (!this.hasSeriousFault) {
      this.store$.dispatch(new AddDrivingFault({
        competency: this.competency,
        newFaultCount: this.faultCount ? this.faultCount + 1 : 1,
      }));
    }
    this.manageClasses();
  }

  /**
   * Manages the addition and removal of the ripple effect animation css class
   * @returns any
   */
  manageClasses = (): any => {
    this.renderer.addClass(this.button.nativeElement, CssClassesEnum.RIPPLE_EFFECT);
    setTimeout(() => this.renderer.removeClass(this.button.nativeElement, CssClassesEnum.RIPPLE_EFFECT),
               this.rippleEffectAnimationDuration,
      );
  }
}
