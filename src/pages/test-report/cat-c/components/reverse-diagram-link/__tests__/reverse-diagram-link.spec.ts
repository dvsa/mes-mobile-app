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
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import {
  ReverseDiagramOpened,
  ReverseDiagramClosed,
} from '../../../../components/reverse-diagram-modal/reverse-diagram-modal.actions';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

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
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ReverseDiagramLinkComponent);
        component = fixture.componentInstance;
        modalController = TestBed.get(ModalController);
        store$ = TestBed.get(Store);

        // // TODO: MES-4287 Change category to C
        store$.dispatch(new StartTest(105, TestCategory.BE));
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
          'ReverseDiagramCatCPage',
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
