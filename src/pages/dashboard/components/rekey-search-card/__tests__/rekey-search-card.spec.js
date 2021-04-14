import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { RekeySearchCardComponent } from '../rekey-search-card';
import { NavControllerMock } from 'ionic-mocks';
import { REKEY_SEARCH_PAGE } from '../../../../page-names.constants';
import { configureTestSuite } from 'ng-bullet';
describe('RekeySearchCard ', function () {
    var component;
    var fixture;
    var navContoller;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [RekeySearchCardComponent],
            imports: [IonicModule.forRoot(RekeySearchCardComponent)],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(RekeySearchCardComponent);
        component = fixture.componentInstance;
        navContoller = TestBed.get(NavController);
    }));
    describe('Class', function () {
        describe('navigateToRekey', function () {
            it('should trigger navigation to rekey', function () {
                component.navigateToRekeySearch();
                expect(navContoller.push).toHaveBeenCalledWith(REKEY_SEARCH_PAGE);
            });
        });
    });
    describe('DOM', function () {
    });
});
//# sourceMappingURL=rekey-search-card.spec.js.map