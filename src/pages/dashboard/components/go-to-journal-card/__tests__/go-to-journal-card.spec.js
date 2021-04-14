import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { GoToJournalCardComponent } from '../go-to-journal-card';
import { NavControllerMock } from 'ionic-mocks';
import { JOURNAL_PAGE } from '../../../../page-names.constants';
import { configureTestSuite } from 'ng-bullet';
describe('GoToJournalCard ', function () {
    var component;
    var fixture;
    var navContoller;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [GoToJournalCardComponent],
            imports: [IonicModule.forRoot(GoToJournalCardComponent)],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(GoToJournalCardComponent);
        component = fixture.componentInstance;
        navContoller = TestBed.get(NavController);
    }));
    describe('Class', function () {
        describe('navigateToJournal', function () {
            it('should trigger navigation to Journal', function () {
                component.navigateToJournal();
                expect(navContoller.push).toHaveBeenCalledWith(JOURNAL_PAGE);
            });
        });
    });
    describe('DOM', function () {
    });
});
//# sourceMappingURL=go-to-journal-card.spec.js.map