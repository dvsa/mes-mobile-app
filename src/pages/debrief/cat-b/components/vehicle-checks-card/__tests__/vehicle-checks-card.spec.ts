import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { VehicleChecksCardComponent } from '../vehicle-checks-card';
import { IonicModule, Config } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { StoreModel } from '../../../../../../shared/models/store.model';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import {
  TellMeQuestionCorrect,
  ShowMeQuestionPassed,
  ShowMeQuestionDrivingFault,
  TellMeQuestionDrivingFault,
  ShowMeQuestionSeriousFault,
  ShowMeQuestionDangerousFault,
} from '../../../../../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks';
import { TranslateService, TranslateModule, TranslateLoader } from 'ng2-translate';
import { createTranslateLoader } from '../../../../../../app/app.module';
import { Http } from '@angular/http';
import * as welshTranslations from '../../../../../assets/i18n/cy.json';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';

describe('VehicleChecksCardComponent', () => {
  let fixture: ComponentFixture<VehicleChecksCardComponent>;
  let store$: Store<StoreModel>;
  let translate: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleChecksCardComponent,
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer }),
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [Http],
        }),
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VehicleChecksCardComponent);
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105, TestCategory.B));
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
      });
  }));

  describe('DOM', () => {
    it('should not display the card when no fault marked', () => {
      store$.dispatch(new TellMeQuestionCorrect());
      store$.dispatch(new ShowMeQuestionPassed());
      fixture.detectChanges();
      const vehicleChecksCard = fixture.debugElement.query(By.css('#vehicle-checks'));
      expect(vehicleChecksCard).toBeNull();
    });

    it('should display the card when show me has a fault', () => {
      store$.dispatch(new TellMeQuestionCorrect());
      store$.dispatch(new ShowMeQuestionDrivingFault());
      fixture.detectChanges();
      const vehicleChecksCard = fixture.debugElement.query(By.css('#vehicle-checks'));
      expect(vehicleChecksCard).not.toBeNull();
    });

    it('should display the card when tell me has a fault', () => {
      store$.dispatch(new TellMeQuestionDrivingFault());
      store$.dispatch(new ShowMeQuestionPassed());
      fixture.detectChanges();
      const vehicleChecksCard = fixture.debugElement.query(By.css('#vehicle-checks'));
      expect(vehicleChecksCard).not.toBeNull();
    });

    it('should display tell me question div, when there is a tell me fault', () => {
      store$.dispatch(new TellMeQuestionDrivingFault());
      store$.dispatch(new ShowMeQuestionPassed());
      fixture.detectChanges();
      const vehicleChecksCard = fixture.debugElement.query(By.css('#tell-me-question'));
      expect(vehicleChecksCard).not.toBeNull();
    });

    it('should display show me question div, when there is a show me fault', () => {
      store$.dispatch(new TellMeQuestionCorrect());
      store$.dispatch(new ShowMeQuestionDrivingFault());
      fixture.detectChanges();
      const vehicleChecksCard = fixture.debugElement.query(By.css('#show-me-question'));
      expect(vehicleChecksCard).not.toBeNull();
    });

    describe('Vehicle check reporting', () => {
      describe('Tell me question reporting', () => {
        it('should indicate when there was a driving fault on the tell me question', () => {
          store$.dispatch(new TellMeQuestionDrivingFault());
          fixture.detectChanges();
          const tellMeQuestionText = fixture.debugElement.query(By.css('#tell-me-question')).nativeElement;
          expect(tellMeQuestionText.innerHTML.trim()).toBe('Tell me question - Driving fault');
        });
        it('should indicate a tell me fault in Welsh for a Welsh test', (done) => {
          fixture.detectChanges();
          store$.dispatch(new TellMeQuestionDrivingFault());
          // Language change handled by parent page component, force the switch
          translate.use('cy').subscribe(() => {
            fixture.detectChanges();
            const tellMeQuestionText = fixture.debugElement.query(By.css('#tell-me-question')).nativeElement;
            const questionText = (<any>welshTranslations).debrief.tellMeQuestion;
            const drvingFaultText = (<any>welshTranslations).debrief.drivingFault;
            expect(tellMeQuestionText.innerHTML.trim())
              .toBe(`${questionText} - ${drvingFaultText}`);
            done();
          });
        });
      });
      describe('Show me question reporting', () => {
        it('should indicate when there was a driving fault on the show me question', () => {
          fixture.detectChanges();
          store$.dispatch(new ShowMeQuestionDrivingFault());
          fixture.detectChanges();
          const showMeQuestionText = fixture.debugElement.query(By.css('#show-me-question-outcome')).nativeElement;
          expect(showMeQuestionText.innerHTML.trim()).toBe('Show me question - Driving fault');
        });
        it('should indicate a show me driving fault in Welsh for a Welsh test', (done) => {
          fixture.detectChanges();
          store$.dispatch(new ShowMeQuestionDrivingFault());
          // Language change handled by parent page component, force the switch
          translate.use('cy').subscribe(() => {
            fixture.detectChanges();
            const showMeQuestionText = fixture.debugElement.query(By.css('#show-me-question-outcome')).nativeElement;
            const { showMeQuestion, drivingFault } = (<any>welshTranslations).debrief;
            const expectedTranslation = `${showMeQuestion} - ${drivingFault}`;
            expect(showMeQuestionText.innerHTML.trim()).toBe(expectedTranslation);
            done();
          });
        });
        it('should indicate when there was a serious fault on the show me question', () => {
          fixture.detectChanges();
          store$.dispatch(new ShowMeQuestionSeriousFault());
          fixture.detectChanges();
          const showMeQuestionText = fixture.debugElement.query(By.css('#show-me-question-outcome')).nativeElement;
          expect(showMeQuestionText.innerHTML.trim()).toBe('Show me question - Serious fault');
        });
        it('should indicate a show me serious fault in Welsh for a Welsh test', (done) => {
          fixture.detectChanges();
          store$.dispatch(new ShowMeQuestionSeriousFault());
          // Language change handled by parent page component, force the switch
          translate.use('cy').subscribe(() => {
            fixture.detectChanges();
            const showMeQuestionText = fixture.debugElement.query(By.css('#show-me-question-outcome')).nativeElement;
            const { showMeQuestion, seriousFault } = (<any>welshTranslations).debrief;
            const expectedTranslation = `${showMeQuestion} - ${seriousFault}`;
            expect(showMeQuestionText.innerHTML.trim()).toBe(expectedTranslation);
            done();
          });
        });
        it('should indicate when there was a dangerous fault on the show me question', () => {
          fixture.detectChanges();
          store$.dispatch(new ShowMeQuestionDangerousFault());
          fixture.detectChanges();
          const showMeQuestionText = fixture.debugElement.query(By.css('#show-me-question-outcome')).nativeElement;
          expect(showMeQuestionText.innerHTML.trim()).toBe('Show me question - Dangerous fault');
        });
        it('should indicate a tell me dangerous fault in Welsh for a Welsh test', (done) => {
          fixture.detectChanges();
          store$.dispatch(new ShowMeQuestionDangerousFault());
          // Language change handled by parent page component, force the switch
          translate.use('cy').subscribe(() => {
            fixture.detectChanges();
            const showMeQuestionText = fixture.debugElement.query(By.css('#show-me-question-outcome')).nativeElement;
            const { showMeQuestion, dangerousFault } = (<any>welshTranslations).debrief;
            const expectedTranslation = `${showMeQuestion} - ${dangerousFault}`;
            expect(showMeQuestionText.innerHTML.trim()).toBe(expectedTranslation);
            done();
          });
        });
      });
    });
  });

});
