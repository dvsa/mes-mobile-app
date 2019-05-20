import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { VehicleChecksCardComponent } from '../vehicle-checks-card';
import { IonicModule, Config } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { StoreModel } from '../../../../../shared/models/store.model';
import { StartTest } from '../../../../journal/journal.actions';
import {
  TellMeQuestionCorrect,
  ShowMeQuestionPassed,
  ShowMeQuestionDrivingFault,
  TellMeQuestionDrivingFault,
} from '../../../../../modules/tests/test-data/test-data.actions';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks';
import { TranslateService, TranslateModule, TranslateLoader } from 'ng2-translate';
import { createTranslateLoader } from '../../../../../app/app.module';
import { Http } from '@angular/http';

describe('VehicleChecksCardComponent', () => {
  let fixture: ComponentFixture<VehicleChecksCardComponent>;
  let component: VehicleChecksCardComponent;
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
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105));
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
      });
  }));

  describe('Class', () => {
    it('should compile', () => {
      expect(component).toBeDefined();
    });
  });

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
            expect(tellMeQuestionText.innerHTML.trim()).toBe('[CY] Tell me question - [CY] Driving fault');
            done();
          });
        });
      });
    });
  });

});
