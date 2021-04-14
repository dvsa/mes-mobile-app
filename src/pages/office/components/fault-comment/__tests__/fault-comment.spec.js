import { async, TestBed } from '@angular/core/testing';
import { FaultCommentComponent } from '../fault-comment';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { OutcomeBehaviourMapProvider } from '../../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../../office-behaviour-map';
import { CommentSource } from '../../../../../shared/models/fault-marking.model';
import { configureTestSuite } from 'ng-bullet';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
describe('FaultCommentComponent', function () {
    var fixture;
    var component;
    var behaviourMapProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                FaultCommentComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
                ComponentsModule,
            ],
            providers: [
                { provide: OutcomeBehaviourMapProvider, useClass: OutcomeBehaviourMapProvider },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(FaultCommentComponent);
        behaviourMapProvider = TestBed.get(OutcomeBehaviourMapProvider);
        behaviourMapProvider.setBehaviourMap(behaviourMap);
        component = fixture.componentInstance;
        component.parentForm = new FormGroup({});
        var control = new FormControl(null);
        component.parentForm.addControl("faultComment-" + CommentSource.SIMPLE + "-driving-id", control);
    }));
    describe('DOM', function () {
        it('should display the fault competency display name', function () {
            component.faultComment = {
                comment: 'comment',
                competencyDisplayName: 'display',
                competencyIdentifier: 'id',
                source: CommentSource.SIMPLE,
                faultCount: 1,
            };
            component.faultType = 'driving';
            component.ngOnChanges();
            fixture.detectChanges();
            var displayName = fixture.debugElement.query(By.css('.fault-label')).nativeElement;
            expect(displayName.innerHTML).toBe('display');
        });
        it('should add validators to the form field if > 15 driving faults.', function () {
            component.faultComment = {
                comment: 'comment',
                competencyDisplayName: 'Signals - timed',
                competencyIdentifier: 'signalsTimed',
                faultCount: 16,
                source: CommentSource.SIMPLE,
            };
            component.faultType = 'driving';
            component.faultCount = 16;
            component.outcome = '5';
            component.shouldRender = true;
            var control = new FormControl(null);
            component.parentForm.addControl("faultComment-" + CommentSource.SIMPLE + "-driving-signalsTimed", control);
            component.ngOnChanges();
            fixture.detectChanges();
            var validator = component.parentForm.get("faultComment-" + CommentSource.SIMPLE + "-driving-signalsTimed").validator;
            expect(validator).not.toBeNull();
        });
        it('should clear validators from the form field if < 16 driving faults.', function () {
            component.faultComment = {
                comment: 'comment',
                competencyDisplayName: 'Signals - timed',
                competencyIdentifier: 'signalsTimed',
                faultCount: 4,
                source: CommentSource.SIMPLE,
            };
            component.faultType = 'driving';
            component.faultCount = 15;
            component.outcome = '5';
            var control = new FormControl(null);
            component.parentForm.addControl("faultComment-" + CommentSource.SIMPLE + "-driving-signalsTimed", control);
            component.ngOnChanges();
            fixture.detectChanges();
            var validator = component.parentForm.get("faultComment-" + CommentSource.SIMPLE + "-driving-signalsTimed").validator;
            expect(validator).toBeNull();
        });
        it('should clear validators for driving faults if > 15 driving faults and shouldRender is false', function () {
            component.faultComment = {
                comment: 'comment',
                competencyDisplayName: 'Signals - timed',
                competencyIdentifier: 'signalsTimed',
                faultCount: 16,
                source: CommentSource.SIMPLE,
            };
            component.faultType = 'driving';
            component.faultCount = 16;
            component.outcome = '5';
            component.shouldRender = false;
            var control = new FormControl(null);
            component.parentForm.addControl("faultComment-" + CommentSource.SIMPLE + "-driving-signalsTimed", control);
            component.ngOnChanges();
            fixture.detectChanges();
            expect(component.parentForm
                .get("faultComment-" + CommentSource.SIMPLE + "-driving-signalsTimed").validator).toBeNull();
        });
        it('should pass the fault count down to the driving-fault-badge', function () {
            component.faultComment = {
                comment: 'comment',
                competencyDisplayName: 'display',
                competencyIdentifier: 'id',
                faultCount: 3,
                source: CommentSource.SIMPLE,
            };
            component.faultType = 'driving';
            component.ngOnChanges();
            fixture.detectChanges();
            var drivingFaultBadge = fixture.debugElement
                .query(By.css('driving-faults-badge')).componentInstance;
            expect(drivingFaultBadge.count).toBe(3);
        });
        it('should emit fault comment', function () {
            spyOn(component.faultCommentChange, 'emit');
            var faultComment = 'this is a fault comment';
            component.faultComment = {
                comment: faultComment,
                competencyDisplayName: 'display',
                competencyIdentifier: 'id',
                source: CommentSource.SIMPLE,
                faultCount: 1,
            };
            component.faultType = 'driving';
            component.faultCommentChanged(faultComment);
            expect(component.faultCommentChange.emit).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=fault-comment.spec.js.map