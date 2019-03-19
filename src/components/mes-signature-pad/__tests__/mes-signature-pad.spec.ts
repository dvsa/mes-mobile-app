import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MesSignaturePadComponent } from '../mes-signature-pad';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockComponent } from 'ng-mocks';

describe('MesSignaturePadComponent', () => {
  let fixture: ComponentFixture<MesSignaturePadComponent>;
  let component: MesSignaturePadComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MesSignaturePadComponent,
        MockComponent(SignaturePad),
      ],
      imports: [],
      providers: [],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MesSignaturePadComponent);
      component = fixture.componentInstance;
    });
  }));
  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
    describe('signature', () => {
      it('setSignature should update the signature property', () => {
        component.signature = undefined;
        component.setSignature('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyEAAAD');
        expect(component.signature).toEqual('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyEAAAD');
        expect(component.isvalid).toBeTruthy();
      });
      it('clear should clear the signature property', () => {
        spyOn(component.dataClearedEvent, 'emit');
        component.signature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyEAAAD';
        component.clear();
        expect(component.signature).toBeNull();
        expect(component.isvalid).toBeFalsy();
        expect(component.dataClearedEvent.emit).toHaveBeenCalled();
      });
      it('drawComplete should emit the signature property', () => {
        spyOn(component.changedDataEvent, 'emit');
        component.drawComplete();
        expect(component.isvalid).toBeTruthy();
        expect(component.changedDataEvent.emit).toHaveBeenCalled();
      });
    });
  });

  describe('DOM', () => {
    describe('signHereText ', () => {
      it('sign line text should equal the signHereText property', () => {
        component.signHereText = 'sign here for millions';
        fixture.detectChanges();
        const signHereElement: HTMLElement = fixture.debugElement.query(By.css('#sign-here-label')).nativeElement;
        expect(signHereElement.textContent).toEqual('sign here for millions');
      });
      it('sign line text should default when the signHereText property is falsy' , () => {
        component.signHereText = undefined;
        fixture.detectChanges();
        const signHereElement: HTMLElement = fixture.debugElement.query(By.css('#sign-here-label')).nativeElement;
        expect(signHereElement.textContent).toEqual('Sign here');
      });
    });

    describe('retryButtonText ', () => {
      it('retry button text should equal the retryButtonText property', () => {
        component.retryButtonText = 'try again';
        fixture.detectChanges();
        const retryButtonElement: HTMLElement = fixture.debugElement.query(By.css('#retry-button-label')).nativeElement;
        expect(retryButtonElement.textContent).toEqual('try again');
      });
      it('retry button text should default when the retryButtonText property is falsy', () => {
        component.retryButtonText = undefined;
        fixture.detectChanges();
        const retryButtonElement: HTMLElement = fixture.debugElement.query(By.css('#retry-button-label')).nativeElement;
        expect(retryButtonElement.textContent).toEqual('Retry');
      });
    });

    describe('require validation ', () => {
      it('notValidHeaderText, when set, should display when isvalid is false and required is true', () => {
        component.required = true;
        component.isvalid = false;
        component.notValidHeaderText = 'please enter your details';
        fixture.detectChanges();
        const notValidHeaderElement: HTMLElement = fixture.debugElement.query(
            By.css('#not-valid-header-label')).nativeElement;
        expect(notValidHeaderElement.textContent).toEqual('please enter your details');
      });
      it('notValidHeaderText, when not set, should not display when isvalid is false and required is true', () => {
        component.required = true;
        component.isvalid = false;
        component.notValidHeaderText = undefined;
        const notValidHeaderElement: DebugElement = fixture.debugElement.query(
            By.css('#not-valid-header-label'));
        expect(notValidHeaderElement).toBeNull();
      });
      it('notValidHeaderText, when set, should not display when isvalid is false and required is false', () => {
        component.required = false;
        component.isvalid = false;
        component.notValidHeaderText = 'please enter your details';
        const notValidHeaderElement: DebugElement = fixture.debugElement.query(
            By.css('#not-valid-header-label'));
        expect(notValidHeaderElement).toBeNull();
      });
    });

    describe('image source', () => {
      it('retryImage, when set, should change the retry image source attrubute', () => {
        component.retryImage = '/some/path';
        fixture.detectChanges();
        const retryImageElement: HTMLElement = fixture.debugElement.query(
              By.css('#retry-icon')).nativeElement;
        expect(retryImageElement.getAttribute('style')).toEqual('background-image: url("/some/path");');
      });
      it('signHereImage, when set, should change the sign here image source attrubute', () => {
        component.signHereImage = '/some/path';
        fixture.detectChanges();
        const notValidHeaderElement: HTMLElement = fixture.debugElement.query(
              By.css('#sign-here-image')).nativeElement;
        expect(notValidHeaderElement.getAttribute('style')).toEqual('background-image: url("/some/path");');
      });
    });
  });
});
