import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidateComponent } from '../candidate';
import { IonicModule } from 'ionic-angular';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('CandidateComponent', () => {
  let component: CandidateComponent;
  let fixture: ComponentFixture<CandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateComponent],
      imports: [IonicModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CandidateComponent);
        component = fixture.componentInstance;
        component.name = { title: '', firstName: '', lastName: ''}
        component.name.title =  'Mr';
        component.name.firstName = 'Joe';
        component.name.lastName = 'Bloggs';
        component.welshLanguage = false;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;
    });

    describe('candidate name', () => {
      it('should be displayed', () => {
        const nameSpan: HTMLElement = componentEl.query(By.css('ion-row:first-child h5'))
          .nativeElement;
        fixture.detectChanges();
        expect(nameSpan.textContent).toBe('Mr Joe Bloggs');
      });
    });

    describe('test welsh languge true', () => {
      it ('should display welsh language image', () => {
        component.welshLanguage = true;
        fixture.detectChanges();
        const renderedImages = fixture.debugElement.queryAll(By.css('.welsh-language-indicator'));
        expect(renderedImages).toHaveLength(1);
      });
    });

    describe('test welsh languge false', () => {
      it ('should not display welsh language image', () => {
        component.welshLanguage = false;
        fixture.detectChanges();
        const renderedImages = fixture.debugElement.queryAll(By.css('.welsh-language-indicator'));
        expect(renderedImages).toHaveLength(0);
      });
    });

  });
});
