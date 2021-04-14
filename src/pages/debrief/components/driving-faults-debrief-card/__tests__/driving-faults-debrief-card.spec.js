import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import * as welshTranslations from '../../../../../assets/i18n/cy.json';
import { DrivingFaultsDebriefCardComponent } from '../driving-faults-debrief-card';
import { configureI18N } from '../../../../../shared/helpers/translation.helpers';
import { Language } from '../../../../../modules/tests/communication-preferences/communication-preferences.model';
import { configureTestSuite } from 'ng-bullet';
describe('DrivingFaultsDebriefCardComponent', function () {
    var fixture;
    var component;
    var translate;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [DrivingFaultsDebriefCardComponent],
            imports: [
                IonicModule,
                AppModule,
                ComponentsModule,
                StoreModule.forRoot({}),
                TranslateModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(DrivingFaultsDebriefCardComponent);
        component = fixture.componentInstance;
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
    }));
    describe('DOM', function () {
        it('correct driving faults showing', function () {
            var drivingFaults = [
                {
                    competencyIdentifier: 'useOfSpeed',
                    competencyDisplayName: 'Use of speed',
                    faultCount: 1,
                    comment: '',
                },
                {
                    competencyIdentifier: 'signalsTimed',
                    competencyDisplayName: 'Signals - Timed',
                    faultCount: 1,
                    comment: '',
                },
            ];
            component.drivingFaults = drivingFaults;
            component.drivingFaultCount = 2;
            fixture.detectChanges();
            var drivingFaultLabels = fixture.debugElement.queryAll(By.css('#driving-fault .counter-label'));
            var drivingFaultCount = fixture.debugElement.query(By.css('h1.fault-heading')).nativeElement;
            expect(drivingFaultLabels[0].nativeElement.innerHTML).toBe('Use of speed');
            expect(drivingFaultLabels[1].nativeElement.innerHTML).toBe('Signals - Timed');
            expect(drivingFaultCount.innerHTML).toBe(drivingFaults.length.toString());
        });
        it('correct driving faults showing in welsh', function (done) {
            configureI18N(Language.CYMRAEG, translate);
            var drivingFaults = [
                {
                    competencyIdentifier: 'useOfSpeed',
                    competencyDisplayName: 'Use of speed',
                    faultCount: 1,
                    comment: '',
                },
                {
                    competencyIdentifier: 'signalsTimed',
                    competencyDisplayName: 'Signals - Timed',
                    faultCount: 1,
                    comment: '',
                },
            ];
            component.drivingFaults = drivingFaults;
            component.drivingFaultCount = 2;
            translate.onLangChange.subscribe(function () {
                fixture.detectChanges();
                var drivingFaultsLabels = fixture.debugElement.queryAll(By.css('#driving-fault .counter-label'));
                var drivingFaultCount = fixture.debugElement.query(By.css('h1.fault-heading')).nativeElement;
                expect(drivingFaultsLabels[0].nativeElement.innerHTML)
                    .toBe(welshTranslations.debrief.competencies.useOfSpeed);
                expect(drivingFaultsLabels[1].nativeElement.innerHTML)
                    .toBe(welshTranslations.debrief.competencies.signalsTimed);
                expect(drivingFaultCount.innerHTML).toBe(drivingFaults.length.toString());
                done();
            });
        });
        it('no driving faults showing', function () {
            var drivingFaults = [];
            component.drivingFaults = drivingFaults;
            component.drivingFaultCount = 0;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#driving-fault'))).toBeNull();
        });
    });
    describe('drivingFaultsCardDescriptionSwitch', function () {
        it('Should return debrief.ridingFaultsCardDescription when cat is EUA1M1', function () {
            var value = component.drivingFaultsCardDescriptionSwitch("EUA1M1" /* EUA1M1 */);
            expect(value).toEqual('debrief.ridingFaultsCardDescription');
        });
        it('Should return debrief.ridingFaultsCardDescription when cat is EUA1M2', function () {
            var value = component.drivingFaultsCardDescriptionSwitch("EUA1M2" /* EUA1M2 */);
            expect(value).toEqual('debrief.ridingFaultsCardDescription');
        });
        it('Should return debrief.drivingFaultsCardDescription when cat is B', function () {
            var value = component.drivingFaultsCardDescriptionSwitch("B" /* B */);
            expect(value).toEqual('debrief.drivingFaultsCardDescription');
        });
        it('Should return debrief.drivingFaultsCardDescription when cat is BE', function () {
            var value = component.drivingFaultsCardDescriptionSwitch("B+E" /* BE */);
            expect(value).toEqual('debrief.drivingFaultsCardDescription');
        });
    });
});
//# sourceMappingURL=driving-faults-debrief-card.spec.js.map