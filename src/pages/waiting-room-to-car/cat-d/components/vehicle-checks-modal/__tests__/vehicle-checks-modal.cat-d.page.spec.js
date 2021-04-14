import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config, NavController, NavParams } from 'ionic-angular';
import { VehicleChecksCatDModal } from '../vehicle-checks-modal.cat-d.page';
import { Store, StoreModule } from '@ngrx/store';
import { ConfigMock, NavControllerMock, NavParamsMock } from 'ionic-mocks';
import { AppModule } from '../../../../../../app/app.module';
import { MockComponent } from 'ng-mocks';
import { VehicleChecksQuestionCatDComponent } from '../../vehicle-checks-question/vehicle-checks-question.cat-d';
import { SafetyQuestionComponent } from '../../safety-question/safety-question';
import { ShowMeQuestionOutcomeChanged, ShowMeQuestionSelected, TellMeQuestionSelected, TellMeQuestionOutcomeChanged, } from '../../../../../../modules/tests/test-data/cat-d/vehicle-checks/vehicle-checks.cat-d.action';
import { SafetyQuestionOutcomeChanged, } from '../../../../../../modules/tests/test-data/cat-d/safety-questions/safety-questions.cat-d.action';
import { WarningBannerComponent } from '../../../../../../components/common/warning-banner/warning-banner';
import { configureTestSuite } from 'ng-bullet';
describe('VehicleChecksCatDModal', function () {
    var fixture;
    var component;
    var store$;
    var bannerDisplayLogic = [
        { category: "D" /* D */, drivingFaults: 0, seriousFaults: 0, showBanner: false },
        { category: "D" /* D */, drivingFaults: 1, seriousFaults: 0, showBanner: false },
        { category: "D" /* D */, drivingFaults: 4, seriousFaults: 1, showBanner: true },
        { category: "D" /* D */, drivingFaults: 3, seriousFaults: 0, showBanner: false },
        { category: "D1" /* D1 */, drivingFaults: 0, seriousFaults: 0, showBanner: false },
        { category: "D1" /* D1 */, drivingFaults: 1, seriousFaults: 0, showBanner: false },
        { category: "D1" /* D1 */, drivingFaults: 4, seriousFaults: 1, showBanner: true },
        { category: "D1" /* D1 */, drivingFaults: 3, seriousFaults: 0, showBanner: false },
        { category: "D+E" /* DE */, drivingFaults: 0, seriousFaults: 0, showBanner: false },
        { category: "D+E" /* DE */, drivingFaults: 1, seriousFaults: 0, showBanner: false },
        { category: "D+E" /* DE */, drivingFaults: 1, seriousFaults: 1, showBanner: true },
        { category: "D1+E" /* D1E */, drivingFaults: 0, seriousFaults: 0, showBanner: false },
        { category: "D1+E" /* D1E */, drivingFaults: 1, seriousFaults: 0, showBanner: false },
        { category: "D1+E" /* D1E */, drivingFaults: 1, seriousFaults: 1, showBanner: true },
    ];
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleChecksCatDModal,
                MockComponent(VehicleChecksQuestionCatDComponent),
                MockComponent(SafetyQuestionComponent),
                WarningBannerComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
                StoreModule.forRoot({}),
            ],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleChecksCatDModal);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        it('should compile', function () {
            expect(component).toBeDefined();
        });
        describe('showMeQuestionChanged()', function () {
            it('should dispatch a new ShowMeQuestionSelected action', function () {
                var showMeQuestionPayload = {
                    code: '01',
                    description: 'desc',
                    outcome: 'P',
                };
                var index = 1;
                component.showMeQuestionChanged(showMeQuestionPayload, index);
                expect(component.store$.dispatch)
                    .toHaveBeenCalledWith(new ShowMeQuestionSelected(showMeQuestionPayload, index));
            });
        });
        describe('showMeQuestionOutcomeChanged()', function () {
            it('should dispatch a new ShowMeQuestionOutcomeChanged action', function () {
                var showMeQuestionOutcomePayload = 'P';
                var index = 1;
                component.showMeQuestionOutcomeChanged(showMeQuestionOutcomePayload, index);
                expect(component.store$.dispatch)
                    .toHaveBeenCalledWith(new ShowMeQuestionOutcomeChanged(showMeQuestionOutcomePayload, index));
            });
        });
        describe('tellMeQuestionChanged()', function () {
            it('should dispatch a new TellMeQuestionSelected action', function () {
                var tellMeQuestionPayload = {
                    code: 'T01',
                    description: 'desc',
                    outcome: 'DF',
                };
                var index = 1;
                component.tellMeQuestionChanged(tellMeQuestionPayload, index);
                expect(component.store$.dispatch)
                    .toHaveBeenCalledWith(new TellMeQuestionSelected(tellMeQuestionPayload, index));
            });
        });
        describe('tellMeQuestionOutcomeChanged()', function () {
            it('should dispatch a new TellMeQuestionOutcomeChanged action', function () {
                var tellMeQuestionOutcomePayload = 'P';
                var index = 1;
                component.tellMeQuestionOutcomeChanged(tellMeQuestionOutcomePayload, index);
                expect(component.store$.dispatch)
                    .toHaveBeenCalledWith(new TellMeQuestionOutcomeChanged(tellMeQuestionOutcomePayload, index));
            });
        });
        describe('safetyQuestionOutcomeChanged()', function () {
            it('should dispatch a new SafetyQuestionOutcomeChanged action', function () {
                var safetyQuestionOutcomePayload = 'P';
                var index = 1;
                component.safetyQuestionOutcomeChanged(safetyQuestionOutcomePayload, index);
                expect(component.store$.dispatch)
                    .toHaveBeenCalledWith(new SafetyQuestionOutcomeChanged(safetyQuestionOutcomePayload, index));
            });
        });
        describe('shouldDisplayBanner', function () {
            bannerDisplayLogic.forEach(function (bannerLogic) {
                it("Cat " + bannerLogic.category + " should return " + bannerLogic.showBanner + " if there are\n " + bannerLogic.drivingFaults + " driving faults and " + bannerLogic.seriousFaults + " serious", function () {
                    component.vehicleChecksScore = {
                        drivingFaults: bannerLogic.drivingFaults,
                        seriousFaults: bannerLogic.seriousFaults,
                    };
                    component.category = bannerLogic.category;
                    expect(component.shouldDisplayBanner()).toBe(bannerLogic.showBanner);
                });
            });
        });
    });
    describe('DOM', function () {
    });
});
//# sourceMappingURL=vehicle-checks-modal.cat-d.page.spec.js.map