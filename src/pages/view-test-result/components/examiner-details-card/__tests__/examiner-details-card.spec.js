import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ExaminerDetailsCardComponent } from '../examiner-details';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';
import { configureTestSuite } from 'ng-bullet';
describe('ExaminerDetailsCardComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ExaminerDetailsCardComponent,
                MockComponent(DataRowComponent),
            ],
            imports: [
                IonicModule,
            ],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ExaminerDetailsCardComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        // Unit tests for the components TypeScript class
        it('should create', function () {
            expect(component).toBeDefined();
        });
    });
});
//# sourceMappingURL=examiner-details-card.spec.js.map