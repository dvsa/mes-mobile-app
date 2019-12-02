
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { ViewTestHeaderComponent } from '../view-test-header';
import { TestOutcome } from '../../../../../../modules/tests/tests.constants';
import { configureTestSuite } from 'ng-bullet'

describe('ViewTestHeaderComponent', () => {
  let fixture: ComponentFixture<ViewTestHeaderComponent>;
  let component: ViewTestHeaderComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewTestHeaderComponent,
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    })
  })

  beforeEach(async(() => {
        fixture = TestBed.createComponent(ViewTestHeaderComponent);
        component = fixture.componentInstance;
  }));

  describe('Class', () => {
    describe('isPassed', () => {
      it('should return true for activity code 1', ()  => {
        component.data = {
          activityCode: '1' ,
          candidateDriverNumber: '',
          candidateName: '',
          testOutcome: TestOutcome.Passed,
        };
        expect(component.isPassed()).toBe(true);
      });
      it('should return false for an activity code that is not 1', ()  => {
        component.data = {
          activityCode: '5' ,
          candidateDriverNumber: '',
          candidateName: '',
          testOutcome: TestOutcome.Passed,
        };
        expect(component.isPassed()).toBe(false);
      });
    });
  });
});
