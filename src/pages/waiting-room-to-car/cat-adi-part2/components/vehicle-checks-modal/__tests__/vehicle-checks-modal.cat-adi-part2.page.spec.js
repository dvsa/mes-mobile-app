import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config, NavController } from 'ionic-angular';
import { VehicleChecksCatADIPart2Modal } from '../vehicle-checks-modal.cat-adi-part2.page';
import { Store, StoreModule } from '@ngrx/store';
import { ConfigMock, NavControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../../app/app.module';
import { MockComponent } from 'ng-mocks';
import { VehicleChecksQuestionComponent, } from '../../../../cat-adi-part2/components/vehicle-checks-question/vehicle-checks-question.cat-adi-part2';
import { TellMeQuestionSelected, TellMeQuestionOutcomeChanged, } from '../../../../../../modules/tests/test-data/cat-adi-part2/vehicle-checks/vehicle-checks.cat-adi-part2.action';
import { WarningBannerComponent } from '../../../../../../components/common/warning-banner/warning-banner';
import { configureTestSuite } from 'ng-bullet';
describe('VehicleChecksCatADIPart2Modal', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleChecksCatADIPart2Modal,
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
        fixture = TestBed.createComponent(VehicleChecksCatADIPart2Modal);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        it('should compile', function () {
            expect(component).toBeDefined();
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
    });
});
//# sourceMappingURL=vehicle-checks-modal.cat-adi-part2.page.spec.js.map