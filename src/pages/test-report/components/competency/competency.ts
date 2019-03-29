import { Component, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

import { StoreModel } from '../../../../shared/models/store.model';
import { AddDrivingFault } from '../../../../modules/tests/test_data/test-data.actions';
import { HammerProvider } from '../../../../providers/hammer/hammer';
import { Competencies } from '../../../../modules/tests/test_data/test-data.constants';
import { competencyLabels } from './competency.constants';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { getDrivingFaultCount } from '../../../../modules/tests/test_data/test-data.selector';
import { getTests } from '../../../../modules/tests/tests.reducer';

enum CssClassesEnum {
  DRIVING_FAULT = 'driving-fault',
  RIPPLE_EFFECT = 'ripple-effect',
}

interface ComptencyState {
  drivingFaultCount$: Observable<number>;
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

  constructor(
    public hammerProvider : HammerProvider,
    private renderer: Renderer2,
    private store$: Store<StoreModel>,
    ) {}

  ngOnInit() : void {
    this.hammerProvider.init(this.button);
    this.hammerProvider.addPressAndHoldEvent(this.recordFault);

    this.competencyState = {
      drivingFaultCount$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(testData => getDrivingFaultCount(testData, this.competency))),
    };

    const { drivingFaultCount$ } = this.competencyState;

    const merged$ = merge(
      drivingFaultCount$.pipe(map(count => this.faultCount = count)),
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
    this.store$.dispatch(new AddDrivingFault({
      competency: this.competency,
      newFaultCount: this.faultCount ? this.faultCount + 1 : 1,
    }));
    this.manageClasses();
  }

  /**
   * Manages the addition and removal of the ripple effect animation css class
   * @returns any
   */
  manageClasses = (): any => {
    if (this.faultCount > 0) {
      this.renderer.addClass(this.button.nativeElement, CssClassesEnum.DRIVING_FAULT);
      this.renderer.addClass(this.button.nativeElement, CssClassesEnum.RIPPLE_EFFECT);
      setTimeout(() => this.renderer.removeClass(this.button.nativeElement, CssClassesEnum.RIPPLE_EFFECT),
                 this.rippleEffectAnimationDuration,
      );
    }
  }
}
