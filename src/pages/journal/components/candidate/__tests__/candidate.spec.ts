import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidateComponent } from '../candidate';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';

describe('CandidateComponent', () => {
  let component: CandidateComponent;
  let fixture: ComponentFixture<CandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateComponent],
      imports: [IonicModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CandidateComponent);
        component = fixture.componentInstance;
        component.name = { title: '', firstName: '', lastName: '' }
        component.name.title = 'Mr';
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

    it('should display candidate name', () => {
      const nameSpan: HTMLElement = fixture.debugElement.query(By.css('ion-row:first-child h5'))
        .nativeElement;
      fixture.detectChanges();
      expect(nameSpan.textContent).toBe('Mr Joe Bloggs');
    });

    it('should display welsh language image when welshLanguage is true', () => {
      component.welshLanguage = true;
      fixture.detectChanges();
      const renderedImages = fixture.debugElement.queryAll(By.css('.welsh-language-indicator'));
      expect(renderedImages).toHaveLength(1);
    });


    it('should not display welsh language image when welshLanguage is false', () => {
      component.welshLanguage = false;
      fixture.detectChanges();
      const renderedImages = fixture.debugElement.queryAll(By.css('.welsh-language-indicator'));
      expect(renderedImages).toHaveLength(0);
    });

    it('should apply additional css styles if device isPortrait', () => {
      component.isPortrait = true;;
      fixture.detectChanges();
      const renderedImages = fixture.debugElement.queryAll(By.css('.candidate-grid-row'));
      expect(renderedImages).toHaveLength(1);
    });

    it('should not apply additional css styles if device isLandscape', () => {
      component.isPortrait = false;;
      fixture.detectChanges();
      const renderedImages = fixture.debugElement.queryAll(By.css('.candidate-grid-row'));
      expect(renderedImages).toHaveLength(0);
    });

  });
});
