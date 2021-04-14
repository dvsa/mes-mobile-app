import { async, TestBed } from '@angular/core/testing';
import { FaultCommentCardComponent } from '../fault-comment-card';
import { FaultCommentComponent } from '../../fault-comment/fault-comment';
import { MockComponent } from 'ng-mocks';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { AppModule } from '../../../../../app/app.module';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
describe('FaultCommentCardComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                FaultCommentCardComponent,
                MockComponent(FaultCommentComponent),
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(FaultCommentCardComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
    }));
    describe('DOM', function () {
        it('should display the provided header', function () {
            component.shouldRender = true;
            component.header = 'header';
            component.faultComments = [];
            component.faultType = 'drivingFault';
            fixture.detectChanges();
            var header = fixture.debugElement.query(By.css('h4')).nativeElement;
            expect(header.innerHTML).toBe('header');
        });
        it('should pass the faultComment and type to the fault-comment component', function () {
            component.shouldRender = true;
            component.faultComments = [
                { comment: 'c1', competencyIdentifier: 'id1', competencyDisplayName: 'display1', faultCount: 1 },
                { comment: 'c2', competencyIdentifier: 'id2', competencyDisplayName: 'display2', faultCount: 1 },
            ];
            component.faultType = 'drivingFault';
            fixture.detectChanges();
            var commentLabels = fixture.debugElement.queryAll(By.css('fault-comment'));
            expect(commentLabels.length).toBe(2);
            expect(commentLabels[0].componentInstance.faultType).toBe('drivingFault');
            expect(commentLabels[1].componentInstance.faultType).toBe('drivingFault');
            expect(commentLabels[0].componentInstance.faultComment).toBe(component.faultComments[0]);
            expect(commentLabels[1].componentInstance.faultComment).toBe(component.faultComments[1]);
        });
    });
});
//# sourceMappingURL=fault-comment-card.spec.js.map