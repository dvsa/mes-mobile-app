import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReverseLeftPopoverComponent } from '../reverse-left-popover';
import { configureTestSuite } from 'ng-bullet';
import { ManoeuvreCompetencyComponent }
 from '../../manoeuvre-competency/manoeuvre-competency';
import { ReverseDiagramLinkComponent } from '../../reverse-diagram-link/reverse-diagram-link';
import { IonicModule } from 'ionic-angular';
import { MockComponent } from 'ng-mocks';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { By } from '@angular/platform-browser';
import { ManoeuvreCompetencies } from '../../../../../modules/tests/test-data/test-data.constants';

describe('reverseLeftComponent', () => {
  let fixture: ComponentFixture<ReverseLeftPopoverComponent>;
  let component: ReverseLeftPopoverComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReverseLeftPopoverComponent,
        MockComponent(ManoeuvreCompetencyComponent),
        MockComponent(ReverseDiagramLinkComponent),
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        FaultCountProvider,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReverseLeftPopoverComponent);
    component = fixture.componentInstance;
  }));

  describe('DOM', () => {
    it('should display a link to open the reverse diagram', () => {
      const iconElement = fixture.debugElement.queryAll(By.css('reverse-diagram-link[id="reverse-diagram-link"]'));
      fixture.detectChanges();
      expect(iconElement.length).toBe(1);
    });
  });

  describe('Class', () => {
    describe('getId', () => {
      it('should return reverseLeft-controlFault', () => {
        const result = component.getId(ManoeuvreCompetencies.controlFault);
        expect(result).toBe('reverseLeft-controlFault');
      });

      it('should return reverseLeft-observationFault', () => {
        const result = component.getId(ManoeuvreCompetencies.observationFault);
        expect(result).toBe('reverseLeft-observationFault');
      });
    });
  });
});
