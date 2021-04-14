import { TickIndicatorComponent } from '../tick-indicator';
import { Config, IonicModule } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';
describe('TickIndicatorComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                TickIndicatorComponent,
            ],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
            ],
            imports: [
                IonicModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TickIndicatorComponent);
        component = fixture.componentInstance;
    }));
    describe('DOM', function () {
        it('should not be ticked when tick is false', function () {
            component.ticked = false;
            fixture.detectChanges();
            var tickDe = fixture.debugElement.query(By.css('.tick-background.ticked'));
            expect(tickDe).toBeNull();
        });
        it('should be ticked when tick is true', function () {
            component.ticked = true;
            fixture.detectChanges();
            var tickDe = fixture.debugElement.query(By.css('.tick-background.ticked'));
            expect(tickDe).toBeDefined();
        });
    });
});
//# sourceMappingURL=tick-indicator.spec.js.map