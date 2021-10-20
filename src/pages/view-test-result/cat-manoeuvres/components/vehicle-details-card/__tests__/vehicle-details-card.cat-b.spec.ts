
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { VehicleDetailsCardCatManoeuvresComponent } from '../vehicle-details-card.cat-manoeuvres';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../../../components/common/data-row/data-row';
import { configureTestSuite } from 'ng-bullet';

describe('VehicleDetailsCardCatManoeuvresComponent', () => {
  let fixture: ComponentFixture<VehicleDetailsCardCatManoeuvresComponent>;
  let component: VehicleDetailsCardCatManoeuvresComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleDetailsCardCatManoeuvresComponent,
        MockComponent(DataRowComponent),
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VehicleDetailsCardCatManoeuvresComponent);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    describe('shouldHideCard', () => {
      it('should return true if valid data is not provided', () => {
        component.data = {
          transmission: undefined,
        };

        expect(component.shouldHideCard()).toEqual(true);
      });
    });
  });

  describe('DOM', () => {

  });

});
