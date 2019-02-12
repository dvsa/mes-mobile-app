import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { NavControllerMock } from 'ionic-mocks';
import { By } from '@angular/platform-browser';
import { CandidateLinkComponent } from '../candidate-link';

describe('CandidateLinkComponent', () => {
  let component: CandidateLinkComponent;
  let fixture: ComponentFixture<CandidateLinkComponent>;

  const navControllerMock = NavControllerMock.instance();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateLinkComponent],
      imports: [IonicModule.forRoot(CandidateLinkComponent)],
      providers: [
        { provide: NavController, useFactory: () => navControllerMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CandidateLinkComponent);
        component = fixture.componentInstance;
        component.name = { title: '', firstName: '', lastName: '' };
        component.name.title = 'Mr';
        component.name.firstName = 'Joe';
        component.name.lastName = 'Bloggs';
        component.slotId = 12345;
        component.isPortrait = true;
      });
  }));

  describe('Class', () => {
    xit('should create', () => {
      expect(component).toBeDefined();
    });

    xit('should call the push function of navController and pass the right slotId', () => {
      component.navigateToCandidateDetails();

      expect(component.navController.push).toHaveBeenCalledWith(
        'CandidateDetailsPage',
        { slotId: component.slotId },
      );
    });
  });

  describe('DOM', () => {
    xit('should display candidate name', () => {
      const nameSpan: HTMLElement = fixture.debugElement.query(
        By.css('h3')
      ).nativeElement;
      fixture.detectChanges();
      expect(nameSpan.textContent).toBe('Mr Joe Bloggs');
    });

    it('should display a right arrow after the candidate name', () => {
      const iconElement = fixture.debugElement.queryAll(
        By.css('ion-icon[name="arrow-forward"]')
      );
      fixture.detectChanges();
      expect(iconElement.length).toBe(1);
    });

    it('should apply additional css styles if device isPortrait', () => {
      component.isPortrait = true;
      fixture.detectChanges();
      const renderedImages = fixture.debugElement.queryAll(
        By.css('.candidate-name-short')
      );
      expect(renderedImages.length).toBe(1);
    });

    it('should not apply additional css styles if device isPortrait', () => {
      component.isPortrait = true;
      fixture.detectChanges();
      const renderedImages = fixture.debugElement.queryAll(
        By.css('.candidate-name-long')
      );
      expect(renderedImages.length).toBe(0);
    });

    it('should apply additional css styles if device isLandscape', () => {
      component.isPortrait = false;
      fixture.detectChanges();
      const renderedImages = fixture.debugElement.queryAll(
        By.css('.candidate-name-long')
      );
      expect(renderedImages.length).toBe(1);
    });

    xit('should not apply additional css styles if device isLandscape', () => {
      component.isPortrait = false;
      fixture.detectChanges();
      const renderedImages = fixture.debugElement.queryAll(
        By.css('.candidate-name-short')
      );
      expect(renderedImages.length).toBe(0);
    });

    xit('should call navigateToCandidateDetails when the main div component is clicked', fakeAsync(() => {
      fixture.detectChanges();
      spyOn(component, 'navigateToCandidateDetails');
      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      expect(component.navigateToCandidateDetails).toHaveBeenCalled();
    }));
  });
});
