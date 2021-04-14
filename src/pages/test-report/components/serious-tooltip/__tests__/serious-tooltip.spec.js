import { async, TestBed } from '@angular/core/testing';
import { SeriousTooltipComponent } from '../serious-tooltip';
import { configureTestSuite } from 'ng-bullet';
describe('SeriousTooltipComponenet', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                SeriousTooltipComponent,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(SeriousTooltipComponent);
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
//# sourceMappingURL=serious-tooltip.spec.js.map