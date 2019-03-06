import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { IonicModule, ModalController } from 'ionic-angular';
import { ModalControllerMock } from 'ionic-mocks';
import { By } from '@angular/platform-browser';
import { CandidateLinkComponent } from '../candidate-link';

describe('CandidateLinkComponent', () => {
  let component: CandidateLinkComponent;
  let fixture: ComponentFixture<CandidateLinkComponent>;

  const modalControllerMock = ModalControllerMock.instance();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateLinkComponent],
      imports: [IonicModule.forRoot(CandidateLinkComponent)],
      providers: [
        { provide: ModalController, useFactory: () => modalControllerMock },
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
        component.slotChanged = false;
        component.isPortrait = true;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should call the create function of navController and pass the right slotId', () => {
      component.openCandidateDetailsModal();

      expect(component.modalController.create).toHaveBeenCalledWith(
        'CandidateDetailsPage',
        { slotId: component.slotId, slotChanged: false },
        { cssClass: 'modal-fullscreen' },
      );
    });
  });

  describe('DOM', () => {
    it('should display candidate name', () => {
      const nameSpan: HTMLElement = fixture.debugElement.query(
        By.css('h3'),
      ).nativeElement;
      fixture.detectChanges();
      expect(nameSpan.textContent).toBe('Mr Joe Bloggs');
    });

    it('should display a right arrow after the candidate name', () => {
      const iconElement = fixture.debugElement.queryAll(
        By.css('ion-icon[name="arrow-forward"]'),
      );
      fixture.detectChanges();
      expect(iconElement.length).toBe(1);
    });

    it('should apply additional css styles if device isPortrait', () => {
      component.isPortrait = true;
      fixture.detectChanges();
      const renderedImages = fixture.debugElement.queryAll(
        By.css('.candidate-name-short'),
      );
      expect(renderedImages.length).toBe(1);
    });

    it('should not apply additional css styles if device isPortrait', () => {
      component.isPortrait = true;
      fixture.detectChanges();
      const renderedImages = fixture.debugElement.queryAll(
        By.css('.candidate-name-long'),
      );
      expect(renderedImages.length).toBe(0);
    });

    it('should apply additional css styles if device isLandscape', () => {
      component.isPortrait = false;
      fixture.detectChanges();
      const renderedImages = fixture.debugElement.queryAll(
        By.css('.candidate-name-long'),
      );
      expect(renderedImages.length).toBe(1);
    });

    it('should not apply additional css styles if device isLandscape', () => {
      component.isPortrait = false;
      fixture.detectChanges();
      const renderedImages = fixture.debugElement.queryAll(
        By.css('.candidate-name-short'),
      );
      expect(renderedImages.length).toBe(0);
    });

    it('should call openCandidateDetailsModal when the main div component is clicked', fakeAsync(() => {
      fixture.detectChanges();
      spyOn(component, 'openCandidateDetailsModal');
      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      expect(component.openCandidateDetailsModal).toHaveBeenCalled();
    }));
  });
});
