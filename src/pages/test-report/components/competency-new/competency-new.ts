import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

import { StoreModel } from '../../../../shared/models/store.model';
import {
  AddDrivingFault,
  AddSeriousFault,
  AddDangerousFault,
} from '../../../../modules/tests/test_data/test-data.actions';
// import { HammerProvider } from '../../../../providers/hammer/hammer';
import { Competencies } from '../../../../modules/tests/test_data/test-data.constants';
import { competencyLabels } from './competency-new.constants';
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
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../test-report.actions';

interface CompetencyState {
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;

  drivingFaultCount$: Observable<number>;
  hasSeriousFault$: Observable<boolean>;
  hasDangerousFault$: Observable<boolean>;
}

@Component({
  selector: 'competency-new',
  templateUrl: 'competency-new.html',
  // providers: [HammerProvider],
})
export class CompetencyNewComponent {

  @Input()
  competency: Competencies;

  @Input()
  touchStateDelay: number;

  touchState: boolean = false;
  rippleState: boolean = false;
  pressTimeout: any;
  buttonClasses: any;
  touchTime: number;
  rippleTimeout: any;
  touchTimeout: any;

  rippleEffectAnimationDuration: number = 300;

  competencyState: CompetencyState;
  subscription: Subscription;

  faultCount: number;

  isSeriousMode: boolean = false;
  hasSeriousFault: boolean = false;

  isDangerousMode: boolean = false;
  hasDangerousFault: boolean = false;

  constructor(
    // public hammerProvider: HammerProvider,
    private store$: Store<StoreModel>,
  ) {
    if (!this.touchStateDelay) {
      console.log('setting default delay to 0');
      this.touchStateDelay = 100;
    }
  }

  ngOnInit(): void {
    // this.hammerProvider.init(this.button);
    // this.hammerProvider.addPressAndHoldEvent(this.recordFault);

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
      hasDangerousFault$.pipe(map(toggle => this.hasDangerousFault = toggle)),
    );

    this.subscription = merged$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      console.log('unsubscribe - new competency', this.competency);
      this.subscription.unsubscribe();
    }
  }

  getLabel = (): string => competencyLabels[this.competency];

  recordFault = (): void => {
    if (this.hasDangerousFault) {
      return;
    }

    if (this.isDangerousMode) {
      this.store$.dispatch(new AddDangerousFault(this.competency));
      this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    if (this.hasSeriousFault) {
      return;
    }

    if (this.isSeriousMode) {
      this.store$.dispatch(new AddSeriousFault(this.competency));
      this.store$.dispatch(new ToggleSeriousFaultMode());
      return;
    }

    this.store$.dispatch(new AddDrivingFault({
      competency: this.competency,
      newFaultCount: this.faultCount ? this.faultCount + 1 : 1,
    }));
  }

  /**
   * Manages the addition and removal of the ripple effect animation css class
   * @returns any
   */
  applyRippleEffect = (): any => {
    this.rippleState = true;
    this.rippleTimeout = setTimeout(() => this.removeRippleEffect(), this.rippleEffectAnimationDuration);
  }

  removeRippleEffect = (): any => {
    this.rippleState = false;
    clearTimeout(this.pressTimeout);
  }

  onTap($event): void {
    console.log('onTap');
  }

  onPress($event): void {
    console.log('onPress');
    this.applyRippleEffect();
    this.recordFault();
  }

  onTouchStart($event):void {
    clearTimeout(this.touchTimeout);
    this.touchState = true;
    const time = new Date();
    this.touchTime = +time;
    console.log(`onTouchStart`);
  }

  onTouchEnd($event):void {
    console.log('touchStateDelay', this.touchStateDelay);
    if (this.touchStateDelay === 0) {
      this.touchState = false;
    } else {
      // defer the removal of the touch state to allow the page to render
      this.touchTimeout = setTimeout(() => this.touchState = false, this.touchStateDelay);
    }

    const time = new Date();
    const duration = +time - this.touchTime;
    console.log(`onTouchEnd`);
    console.log(`Touch duration ${duration}`);

  }
}

  // startPressTimeout():void {
  //   this.pressTimeout = setTimeout(() => {
  //     this.manageClasses();
  //     this.recordFault();
  //   }, 300); // tslint:disable-line:align
  // }

  // stopPressTimeout():void {
  //   clearTimeout(this.pressTimeout);
  // }

    // console.log('tap', $event);
    // console.log('tap', $event.target.parentElement);
    // console.log('tap', $event.target.parentElement.classList);
    // $event.target.classList.add('activated');
    // this.touchState = true;

    // if (!this.buttonClasses) {
    //   this.buttonClasses =
    //     document.querySelectorAll(`competency-new[ng-reflect-competency="${this.competency}"]>div`)[0].classList;
    // }
    // console.log(this.buttonClasses);
    // $event.target.classList.add('activated');
    // if (this.buttonClasses) {
    //   this.buttonClasses.add('activated');
    //   console.log(this.buttonClasses);
    // }
    // this.renderer.addClass(this.button.nativeElement, 'activated');
    // this.startPressTimeout();

    // if (this.buttonClasses) {
    //   this.buttonClasses.remove('activated');
    //   console.log(this.buttonClasses);
    // }
    // $event.target.classList.remove('activated');
    // this.renderer.removeClass(this.button.nativeElement, 'activated');
    // this.stopPressTimeout();
