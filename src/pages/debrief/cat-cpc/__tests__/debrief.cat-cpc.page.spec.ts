import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebriefCatCPCPage } from '../debrief.cat-cpc.page';
import { configureTestSuite } from 'ng-bullet';
import { Config, IonicModule, NavController, NavParams, Platform } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { AppModule } from '../../../../app/app.module';
import { Store, StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfigMock, NavControllerMock, NavParamsMock, PlatformMock } from 'ionic-mocks';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ScreenOrientationMock } from '../../../../shared/mocks/screen-orientation.mock';
import { Insomnia } from '@ionic-native/insomnia';
import { InsomniaMock } from '../../../../shared/mocks/insomnia.mock';
import { FaultSummaryProvider } from '../../../../providers/fault-summary/fault-summary';
import { TestDataByCategoryProvider } from '../../../../providers/test-data-by-category/test-data-by-category';
import { StoreModel } from '../../../../shared/models/store.model';
import { EndDebrief } from '../../debrief.actions';
import { TestOutcome } from '../../../../shared/models/test-outcome';
import { CAT_CPC } from '../../../page-names.constants';
import { DebriefComponentsModule } from '../../components/debrief-components.module';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('DebriefCatCPCPage', () => {
  let fixture: ComponentFixture<DebriefCatCPCPage>;
  let component: DebriefCatCPCPage;
  let navController: NavController;
  let store$: Store<StoreModel>;
  let translate: TranslateService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DebriefCatCPCPage],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
        DebriefComponentsModule,
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            testStatus: {},
            startedTests: {
              123: {
                category: TestCategory.CCPC,
                vehicleDetails: {},
                accompaniment: {},
                testData: {
                  combination: 'LGV7',
                  question1: {
                    questionCode: 'Q12',
                    title: 'Loading the vehicle',
                    score: 20,
                  },
                  question2: {
                    questionCode: 'Q04',
                    title: 'Security of vehicle and contents',
                    score: 20,
                  },
                  question3: {
                    questionCode: 'Q15',
                    title: 'Preventing criminality and trafficking in illegal immigrants',
                    score: 20,
                  },
                  question4: {
                    questionCode: 'Q11',
                    title: 'Assessing emergency situations',
                    score: 20,
                  },
                  question5: {
                    questionCode: 'Q05',
                    title: 'Ability to prevent physical risk',
                    score: 20,
                  },
                  totalPercent: 100,
                },
                journalData: {
                  candidate: {
                    candidateName: 'Joe Bloggs',
                  },
                },
              },
            },
          }),
          testReport: () => ({
            seriousMode: false,
            dangerousMode: false,
            removeFaultMode: false,
            isValid: false,
          }),
        }),
        TranslateModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: ScreenOrientation, useClass: ScreenOrientationMock },
        { provide: Insomnia, useClass: InsomniaMock },
        { provide: FaultSummaryProvider, useClass: FaultSummaryProvider },
        TestDataByCategoryProvider,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DebriefCatCPCPage);
    component = fixture.componentInstance;
    navController = TestBed.get(NavController);
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch').and.callThrough();
    translate = TestBed.get(TranslateService);
    translate.setDefaultLang('en');
  }));

  describe('Class', () => {
    describe('endDebrief', () => {
      it('should dispatch the PersistTests action', () => {
        component.endDebrief();
        expect(store$.dispatch).toHaveBeenCalledWith(new EndDebrief);
      });
      it('should navigate to PassFinalisationPage when outcome = pass', () => {
        component.outcome = TestOutcome.PASS;
        component.endDebrief();
        expect(navController.push).toHaveBeenCalledWith(CAT_CPC.PASS_FINALISATION_PAGE);
      });
      it('should navigate to BackToOfficePage when outcome = fail', () => {
        component.outcome = TestOutcome.FAIL;
        component.endDebrief();
        expect(navController.push).toHaveBeenCalledWith(CAT_CPC.POST_DEBRIEF_HOLDING_PAGE);
      });
      it('should navigate to the BackToOfficePage when outcomes = terminated', () => {
        component.outcome = 'Terminated';
        component.endDebrief();
        expect(navController.push).toHaveBeenCalledWith(CAT_CPC.POST_DEBRIEF_HOLDING_PAGE);
      });
    });
  });

  describe('DOM', () => {
    it('should display the candidate name in the title', () => {
      fixture.detectChanges();
      component.pageState.candidateName$ = of('John Doe');
      fixture.detectChanges();
      const title = fixture.debugElement.query(By.css('ion-title'));
      expect(title.nativeElement.textContent).toEqual('Debrief - John Doe');
    });

  });
});
