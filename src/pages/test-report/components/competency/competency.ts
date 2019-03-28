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
import { getDrivingFaultCount } from '../../../../modules/tests/test_data/test-data.selector';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getDrivingFaultCount, hasSeriousFault } from '../../../../modules/tests/test_data/test-data.selector';
import { getTestReportState } from '../../test-report.reducer';
import { isSeriousMode } from '../../test-report.selector';

enum CssClassesEnum {
  DRIVING_FAULT = 'driving-fault',
  RIPPLE_EFFECT = 'ripple-effect',
  SERIOUS_FAULT = 'serious-fault',
}

interface ComptencyState {
  drivingFaultCount$: Observable<number>;
  isSeriousMode$: Observable<boolean>;
  hasSeriousFault$: Observable<boolean>;
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

  competencyState: ComptencyState;
  subscription: Subscription;

  faultCount: number;
  isSeriousMode: boolean = false;
  hasSeriousFault: boolean = false;

  constructor(
    public hammerProvider: HammerProvider,
    private renderer: Renderer2,
    private store$: Store<StoreModel>,
  ) {}

  ngOnInit(): void {
    this.hammerProvider.init(this.button);
    this.hammerProvider.addPressAndHoldEvent(this.recordFault);

    this.competencyState = {
      drivingFaultCount$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(testData => getDrivingFaultCount(testData, this.competency))),
      isSeriousMode$: this.store$.pipe(
          select(getTestReportState),
          select(isSeriousMode)),
      hasSeriousFault$: this.store$.pipe(
          select(getCurrentTest),
          select(getTestData),
          select(testData => hasSeriousFault(testData, this.competency)),
        ),
    };

    const { drivingFaultCount$, isSeriousMode$, hasSeriousFault$ } = this.competencyState;

    const merged$ = merge(
      drivingFaultCount$.pipe(map(count => this.faultCount = count)),
      isSeriousMode$.pipe(map(toggle => this.isSeriousMode = toggle)),
      hasSeriousFault$.pipe(map(toggle => this.hasSeriousFault = toggle)),
    );

    this.subscription = merged$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getLabel = (): string => competencyLabels[this.competency];

  /**
   * Increments the fault count of the competency
   * @returns void
   */
  recordFault = (): void => {
    if (this.isSeriousMode) {
      this.store$.dispatch(new AddSeriousFault(this.competency));
    } else {
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
    if (this.hasSeriousFault) {
      this.renderer.removeClass(this.button.nativeElement, CssClassesEnum.DRIVING_FAULT);
      this.renderer.addClass(this.button.nativeElement, CssClassesEnum.SERIOUS_FAULT);
    }else if (this.faultCount > 0) {
      this.renderer.addClass(this.button.nativeElement, CssClassesEnum.DRIVING_FAULT);
      this.renderer.addClass(this.button.nativeElement, CssClassesEnum.RIPPLE_EFFECT);
      setTimeout(() => this.renderer.removeClass(this.button.nativeElement, CssClassesEnum.RIPPLE_EFFECT),
                 this.rippleEffectAnimationDuration,
      );
    }
  }
}
