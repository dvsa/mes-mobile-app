import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config, NavController } from 'ionic-angular';
import { VehicleChecksCatHomeTestModal } from '../vehicle-checks-modal.cat-home-test.page';
import { Store, StoreModule } from '@ngrx/store';
import { ConfigMock, NavControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../../app/app.module';
import { MockComponent } from 'ng-mocks';
import { VehicleChecksQuestionComponent } from '../../vehicle-checks-question/vehicle-checks-question';
import { ShowMeQuestionOutcomeChanged, ShowMeQuestionSelected, TellMeQuestionSelected, TellMeQuestionOutcomeChanged, } from '../../../../../../modules/tests/test-data/cat-home-test/vehicle-checks/vehicle-checks.cat-home-test.action';
import { WarningBannerComponent } from '../../../../../../components/common/warning-banner/warning-banner';
import { configureTestSuite } from 'ng-bullet';
describe('VehicleChecksCatHomeTestModal', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleChecksCatHomeTestModal,
                MockComponent(VehicleChecksQuestionComponent),
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
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleChecksCatHomeTestModal);
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
            it('should return false if there are no 4 driving faults and 1 serious', function () {
                component.vehicleChecksScore = {
                    drivingFaults: 3,
                    seriousFaults: 0,
                };
                expect(component.shouldDisplayBanner()).toBeFalsy();
            });
            it('should return true if there are 4 driving faults and 1 serious', function () {
                component.vehicleChecksScore = {
                    drivingFaults: 4,
                    seriousFaults: 1,
                };
                expect(component.shouldDisplayBanner()).toBeTruthy();
            });
        });
    });
});
//# sourceMappingURL=vehicle-checks-modal.cat-home-test.page.spec.js.map