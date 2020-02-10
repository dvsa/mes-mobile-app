import { ReverseDiagramLinkComponent } from '../reverse-diagram-link';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ModalController } from 'ionic-angular';
import { StoreModel } from '../../../../shared/models/store.model';
import { configureTestSuite } from 'ng-bullet';
import { testReportReducer } from '../../../../pages/test-report/test-report.reducer';
import { NavigationStateProvider } from '../../../../providers/navigation-state/navigation-state';
import { MockAppComponent } from '../../../../app/__mocks__/app.component.mock';
import { AppModule } from '../../../../app/app.module';
import { NavigationProvider } from '../../../../providers/navigation/navigation';
import { ModalControllerMock } from 'ionic-mocks';
import { NavigationProviderMock } from '../../../../providers/navigation/__mocks__/navigation.mock';
import { NavigationStateProviderMock } from '../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { testsReducer } from '../../../../modules/tests/tests.reducer';
import { App } from '../../../../app/app.component';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  ReverseDiagramClosed,
  ReverseDiagramOpened,
} from '../../../../pages/test-report/components/reverse-diagram-modal/reverse-diagram-modal.actions';
import { CAT_BE, CAT_C, CAT_D } from '../../../../pages/page-names.constants';

describe('reverseDiagramLink', () => {
  let fixture: ComponentFixture<ReverseDiagramLinkComponent>;
  let component: ReverseDiagramLinkComponent;
  let modalController: ModalController;
  let store$: Store<StoreModel>;
  const applicableCategories = [
    [TestCategory.BE, CAT_BE.REVERSE_DIAGRAM_PAGE],
    [TestCategory.C, CAT_C.REVERSE_DIAGRAM_PAGE],
    [TestCategory.C1, CAT_C.REVERSE_DIAGRAM_PAGE],
    [TestCategory.CE, CAT_C.REVERSE_DIAGRAM_PAGE],
    [TestCategory.C1E, CAT_C.REVERSE_DIAGRAM_PAGE],
    [TestCategory.D, CAT_D.REVERSE_DIAGRAM_PAGE],
    [TestCategory.D1, CAT_D.REVERSE_DIAGRAM_PAGE],
    [TestCategory.DE, CAT_D.REVERSE_DIAGRAM_PAGE],
    [TestCategory.D1E, CAT_D.REVERSE_DIAGRAM_PAGE],
  ];

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ReverseDiagramLinkComponent],
      imports: [
        AppModule,
        StoreModule.forRoot({ tests: testsReducer, testReport: testReportReducer }),
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

  describe('DOM', () => {

  });

  describe('Class', () => {
    describe('openReverseDiagramModal', () => {
      it('should dispatch ReverseDiagramModal', () => {
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.openReverseDiagramModal();
        expect(storeDispatchSpy).toHaveBeenCalledWith(
          new ReverseDiagramOpened(),
        );
      });
      for (const testCategory in applicableCategories) {
        it('should create an instance of the modal with the correct properties', () => {
          component.testCategory = applicableCategories[testCategory][0] as TestCategory;
          component.openReverseDiagramModal();
          expect(modalController.create).toHaveBeenCalledWith(
            applicableCategories[testCategory][1],
            { onClose: component.closeReverseDiagramModal },
            { cssClass: 'modal-fullscreen text-zoom-regular' },
          );
        });
      }

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
