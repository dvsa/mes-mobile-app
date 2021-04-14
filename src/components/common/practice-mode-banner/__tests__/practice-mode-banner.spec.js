import { TestBed, async } from '@angular/core/testing';
import { PracticeModeBanner } from '../practice-mode-banner';
import { NavController, IonicModule, Config } from 'ionic-angular';
import { NavControllerMock, ConfigMock } from 'ionic-mocks';
import { configureTestSuite } from 'ng-bullet';
describe('PracticeModeBanner', function () {
    var fixture;
    var component;
    var navController;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [PracticeModeBanner],
            imports: [IonicModule],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(PracticeModeBanner);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
    }));
    describe('Class', function () {
        describe('exitPracticeMode', function () {
            it('should take the user back to the root page', function () {
                component.exitPracticeMode();
                expect(navController.popTo).toHaveBeenCalled();
            });
        });
    });
});
//# sourceMappingURL=practice-mode-banner.spec.js.map