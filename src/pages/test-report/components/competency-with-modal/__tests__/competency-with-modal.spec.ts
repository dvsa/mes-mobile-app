import { TickIndicatorComponent } from '../../tick-indicator/tick-indicator';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { CompetencyWithModalComponent } from '../competency-with-modal';
import { AppModule } from '../../../../../app/app.module';
import { MockComponent } from 'ng-mocks';
import { FaultCounterComponent } from '../../fault-counter/fault-counter';
import { DateTimeProvider } from '../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../providers/date-time/__mocks__/date-time.mock';

describe('CompetencyWithModalComponent', () => {
  let fixture: ComponentFixture<CompetencyWithModalComponent>;
  let component: CompetencyWithModalComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompetencyWithModalComponent,
        TickIndicatorComponent,
        MockComponent(FaultCounterComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
      providers: [
        { provide: DateTimeProvider, useCalss: DateTimeProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CompetencyWithModalComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    describe('Button', () => {
      it('should show provided label', () => {
        component.controlLabel = 'a label';
        fixture.detectChanges();
        const label = fixture.debugElement.query(By.css('.label'));
        expect(label.nativeElement.innerHTML).toBe('a label');
      });
    });
    describe('Button', () => {
      it('should display popover type control content when promoted is true', () => {
        component.displayPopover = true;
        fixture.detectChanges();
        const tickDe = fixture.debugElement.query(By.css('.popover'));
        expect(tickDe).toBeDefined();
      });
    });
  });
});
