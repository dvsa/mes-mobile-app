import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { SubmissionStatusComponent } from '../submission-status';
import { TestStatus } from '../../../../../modules/tests/test-status/test-status.model';

describe('PracticeTestModal', () => {
  let fixture: ComponentFixture<SubmissionStatusComponent>;
  let component: SubmissionStatusComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SubmissionStatusComponent,
      ],
      imports: [
        AppModule,
        IonicModule,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SubmissionStatusComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('showBanner', () => {
      it('should show banner if test status is completed', () => {
        component.testStatus = TestStatus.Completed;
        expect(component.showBanner()).toBeTruthy();
      });
      it('should not show banner if test status is booked', () => {
        component.testStatus = TestStatus.Booked;
        expect(component.showBanner()).toBeFalsy();
      });
      it('should not show banner if test status is decided', () => {
        component.testStatus = TestStatus.Decided;
        expect(component.showBanner()).toBeFalsy();
      });
      it('should not show banner if test status is started', () => {
        component.testStatus = TestStatus.Started;
        expect(component.showBanner()).toBeFalsy();
      });
      it('should not show banner if test status is submitted', () => {
        component.testStatus = TestStatus.Submitted;
        expect(component.showBanner()).toBeFalsy();
      });
    });
  });

});
