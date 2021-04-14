import { async, TestBed } from '@angular/core/testing';
import { ReverseLeftPopoverComponent } from '../reverse-left-popover';
import { configureTestSuite } from 'ng-bullet';
import { ManoeuvreCompetencyComponent } from '../../manoeuvre-competency/manoeuvre-competency';
import { ReverseDiagramLinkComponent } from '../../reverse-diagram-link/reverse-diagram-link';
import { IonicModule } from 'ionic-angular';
import { MockComponent } from 'ng-mocks';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { ManoeuvreCompetencies } from '../../../../../modules/tests/test-data/test-data.constants';
describe('reverseLeftComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
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
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ReverseLeftPopoverComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('getId', function () {
            it('should return reverseLeft-controlFault', function () {
                var result = component.getId(ManoeuvreCompetencies.controlFault);
                expect(result).toBe('reverseLeft-controlFault');
            });
            it('should return reverseLeft-observationFault', function () {
                var result = component.getId(ManoeuvreCompetencies.observationFault);
                expect(result).toBe('reverseLeft-observationFault');
            });
        });
        describe('shouldShowReverseDiagramLink', function () {
            var testCases = [
                { category: "B+E" /* BE */, outcome: true },
                { category: "C" /* C */, outcome: true },
                { category: "C1" /* C1 */, outcome: true },
                { category: "C1+E" /* C1E */, outcome: true },
                { category: "C+E" /* CE */, outcome: true },
                { category: "D" /* D */, outcome: true },
                { category: "D1" /* D1 */, outcome: true },
                { category: "D+E" /* DE */, outcome: true },
                { category: "D1+E" /* D1E */, outcome: true },
                { category: "F" /* F */, outcome: false },
                { category: "G" /* G */, outcome: false },
                { category: "H" /* H */, outcome: false },
                { category: "K" /* K */, outcome: false },
            ];
            testCases.forEach(function (testCase) {
                it("should return the correct result for a category " + testCase.category + " test", function () {
                    component.testCategory = testCase.category;
                    fixture.detectChanges();
                    expect(component.shouldShowReverseDiagramLink()).toEqual(testCase.outcome);
                });
            });
        });
    });
});
//# sourceMappingURL=reverse-left.popover.spec.js.map