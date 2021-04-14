import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { TestBed, async } from '@angular/core/testing';
import { SignatureAreaComponent } from '../signature-area';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';
var TestStore = /** @class */ (function () {
    function TestStore() {
    }
    return TestStore;
}());
describe('SignatureAreaComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                SignatureAreaComponent,
                MockComponent(SignaturePad),
            ],
            imports: [
                IonicModule,
            ],
            providers: [
                { provide: Store, useClass: TestStore },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(SignatureAreaComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('signature', function () {
            it('setSignature should update the signature property and call signatureDataChangedDispatch', function () {
                spyOn(component, 'signatureDataChangedDispatch');
                component.signature = undefined;
                component.setSignature('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyEAAAD');
                expect(component.signature).toEqual('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyEAAAD');
                expect(component.signatureDataChangedDispatch).toHaveBeenCalled();
            });
            it('clear should clear the signature property and call signatureDataClearedDispatch', function () {
                spyOn(component, 'signatureDataClearedDispatch');
                component.signature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyEAAAD';
                component.clear();
                expect(component.signature).toBeNull();
                expect(component.signatureDataClearedDispatch).toHaveBeenCalled();
            });
            it('drawComplete should call signatureDataChangedDispatch', function () {
                spyOn(component, 'signatureDataChangedDispatch');
                component.drawComplete();
                expect(component.signatureDataChangedDispatch).toHaveBeenCalled();
            });
        });
    });
    describe('DOM', function () {
        describe('signHereText ', function () {
            it('sign line text should equal the signHereText property', function () {
                component.signHereText = 'sign here for millions';
                fixture.detectChanges();
                var signHereElement = fixture.debugElement.query(By.css('.sign-here-label')).nativeElement;
                expect(signHereElement.textContent).toEqual('sign here for millions');
            });
            it('sign line text should default when the signHereText property is falsy', function () {
                component.signHereText = undefined;
                fixture.detectChanges();
                var signHereElement = fixture.debugElement.query(By.css('.sign-here-label')).nativeElement;
                expect(signHereElement.textContent).toEqual('Sign here');
            });
        });
        describe('retryButtonText ', function () {
            it('retry button text should equal the retryButtonText property', function () {
                component.retryButtonText = 'try again';
                fixture.detectChanges();
                var retryButtonElement = fixture.debugElement.query(By.css('#retry-button-label')).nativeElement;
                expect(retryButtonElement.textContent).toEqual('try again');
            });
            it('retry button text should default when the retryButtonText property is falsy', function () {
                component.retryButtonText = undefined;
                fixture.detectChanges();
                var retryButtonElement = fixture.debugElement.query(By.css('#retry-button-label')).nativeElement;
                expect(retryButtonElement.textContent).toEqual('Retry');
            });
        });
        describe('image source', function () {
            it('retryImage, when set, should change the retry image source attribute', function () {
                component.retryImage = '/some/path';
                fixture.detectChanges();
                var retryImageElement = fixture.debugElement.query(By.css('#retry-icon')).nativeElement;
                expect(retryImageElement.getAttribute('style')).toEqual('background-image: url("/some/path");');
            });
            it('retryImage, when not set, should defualt the retry image source attrubute', function () {
                fixture.detectChanges();
                var retryImageElement = fixture.debugElement.query(By.css('#retry-icon')).nativeElement;
                expect(retryImageElement.getAttribute('style'))
                    .toEqual('background-image: url("/assets/imgs/waiting-room/retry.png");');
            });
        });
    });
});
//# sourceMappingURL=signature-area.spec.js.map