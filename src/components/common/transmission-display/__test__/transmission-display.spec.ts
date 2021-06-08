import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { TransmissionDisplayComponent } from '../transmission-display';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { IonicModule } from 'ionic-angular';

describe('TransmissionDisplayComponent', () => {
  let fixture: ComponentFixture<TransmissionDisplayComponent>;
  let component: TransmissionDisplayComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule,
      ],
      declarations: [
        TransmissionDisplayComponent,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransmissionDisplayComponent);
    component = fixture.componentInstance;
  }));

  describe('getTransmissionText', () => {
    it('should return appropriate string if Manual', () => {
      expect(component.getTransmissionText('Manual', false, TestCategory.B)).toEqual('Manual');
    });
    it('should return appropriate string if Automatic', () => {
      expect(component.getTransmissionText('Automatic', false, TestCategory.B))
        .toEqual('Automatic - An automatic licence will be issued');
    });
    it('should return appropriate string if Manual and no code78', () => {
      expect(component.getTransmissionText('Manual', false, TestCategory.C)).toEqual('Manual');
    });
    it('should return appropriate string if Manual and code78', () => {
      expect(component.getTransmissionText('Manual', true, TestCategory.C)).toEqual('Manual');
    });
    it('should return appropriate string if Automatic and code78', () => {
      expect(component.getTransmissionText('Automatic', true, TestCategory.C))
        .toEqual('Automatic - An automatic licence will be issued');
    });
    it('should return appropriate string if Automatic no code78', () => {
      expect(component.getTransmissionText('Automatic', false, TestCategory.C))
        .toEqual('Automatic - No code 78 - A manual licence will be issued');
    });
  });
});
