import { PassCertificateNumberComponent } from "../pass-certificate-number";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { TranslateModule, TranslateService, TranslateLoader, TranslateParser } from "ng2-translate";
import { FormGroup } from "@angular/forms";

fdescribe('passCertificateNumberComponent', () => {
    let fixture: ComponentFixture<PassCertificateNumberComponent>;
    let component: PassCertificateNumberComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PassCertificateNumberComponent,
            ],
            imports: [
                IonicModule,
                TranslateModule,
            ],
            providers: [
                TranslateService,
                TranslateLoader,
                TranslateParser,
            ],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(PassCertificateNumberComponent);
                component = fixture.componentInstance;
                component.form = new FormGroup({});
            });
    }));

    describe('Class', () => {
        describe('passCertificateNumberChanged', () => {
            it('should emit pass certificate number if 8 characters', () => {
                spyOn(component.passCertificateNumberChange, 'emit');
                const passCertificateNumber = '12345678';
                component.passCertificateNumberChanged(passCertificateNumber);
                expect(component.passCertificateNumberChange.emit).toHaveBeenCalledWith(passCertificateNumber)
            });
        });
    });
    
    // describe('formControls', () => {
    //     it('should contain a maxlength validation error when passCertificateNumberCtrl fails to meet maxlength', () => {
    //         component.passCertificateNumberInput = '123456789';
    //         component.ngOnChanges();
    //         fixture.detectChanges();
    //         console.log("test 100", component.passCertificateNumberInput);
    //         const result: boolean = component.isInvalid();
    //         expect(result).toEqual(true);
    //     });
    //     it('should contain no validation errors when passCertificateNumberCtrl ends with digit', () => {
    //         const formCtrl = component.form.controls['passCertificateNumberCtrl'];
    //         const form = component.form;
    //         form.get('passCertificateNumberCtrl').setValue('A1234567');
    //         expect(formCtrl.hasError('maxlength')).toBe(false);
    //     });
    //     it('should contain no validation errors when passCertificateNumberCtrl ends with underscore', () => {
    //         const formCtrl = component.form.controls['passCertificateNumberCtrl'];
    //         formCtrl.setValue('A123456_');
    //         expect(formCtrl.hasError('pattern')).toBe(false);
    //         expect(formCtrl.hasError('maxlength')).toBe(false);
    //     });
    //     it('should contain no validation errors when passCertificateNumberCtrl ends with letter', () => {
    //         const formCtrl = component.form.controls['passCertificateNumberCtrl'];
    //         formCtrl.setValue('A123456B');
    //         expect(formCtrl.hasError('pattern')).toBe(false);
    //         expect(formCtrl.hasError('maxlength')).toBe(false);
    //     });
    //     it('should contain be required', () => {
    //         component.passCertificateNumberInput = '123456789';
    //         component.ngOnChanges();
    //         const field = component.form.get(PassCertificateNumberComponent.fieldName);
    //         expect(field).not.toBeNull();
    //         expect(field.validator).not.toBeNull();
    //         expect(field.value).toEqual('123456789');
    //         fixture.detectChanges();
    //         console.log(component.formControl.errors);
    //     });
    // });
});