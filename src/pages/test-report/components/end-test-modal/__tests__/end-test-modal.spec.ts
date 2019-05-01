import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { EndTestModal } from '../end-test-modal';
import { IonicModule, NavParams } from 'ionic-angular';
import { NavParamsMock } from 'ionic-mocks';
import { AppModule } from '../../../../../app/app.module';

fdescribe('EndTestModal', () => {
  let fixture: ComponentFixture<EndTestModal>;
  let component: EndTestModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EndTestModal,
      ],
      imports: [
        AppModule,
        IonicModule,
      ],
      providers: [
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EndTestModal);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {

  });
});
