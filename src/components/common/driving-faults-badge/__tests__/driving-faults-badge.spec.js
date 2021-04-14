import { DrivingFaultsBadgeComponent } from '../driving-faults-badge';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';
describe('DrivingFaultsBadgeComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                DrivingFaultsBadgeComponent,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(DrivingFaultsBadgeComponent);
        component = fixture.componentInstance;
    }));
    describe('DOM', function () {
        it('should display the number of faults in the DOM', function () {
            component.count = 5;
            fixture.detectChanges();
            var renderedCount = fixture.debugElement.query(By.css('.count')).nativeElement.innerHTML;
            expect(renderedCount).toBe('5');
        });
    });
    it('should not be visible when the fault count is 0', function () {
        component.count = 0;
        var divsInContainer = fixture.debugElement.queryAll(By.css('.counter-background'));
        expect(divsInContainer.length).toBe(0);
    });
});
//# sourceMappingURL=driving-faults-badge.spec.js.map