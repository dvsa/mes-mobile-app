import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../../../../shared/models/store.model';
import { ModalController } from 'ionic-angular';
import { ModalControllerMock } from 'ionic-mocks';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../../test-report.reducer';
import { ReverseDiagramLinkComponent } from '../reverse-diagram-link';
import { AppModule } from '../../../../../../app/app.module';
import { App } from '../../../../../../app/app.component';
import { MockAppComponent } from '../../../../../../app/__mocks__/app.component.mock';
import { ReverseDiagramOpened, ReverseDiagramClosed } from '../../reverse-diagram-modal/reverse-diagram-modal.actions';
import { NavigationProvider } from '../../../../../../providers/navigation/navigation';
import { NavigationProviderMock } from '../../../../../../providers/navigation/__mocks__/navigation.mock';
import { NavigationStateProvider } from '../../../../../../providers/navigation-state/navigation-state';
import {
  NavigationStateProviderMock,
} from '../../../../../../providers/navigation-state/__mocks__/navigation-state.mock';

describe('reverseDiagramLink', () => {
  let fixture: ComponentFixture<ReverseDiagramLinkComponent>;
  let component: ReverseDiagramLinkComponent;
  let modalController: ModalController;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
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
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ReverseDiagramLinkComponent);
        component = fixture.componentInstance;
        modalController = TestBed.get(ModalController);
        store$ = TestBed.get(Store);
      });
  }));

  describe('DOM', () => {

  });

  describe('Class', () => {
    describe('openReverseDiagramModal', () => {
      it('should dispatch ReverseDiagramOpened action', () => {
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.openReverseDiagramModal();
        expect(storeDispatchSpy).toHaveBeenCalledWith(
          new ReverseDiagramOpened(),
        );
      });

      it('should create an instance of the modal with the correct properties', () => {
        component.openReverseDiagramModal();
        expect(modalController.create).toHaveBeenCalledWith(
          'ReverseDiagramCatBEPage',
          { onClose: component.closeReverseDiagramModal },
          { cssClass: 'modal-fullscreen text-zoom-regular' },
        );
      });
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
