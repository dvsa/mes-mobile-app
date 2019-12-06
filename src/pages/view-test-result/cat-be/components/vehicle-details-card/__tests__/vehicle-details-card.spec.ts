
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { VehicleDetailsCardComponent } from '../vehicle-details-card';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../components/data-row/data-row';
import { DataRowCustomComponent } from '../../../../components/data-row-custom/data-row-custom';

describe('VehicleDetailsCardComponent', () => {
  let fixture: ComponentFixture<VehicleDetailsCardComponent>;
  let component: VehicleDetailsCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleDetailsCardComponent,
        MockComponent(DataRowComponent),
        MockComponent(DataRowCustomComponent),
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VehicleDetailsCardComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    describe('shouldHideCard', () => {
      it('should return true if valid data is not provided', () => {
        component.data = {
          registrationNumber: null,
          transmission: undefined,
        };

        expect(component.shouldHideCard()).toEqual(true);
      });
    });
  });

  describe('DOM', () => {

  });

});
