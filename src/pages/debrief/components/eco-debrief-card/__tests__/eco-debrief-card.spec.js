import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { EcoDebriefCardComponent } from '../eco-debrief-card';
import { configureTestSuite } from 'ng-bullet';
describe('EcoDebriefCardComponent', function () {
    var fixture;
    var component;
    var translate;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [EcoDebriefCardComponent],
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
        fixture = TestBed.createComponent(EcoDebriefCardComponent);
        component = fixture.componentInstance;
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
    }));
    describe('DOM', function () {
        it('when advice given control, only advice given control is showing', function () {
            component.adviceGivenControl = true;
            component.adviceGivenPlanning = false;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#adviceGivenControl'))).toBeDefined();
            expect(fixture.debugElement.query(By.css('#adviceGivenPlanning'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#adviceGivenControlAndadviceGivenPlanning'))).toBeNull();
        });
        it('when advice given planning, only advice given planning is showing', function () {
            component.adviceGivenControl = false;
            component.adviceGivenPlanning = true;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#adviceGivenControl'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#adviceGivenPlanning'))).toBeDefined();
            expect(fixture.debugElement.query(By.css('#adviceGivenControlAndadviceGivenPlanning'))).toBeNull();
        });
        it('when advice given planning and advice given control, both are shown', function () {
            component.adviceGivenControl = true;
            component.adviceGivenPlanning = true;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#adviceGivenControl'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#adviceGivenPlanning'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#adviceGivenControlAndadviceGivenPlanning'))).toBeDefined();
        });
    });
});
//# sourceMappingURL=eco-debrief-card.spec.js.map