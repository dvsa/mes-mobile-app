import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { ReverseDiagramLinkComponent } from '../reverse-diagram-link';
import { ModalController } from 'ionic-angular';
import { ModalControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../../app/app.module';
import { App } from '../../../../../../app/app.component';
import { MockAppComponent } from '../../../../../../app/__mocks__/app.component.mock';

describe('reverseDiagramLink', () => {
  let fixture: ComponentFixture<ReverseDiagramLinkComponent>;
  let component: ReverseDiagramLinkComponent;
  let modalController: ModalController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReverseDiagramLinkComponent],
      imports: [
        AppModule,
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
      });
  }));

  describe('DOM', () => {

  });

  describe('Class', () => {
    describe('openReverseDiagramModal', () => {
      it('should create an instance of the modal with the correct properties', () => {
        component.openReverseDiagramModal();
        expect(modalController.create).toHaveBeenCalledWith(
          'ReverseDiagramCatBEPage',
          {},
          { cssClass: 'modal-fullscreen text-zoom-regular' },
        );
      });
    });
  });
});
