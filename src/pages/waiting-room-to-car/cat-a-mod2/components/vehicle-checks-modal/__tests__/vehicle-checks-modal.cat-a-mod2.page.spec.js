import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config, NavController } from 'ionic-angular';
import { VehicleChecksCatAMod2Modal } from '../vehicle-checks-modal.cat-a-mod2.page';
import { Store, StoreModule } from '@ngrx/store';
import { ConfigMock, NavControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../../app/app.module';
import { MockComponent } from 'ng-mocks';
import { VehicleChecksQuestionComponent } from '../../vehicle-checks-question/vehicle-checks-question';
import { WarningBannerComponent } from '../../../../../../components/common/warning-banner/warning-banner';
import { configureTestSuite } from 'ng-bullet';
import { SafetyQuestionOutcomeChanged, BalanceQuestionSelected, SafetyQuestionSelected, BalanceQuestionOutcomeChanged } from '../../../../../../modules/tests/test-data/cat-a-mod2/safety-and-balance/safety-and-balance.cat-a-mod2.actions';
describe('VehicleChecksCatAMod2Modal', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleChecksCatAMod2Modal,
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
        fixture = TestBed.createComponent(VehicleChecksCatAMod2Modal);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        it('should compile', function () {
            expect(component).toBeDefined();
        });
        describe('safetyQuestionChanged()', function () {
            it('should dispatch a new ShowMeQuestionSelected action', function () {
                var safetyQuestionPayload = {
                    code: '01',
                    description: 'desc',
                    outcome: 'P',
                };
                var index = 1;
                component.safetyQuestionChanged(safetyQuestionPayload, index);
                expect(component.store$.dispatch)
                    .toHaveBeenCalledWith(new SafetyQuestionSelected(safetyQuestionPayload, index));
            });
        });
        describe('safetyQuestionOutcomeChanged()', function () {
            it('should dispatch a new safetyQuestionOutcomeChanged action', function () {
                var safetyQuestionOutcomePayload = 'P';
                var index = 1;
                component.safetyQuestionOutcomeChanged(safetyQuestionOutcomePayload, index);
                expect(component.store$.dispatch)
                    .toHaveBeenCalledWith(new SafetyQuestionOutcomeChanged(safetyQuestionOutcomePayload, index));
            });
        });
        describe('balanceQuestionChanged()', function () {
            it('should dispatch a new BalanceQuestionSelected action', function () {
                var balanceQuestionPayload = {
                    code: 'T01',
                    description: 'desc',
                    outcome: 'DF',
                };
                var index = 1;
                component.balanceQuestionChanged(balanceQuestionPayload, index);
                expect(component.store$.dispatch)
                    .toHaveBeenCalledWith(new BalanceQuestionSelected(balanceQuestionPayload, index));
            });
        });
        describe('balanceQuestionOutcomeChanged()', function () {
            it('should dispatch a new balanceQuestionOutcomeChanged action', function () {
                var balanceQuestionOutcomePayload = 'P';
                var index = 1;
                component.balanceQuestionOutcomeChanged(balanceQuestionOutcomePayload, index);
                expect(component.store$.dispatch)
                    .toHaveBeenCalledWith(new BalanceQuestionOutcomeChanged(balanceQuestionOutcomePayload, index));
            });
        });
        describe('shouldDisplayBanner', function () {
            it('should return false if there are no riding faults', function () {
                component.safetyAndBalanceQuestionsScore = {
                    drivingFaults: 0,
                };
                expect(component.shouldDisplayBanner()).toBeFalsy();
            });
            it('should return true if there is 1 riding fault', function () {
                component.safetyAndBalanceQuestionsScore = {
                    drivingFaults: 1,
                };
                expect(component.shouldDisplayBanner()).toBeTruthy();
            });
        });
    });
});
//# sourceMappingURL=vehicle-checks-modal.cat-a-mod2.page.spec.js.map