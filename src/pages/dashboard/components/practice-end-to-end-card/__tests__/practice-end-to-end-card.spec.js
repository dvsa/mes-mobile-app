import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { PracticeEndToEndCardComponent } from '../practice-end-to-end-card';
import { NavControllerMock } from 'ionic-mocks';
import { FAKE_JOURNAL_PAGE } from '../../../../page-names.constants';
import { configureTestSuite } from 'ng-bullet';
describe('PracticeEndToEndCard ', function () {
    var component;
    var fixture;
    var navContoller;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [PracticeEndToEndCardComponent],
            imports: [IonicModule.forRoot(PracticeEndToEndCardComponent)],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(PracticeEndToEndCardComponent);
        component = fixture.componentInstance;
        navContoller = TestBed.get(NavController);
    }));
    describe('Class', function () {
        describe('navigateToFakeJournal', function () {
            it('should trigger navigation to Fake Journal', function () {
                component.navigateToFakeJournal();
                expect(navContoller.push).toHaveBeenCalledWith(FAKE_JOURNAL_PAGE);
            });
        });
    });
});
//# sourceMappingURL=practice-end-to-end-card.spec.js.map