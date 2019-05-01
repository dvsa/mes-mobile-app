
import { IonicModule } from 'ionic-angular';
import { TimerComponent } from '../timer';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('TimerComponent', () => {
  let fixture: ComponentFixture<TimerComponent>;
  let component: TimerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimerComponent,
      ],
      imports: [
        IonicModule,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TimerComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('generateTimerString', () => {
      it('should create the correct string when given 5 seconds', () => {
        component.seconds = 5;
        component.generateTimerString();
        expect(component.timerString).toBe('00:00:05');
      });
      it('should create the correct string when given 30 seconds', () => {
        component.seconds = 30;
        component.generateTimerString();
        expect(component.timerString).toBe('00:00:30');
      });
      it('should create the correct string when given 5 mins', () => {
        component.seconds = 300;
        component.generateTimerString();
        expect(component.timerString).toBe('00:05:00');
      });
      it('should create the correct string when given 30 mins', () => {
        component.seconds = 1800;
        component.generateTimerString();
        expect(component.timerString).toBe('00:30:00');
      });
      it('should create the correct string when given 5 hours', () => {
        component.seconds = 18000;
        component.generateTimerString();
        expect(component.timerString).toBe('05:00:00');
      });
      it('should create the correct string when given 15 hours', () => {
        component.seconds = 54000;
        component.generateTimerString();
        expect(component.timerString).toBe('15:00:00');
      });
    });

  });

  describe('DOM', () => {

  });
});
