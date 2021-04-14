import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
import { AppModule } from '../../../../../../app/app.module';
import { CombinationComponent } from '../combination';
describe('CombinationComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                CombinationComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(CombinationComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
    }));
    describe('combinationChanged', function () {
        it('should emit the value passed into the function', function () {
            spyOn(component.combinationChange, 'emit');
            component.combinationChanged('LGV1');
            expect(component.combinationChange.emit).toHaveBeenCalledWith('LGV1');
        });
    });
});
//# sourceMappingURL=combination.spec.js.map