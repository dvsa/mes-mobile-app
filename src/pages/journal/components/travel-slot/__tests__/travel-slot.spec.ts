import { TravelSlotComponent } from '../travel-slot';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { MockComponent } from 'ng-mocks';
import { TimeComponent } from '../../time/time';
import { AppConfigProvider } from '../../../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../../../providers/app-config/__mocks__/app-config.mock';
import { ConfigMock } from 'ionic-mocks-jest';

describe('TravelSlotComponent', () => {
  let fixture: ComponentFixture<TravelSlotComponent>;
  let component: TravelSlotComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TravelSlotComponent,
        MockComponent(TimeComponent),
      ],
      providers: [
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
      imports: [IonicModule],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TravelSlotComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('formatActivityCode', () => {
      it('should strip leading zeroes if they exist', () => {
        expect(component.formatActivityCode(undefined)).toBe('0');
        expect(component.formatActivityCode(null)).toBe('0');
        expect(component.formatActivityCode('128')).toBe('128');
        expect(component.formatActivityCode('091')).toBe('91');
      });
    });
  });
});