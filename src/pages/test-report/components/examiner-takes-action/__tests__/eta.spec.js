import { async, TestBed } from '@angular/core/testing';
import { EtaComponent } from '../eta';
import { IonicModule } from 'ionic-angular';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { ToggleETA } from '../../../../../modules/tests/test-data/common/eta/eta.actions';
import { ExaminerActions } from '../../../../../modules/tests/test-data/test-data.constants';
import { MockComponent } from 'ng-mocks';
import { CompetencyButtonComponent } from '../../competency-button/competency-button';
import { configureTestSuite } from 'ng-bullet';
describe('Examiner Takes Action Component', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                EtaComponent,
                MockComponent(CompetencyButtonComponent),
            ],
            imports: [
                IonicModule,
                StoreModule.forRoot({ tests: testsReducer }),
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(EtaComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        it('should dispatch a TOGGLE_ETA_VERBAL action', function () {
            component.eta = ExaminerActions.verbal;
            component.toggleETA();
            expect(store$.dispatch).toHaveBeenCalledWith(new ToggleETA(ExaminerActions.verbal));
        });
        it('should dispatch a TOGGLE_ETA_PHYSICAL action', function () {
            component.eta = ExaminerActions.physical;
            component.toggleETA();
            expect(store$.dispatch).toHaveBeenCalledWith(new ToggleETA(ExaminerActions.physical));
        });
    });
});
//# sourceMappingURL=eta.spec.js.map