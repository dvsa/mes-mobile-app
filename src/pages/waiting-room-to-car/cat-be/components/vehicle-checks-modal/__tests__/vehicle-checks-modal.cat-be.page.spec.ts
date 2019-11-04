
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { VehicleChecksCatBEModal } from '../vehicle-checks-modal.cat-be.page';
import { StoreModule } from '@ngrx/store';
import { ConfigMock } from 'ionic-mocks';
import { AppModule } from '../../../../../../app/app.module';
import { MockComponent } from 'ng-mocks';
import { VehicleChecksQuestionComponent } from '../../vehicle-checks-question/vehicle-checks-question';

describe('VehicleChecksCatBEModal', () => {
  let fixture: ComponentFixture<VehicleChecksCatBEModal>;
  let component: VehicleChecksCatBEModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleChecksCatBEModal,
        MockComponent(VehicleChecksQuestionComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VehicleChecksCatBEModal);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    it('should compile', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {

  });
});
