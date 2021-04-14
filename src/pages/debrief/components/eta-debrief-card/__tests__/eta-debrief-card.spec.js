import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { EtaDebriefCardComponent } from '../eta-debrief-card';
import { configureTestSuite } from 'ng-bullet';
describe('EtaDebriefCardComponent', function () {
    var fixture;
    var component;
    var translate;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [EtaDebriefCardComponent],
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
        fixture = TestBed.createComponent(EtaDebriefCardComponent);
        component = fixture.componentInstance;
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
    }));
    describe('DOM', function () {
        it('when physical eta, only physical eta is showing', function () {
            component.hasPhysicalEta = true;
            component.hasVerbalEta = false;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.hasPhysicalEta'))).toBeDefined();
            expect(fixture.debugElement.query(By.css('.hasVerbalEta'))).toBeNull();
            expect(fixture.debugElement.query(By.css('.hasVerbalAndPhysicalEta'))).toBeNull();
        });
        it('when verbal eta, only verbal eta is showing', function () {
            component.hasPhysicalEta = false;
            component.hasVerbalEta = true;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.hasPhysicalEta'))).toBeNull();
            expect(fixture.debugElement.query(By.css('.hasVerbalEta'))).toBeDefined();
            expect(fixture.debugElement.query(By.css('.hasVerbalAndPhysicalEta'))).toBeNull();
        });
        it('when verbal and physical eta, both are showing', function () {
            component.hasPhysicalEta = true;
            component.hasVerbalEta = true;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.hasPhysicalEta'))).toBeNull();
            expect(fixture.debugElement.query(By.css('.hasVerbalEta'))).toBeNull();
            expect(fixture.debugElement.query(By.css('.hasVerbalAndPhysicalEta'))).toBeDefined();
        });
    });
});
//# sourceMappingURL=eta-debrief-card.spec.js.map