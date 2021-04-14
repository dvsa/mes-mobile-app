import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config, NavController, NavParams } from 'ionic-angular';
import { VehicleChecksCatCModal } from '../vehicle-checks-modal.cat-c.page';
import { Store, StoreModule } from '@ngrx/store';
import { ConfigMock, NavControllerMock, NavParamsMock } from 'ionic-mocks';
import { AppModule } from '../../../../../../app/app.module';
import { MockComponent } from 'ng-mocks';
import { VehicleChecksQuestionCatCComponent } from '../../vehicle-checks-question/vehicle-checks-question.cat-c';
import { ShowMeQuestionOutcomeChanged, ShowMeQuestionSelected, TellMeQuestionSelected, TellMeQuestionOutcomeChanged, } from '../../../../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.action';
import { WarningBannerComponent } from '../../../../../../components/common/warning-banner/warning-banner';
import { configureTestSuite } from 'ng-bullet';
describe('VehicleChecksCatCModal', function () {
    var fixture;
    var component;
    var store$;
    var bannerDisplayLogic = [
        { category: "C" /* C */, drivingFaults: 0, seriousFaults: 0, showBanner: false },
        { category: "C" /* C */, drivingFaults: 1, seriousFaults: 0, showBanner: false },
        { category: "C" /* C */, drivingFaults: 4, seriousFaults: 1, showBanner: true },
        { category: "C" /* C */, drivingFaults: 3, seriousFaults: 0, showBanner: false },
        { category: "C1" /* C1 */, drivingFaults: 0, seriousFaults: 0, showBanner: false },
        { category: "C1" /* C1 */, drivingFaults: 1, seriousFaults: 0, showBanner: false },
        { category: "C1" /* C1 */, drivingFaults: 4, seriousFaults: 1, showBanner: true },
        { category: "C1" /* C1 */, drivingFaults: 3, seriousFaults: 0, showBanner: false },
        { category: "C+E" /* CE */, drivingFaults: 0, seriousFaults: 0, showBanner: false },
        { category: "C+E" /* CE */, drivingFaults: 1, seriousFaults: 0, showBanner: false },
        { category: "C+E" /* CE */, drivingFaults: 1, seriousFaults: 1, showBanner: true },
        { category: "C1+E" /* C1E */, drivingFaults: 0, seriousFaults: 0, showBanner: false },
        { category: "C1+E" /* C1E */, drivingFaults: 1, seriousFaults: 0, showBanner: false },
        { category: "C1+E" /* C1E */, drivingFaults: 1, seriousFaults: 1, showBanner: true },
    ];
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleChecksCatCModal,
                MockComponent(VehicleChecksQuestionCatCComponent),
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
        fixture = TestBed.createComponent(VehicleChecksCatCModal);
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
        describe('shouldDisplayBanner', function () {
            bannerDisplayLogic.forEach(function (bannerLogic) {
                it("Cat " + bannerLogic.category + " should return " + bannerLogic.showBanner + " if\n there are " + bannerLogic.drivingFaults + " driving faults and " + bannerLogic.seriousFaults + " serious", function () {
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
//# sourceMappingURL=vehicle-checks-modal.cat-c.page.spec.js.map