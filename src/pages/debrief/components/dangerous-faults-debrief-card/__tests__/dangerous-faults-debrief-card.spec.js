import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DangerousFaultsDebriefCardComponent } from '../dangerous-faults-debrief-card';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { Language } from '../../../../../modules/tests/communication-preferences/communication-preferences.model';
import { configureI18N } from '../../../../../shared/helpers/translation.helpers';
import * as welshTranslations from '../../../../../assets/i18n/cy.json';
import { Competencies } from '../../../../../modules/tests/test-data/test-data.constants';
import { configureTestSuite } from 'ng-bullet';
describe('DangerousFaultsDebriefCardComponent', function () {
    var fixture;
    var component;
    var translate;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [DangerousFaultsDebriefCardComponent],
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
        fixture = TestBed.createComponent(DangerousFaultsDebriefCardComponent);
        component = fixture.componentInstance;
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
    }));
    describe('DOM', function () {
        it('correct dangerous faults showing', function () {
            var dangerousFaults = [Competencies.ancillaryControls, Competencies.clearance];
            component.dangerousFaults = dangerousFaults;
            fixture.detectChanges();
            var dangerousLabels = fixture.debugElement.queryAll(By.css('#dangerous-fault .counter-label'));
            var dangerousCounts = fixture.debugElement.query(By.css('h1.fault-heading')).nativeElement;
            expect(dangerousLabels[0].nativeElement.innerHTML).toBe('Control - Ancillary Controls');
            expect(dangerousLabels[1].nativeElement.innerHTML).toBe('Clearance');
            expect(dangerousCounts.innerHTML).toBe(dangerousFaults.length.toString());
        });
        it('correct dangerous faults showing in welsh', function (done) {
            configureI18N(Language.CYMRAEG, translate);
            var dangerousFaults = [Competencies.ancillaryControls];
            component.dangerousFaults = dangerousFaults;
            translate.onLangChange.subscribe(function () {
                fixture.detectChanges();
                var dangerousLabels = fixture.debugElement.queryAll(By.css('#dangerous-fault .counter-label'));
                var dangerousCounts = fixture.debugElement.query(By.css('h1.fault-heading')).nativeElement;
                expect(dangerousLabels[0].nativeElement.innerHTML)
                    .toBe(welshTranslations.debrief.competencies.ancillaryControls);
                expect(dangerousCounts.innerHTML).toBe(dangerousFaults.length.toString());
                done();
            });
        });
        it('no dangerous faults showing', function () {
            var dangerousFaults = [];
            component.dangerousFaults = dangerousFaults;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#dangerous-fault'))).toBeNull();
        });
    });
});
//# sourceMappingURL=dangerous-faults-debrief-card.spec.js.map