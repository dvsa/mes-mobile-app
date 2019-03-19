import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { VehicleDetailsComponent } from '../vehicle-details';
import { By } from '@angular/platform-browser';
// import { SecureStorageMock } from '@ionic-native-mocks/secure-storage';
// import { NetworkMock } from '@ionic-native-mocks/network';
// import { SecureStorage } from '@ionic-native/secure-storage';
// import { Network } from '@ionic-native/network';

describe('VehicleDetailsComponent', () => {
  let fixture: ComponentFixture<VehicleDetailsComponent>;
  let component: VehicleDetailsComponent;
//  let networkMock: Network;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleDetailsComponent,
      ],
      imports: [IonicModule],
      // providers: [
      //   { provide: Network, useClass: NetworkMock },
      //   { provide: SecureStorage, useClass: SecureStorageMock },
      // ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(VehicleDetailsComponent);
      component = fixture.componentInstance;
    });
  //  networkMock = TestBed.get(Network);
  }));

  describe('Class', () => {
    it('should create', () => {
//      spyOn(networkMock, 'onDisconnect');
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    it('should show vehicle details when showDimensions is true', () => {
      component.showDimensions = true;
      fixture.detectChanges();
      const ionCols = fixture.debugElement.queryAll(By.css('p'));
      expect(ionCols.length).toBe(1);
    });

    it('should not vehicle details when showDimensions is false', () => {
      component.showDimensions = false;
      fixture.detectChanges();
      const ionCols = fixture.debugElement.queryAll(By.css('p'));
      expect(ionCols.length).toBe(0);
    });
  });

});
