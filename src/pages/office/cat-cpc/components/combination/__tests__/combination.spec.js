import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
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
    }));
    describe('Class', function () {
        describe('getCombinationText', function () {
            it('should return the combination code passed in', function () {
                expect(component.getCombinationText('LGV1')).toEqual('LGV1');
            });
            it('should return N/A when null is passed in', function () {
                expect(component.getCombinationText(null)).toEqual('N/A');
            });
        });
    });
});
//# sourceMappingURL=combination.spec.js.map