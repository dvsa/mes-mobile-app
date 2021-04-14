import { By } from '@angular/platform-browser';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
import { AppModule } from '../../../../../app/app.module';
import { CandidateDeclarationSignedComponent } from '../candidate-declaration';
describe('CandidateDeclarationSignedComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                CandidateDeclarationSignedComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(CandidateDeclarationSignedComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
    }));
    describe('DOM', function () {
        it('should call CandidateDeclarationChanged with Y when signed is pressed', function () {
            spyOn(component, 'candidateDeclarationChanged');
            component.ngOnChanges();
            var declarationSignedRadio = fixture.debugElement.query(By.css('#declaration-signed'));
            declarationSignedRadio.triggerEventHandler('change', { target: { value: 'Y' } });
            fixture.detectChanges();
            expect(component.candidateDeclarationChanged).toHaveBeenCalledWith('Y');
        });
        it('should call CandidateDeclarationChanged with N when not signed is pressed', function () {
            spyOn(component, 'candidateDeclarationChanged');
            component.ngOnChanges();
            var declarationSignedRadio = fixture.debugElement.query(By.css('#declaration-not-signed'));
            declarationSignedRadio.triggerEventHandler('change', { target: { value: 'N' } });
            fixture.detectChanges();
            expect(component.candidateDeclarationChanged).toHaveBeenCalledWith('N');
        });
    });
});
//# sourceMappingURL=candidate-declaration.spec.js.map