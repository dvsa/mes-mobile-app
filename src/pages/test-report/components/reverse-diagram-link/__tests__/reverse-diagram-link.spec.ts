import { ReverseDiagramLinkComponent } from '../reverse-diagram-link';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ModalController } from 'ionic-angular';
import { StoreModel } from '../../../../../shared/models/store.model';
import { configureTestSuite } from 'ng-bullet';
import { testReportReducer } from '../../../test-report.reducer';
import { NavigationStateProvider } from '../../../../../providers/navigation-state/navigation-state';
import { MockAppComponent } from '../../../../../app/__mocks__/app.component.mock';
import { AppModule } from '../../../../../app/app.module';
import { NavigationProvider } from '../../../../../providers/navigation/navigation';
import { ModalControllerMock } from 'ionic-mocks';
import { NavigationProviderMock } from '../../../../../providers/navigation/__mocks__/navigation.mock';
import { NavigationStateProviderMock } from '../../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { App } from '../../../../../app/app.component';
import {
  ReverseDiagramClosed,
  ReverseDiagramOpened,
} from '../../reverse-diagram-modal/reverse-diagram-modal.actions';
import { REVERSE_DIAGRAM_PAGE } from '../../../../page-names.constants';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('reverseDiagramLink', () => {
  let fixture: ComponentFixture<ReverseDiagramLinkComponent>;
  let component: ReverseDiagramLinkComponent;
  let modalController: ModalController;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ReverseDiagramLinkComponent],
      imports: [
        AppModule,
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            testStatus: {},
            startedTests: {
              123: {
                category: TestCategory.D, // Value will be overridden where necessary
                vehicleDetails: {
                  vehicleLength: 10,
                  vehicleWidth: 2.75,
                },
                accompaniment: {},
                testData: {
                  dangerousFaults: {},
                  drivingFaults: {},
                  manoeuvres: {},
                  seriousFaults: {},
                  testRequirements: {},
                  ETA: {},
                  eco: {},
                  vehicleChecks: {
                    showMeQuestions: [{
                      code: 'S3',
                      description: '',
                      outcome: '',
                    }],
                    tellMeQuestions: [{
                      code: '',
                      description: '',
                      outcome: '',
                    }],
                  },
                  eyesightTest: {},
                },
                activityCode: '28',
                journalData: {
                  candidate: {
                    candidateName: 'Joe Bloggs',
                    driverNumber: '123',
                  },
                },
                rekey: false,
              },
            },
          }),
          testReport: testReportReducer,
        }),
      ],
      providers: [
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
        { provide: App, useClass: MockAppComponent },
        { provide: NavigationProvider, useClass: NavigationProviderMock },
        { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReverseDiagramLinkComponent);
    component = fixture.componentInstance;
    modalController = TestBed.get(ModalController);
    store$ = TestBed.get(Store);
  }));
  describe('Class', () => {
    describe('ngOnInit', () => {
      it('should set the testCategory to Cat D', () => {
        component.ngOnInit();
        expect(component.testCategory).toBe(TestCategory.D);
      });
    });
    describe('openReverseDiagramModal', () => {
      it('should dispatch ReverseDiagramModal', () => {
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.openReverseDiagramModal();
        expect(storeDispatchSpy).toHaveBeenCalledWith(
          new ReverseDiagramOpened(),
        );
      });
      it('should create an instance of the modal with the correct properties', () => {
        component.openReverseDiagramModal();
        expect(modalController.create).toHaveBeenCalledWith(
          REVERSE_DIAGRAM_PAGE,
          { onClose: component.closeReverseDiagramModal },
          { cssClass: 'modal-fullscreen text-zoom-regular' },
        );
      });

      describe('closeReverseDiagramModal', () => {
        it('should dispatch ReverseDiagramClosed action', () => {
          const storeDispatchSpy = spyOn(store$, 'dispatch');
          component.closeReverseDiagramModal();
          expect(storeDispatchSpy).toHaveBeenCalledWith(
            new ReverseDiagramClosed(),
          );
        });
      });
    });
  });
});
