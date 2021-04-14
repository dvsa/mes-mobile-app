import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';
import { ModalResultItemComponent } from '../modal-result-item';
import { AppModule } from '../../../../../../../../app/app.module';
describe('ModalResultItemComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ModalResultItemComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ModalResultItemComponent);
        component = fixture.componentInstance;
    }));
    describe('getOutcomeIcon', function () {
        it('should return pass image when isPass is true', function () {
            component.isPass = true;
            expect(component.getOutcomeIcon()).toEqual('assets/imgs/greenCorrectAnswer.png');
        });
        it('should return fail image when isPass is false', function () {
            component.isPass = false;
            expect(component.getOutcomeIcon()).toEqual('assets/imgs/redWrongAnswer.png');
        });
    });
    describe('displayScore', function () {
        it('should return a zero if score is null', function () {
            expect(component.displayScore(null)).toEqual(0);
        });
        it('should return a zero if score is undefined', function () {
            expect(component.displayScore(undefined)).toEqual(0);
        });
        it('should return score if score is a number', function () {
            expect(component.displayScore(1)).toEqual(1);
        });
    });
});
//# sourceMappingURL=modal-result-item.spec.js.map