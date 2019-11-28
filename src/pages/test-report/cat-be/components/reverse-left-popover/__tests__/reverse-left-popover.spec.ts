import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { ReverseLeftPopoverComponent } from '../reverse-left-popover';
import { MockComponent } from 'ng-mocks';
import { IonicModule } from 'ionic-angular';
import { FaultCountProvider } from '../../../../../../providers/fault-count/fault-count';
import { ManoeuvreCompetencyComponent } from '../../../../components/manoeuvre-competency/manoeuvre-competency';
import { ManoeuvreCompetencies } from '../../../../../../modules/tests/test-data/test-data.constants';

describe('reverseLeftComponent', () => {
  let fixture: ComponentFixture<ReverseLeftPopoverComponent>;
  let component: ReverseLeftPopoverComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReverseLeftPopoverComponent,
        MockComponent(ManoeuvreCompetencyComponent),
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        FaultCountProvider,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ReverseLeftPopoverComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('DOM', () => {

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
