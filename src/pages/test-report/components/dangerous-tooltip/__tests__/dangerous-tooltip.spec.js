import { async, TestBed } from '@angular/core/testing';
import { DangerousTooltipComponent } from '../dangerous-tooltip';
import { configureTestSuite } from 'ng-bullet';
describe('DangerousTooltipComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                DangerousTooltipComponent,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(DangerousTooltipComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        it('should create', function () {
            expect(component).toBeDefined();
        });
    });
    describe('DOM', function () {
    });
});
//# sourceMappingURL=dangerous-tooltip.spec.js.map