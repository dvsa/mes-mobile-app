import { ActivitySlotComponent } from '../activity-slot';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { MockComponent } from 'ng-mocks';
import { TimeComponent } from '../../time/time';
import { AppConfigProvider } from '../../../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../../../providers/app-config/__mocks__/app-config.mock';
import { ConfigMock } from 'ionic-mocks-jest';
import { By } from '@angular/platform-browser';

describe('ActivitySlotComponent', () => {
  let fixture: ComponentFixture<ActivitySlotComponent>;
  let component: ActivitySlotComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivitySlotComponent,
        MockComponent(TimeComponent),
      ],
      providers: [
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
      imports: [IonicModule],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ActivitySlotComponent);
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

    describe('getTitle', () => {
      beforeEach(() => {
        component.slot = {};
      });

      it('should return Unknown for an unmapped code', () => {
        component.slot.activityCode = 'notactivitycode';
        expect(component.getTitle()).toBe('Unknown')
      });     
      it('should return the display name if one exists', () => {
        component.slot.activityCode = '091';
        expect(component.getTitle()).toBe('Travel');
      });
      it('should return the activity description if there is no display name', () => {
        component.slot.activityCode = '142';
        expect(component.getTitle()).toBe('Personal development');
      });
    });
  });

  describe('DOM', () => {
    it('should pass the slot start time to the time component', () => {
      component.slot = {
        slotDetail: {
          start: 12345,
        }
      }
      fixture.detectChanges();
      const timeSubComponent = fixture.debugElement
        .query(By.directive(MockComponent(TimeComponent))).componentInstance as TimeComponent;
      expect(timeSubComponent.time).toBe(12345);
    });
  });
});