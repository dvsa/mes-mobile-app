import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DangerousFaultBadgeComponent } from '../dangerous-fault-badge';
import { configureTestSuite } from 'ng-bullet';
describe('DangerousFaultBadgeComponenet', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                DangerousFaultBadgeComponent,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(DangerousFaultBadgeComponent);
        component = fixture.componentInstance;
    }));
    describe('DOM', function () {
        it('should display badge if showBadge is true', function () {
            component.showBadge = true;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.background'))).toBeDefined();
        });
        it('should not display badge if showBadge is false', function () {
            component.showBadge = false;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.background'))).toBeNull();
        });
    });
});
//# sourceMappingURL=dangerous-fault-badge.spec.js.map