import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, AlertController, ModalController } from 'ionic-angular';
import { PracticeTestReportCardComponent } from '../practice-test-report-card';
import { NavControllerMock, AlertControllerMock, ModalControllerMock } from 'ionic-mocks';
import { journalReducer } from '../../../../../modules/journal/journal.reducer';
import { StoreModule } from '@ngrx/store';
import { configureTestSuite } from 'ng-bullet';
describe('PracticeTestReportCard ', function () {
    var component;
    var fixture;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [PracticeTestReportCardComponent],
            imports: [
                IonicModule.forRoot(PracticeTestReportCardComponent),
                StoreModule.forRoot({
                    journal: journalReducer,
                }),
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: AlertController, useFactory: function () { return AlertControllerMock.instance(); } },
                { provide: ModalController, useFactory: function () { return ModalControllerMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(PracticeTestReportCardComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        it('should create', function () {
            expect(component).toBeDefined();
        });
    });
    describe('DOM', function () {
    });
});
//# sourceMappingURL=practice-test-report-card.spec.js.map