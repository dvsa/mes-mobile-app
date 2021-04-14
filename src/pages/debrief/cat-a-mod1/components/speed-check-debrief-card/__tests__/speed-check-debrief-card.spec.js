import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppModule } from '../../../../../../app/app.module';
import { ComponentsModule } from '../../../../../../components/common/common-components.module';
import { SpeedCheckDebriefCardComponent } from '../speed-check-debrief-card';
import { configureTestSuite } from 'ng-bullet';
describe('SeriousFaultsDebriefCardComponent', function () {
    var translate;
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [SpeedCheckDebriefCardComponent],
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
        fixture = TestBed.createComponent(SpeedCheckDebriefCardComponent);
        component = fixture.componentInstance;
        translate = TestBed.get(TranslateService);
        component.avoidance = {
            firstAttempt: 0,
            secondAttempt: 0,
            outcome: null,
            comments: null,
        };
        component.emergencyStop = {
            firstAttempt: 0,
            secondAttempt: 0,
            outcome: null,
            comments: null,
        };
    }));
    describe('ngOnInit', function () {
        it('should default to english if isTranslatable is false', function () {
            translate.setDefaultLang('cy');
            component.isTranslatable = false;
            fixture.detectChanges();
            expect(translate.currentLang).toEqual('en');
        });
    });
});
//# sourceMappingURL=speed-check-debrief-card.spec.js.map