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
import {
  ReverseDiagramClosed,
  ReverseDiagramOpened,
} from '../../../../pages/test-report/components/reverse-diagram-modal/reverse-diagram-modal.actions';
import { REVERSE_DIAGRAM_PAGE } from '../../../../pages/page-names.constants';

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
