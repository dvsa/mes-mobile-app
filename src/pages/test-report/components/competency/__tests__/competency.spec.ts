import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { CompetencyComponent } from '../competency';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { HammerProvider } from '../../../../../providers/hammer/hammer';
import { MockElementRef } from '../../../../../shared/mocks/element-ref.mock';
import { Renderer2 } from '@angular/core';

fdescribe('CompetencyComponent', () => {
  let fixture: ComponentFixture<CompetencyComponent>;
  let component: CompetencyComponent;
  let hammerProvider: HammerProvider;
  let renderer: Renderer2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyComponent],
      imports: [IonicModule, AppModule],
      providers: [
        HammerProvider,
        Renderer2,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CompetencyComponent);
        component = fixture.componentInstance;
        hammerProvider = component.hammerProvider;
        spyOn(hammerProvider, 'addPressAndHoldEvent');
        spyOn(hammerProvider, 'init');
        renderer = TestBed.get(Renderer2);
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
    describe('ngOnInit', () => {
      it('should use HammerProvider to attach a press and hold event to the button which records the fault', () => {
        component.button = new MockElementRef();

        component.ngOnInit();

        expect(hammerProvider.init).toHaveBeenCalledWith(component.button);
        expect(hammerProvider.addPressAndHoldEvent).toHaveBeenCalledWith(component.recordFault);
      });
    });
  });

  describe('DOM', () => {
    it('should show provided label', () => {
      component.label = 'Gears';
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('#competencyLabel'));
      expect(label.nativeElement.innerHTML).toBe('Gears');
    });
  });

  describe('Ripple effect', () => {

    it('should have added no classes to the competency button', () => {
      expect(component.button.nativeElement.className).toEqual('');
    });

    it('should add and remove the ripple effect animation css class within the required time frame', (done) => {
      // Arrange
      renderer = fixture.componentRef.injector.get(Renderer2);
      renderer.removeClass = jasmine.createSpy('removeClass').and.callThrough();
      renderer.addClass = jasmine.createSpy('addClass').and.callThrough();
      // Act
      component.recordFault();
      component.manageClasses();
      // Assert
      expect(renderer.addClass).toHaveBeenCalledWith(component.button.nativeElement, 'driving-fault');
      expect(renderer.addClass).toHaveBeenCalledWith(component.button.nativeElement, 'ripple-effect');

      setTimeout(() => {
        expect(renderer.removeClass).toHaveBeenCalledWith(component.button.nativeElement, 'ripple-effect');
        done();
      },         component.rippleEffectAnimationDuration);
    });
  });
});
