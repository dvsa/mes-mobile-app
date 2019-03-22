import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { CompetencyComponent } from '../competency';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { HammerProvider } from '../../../../../providers/hammer/hammer';
import { MockElementRef } from '../../../../../shared/mocks/element-ref.mock';

describe('CompetencyComponent', () => {
  let fixture: ComponentFixture<CompetencyComponent>;
  let component: CompetencyComponent;
  let hammerProvider: HammerProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyComponent],
      imports: [IonicModule, AppModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CompetencyComponent);
        component = fixture.componentInstance;
        hammerProvider = component.hammerProvider;
        spyOn(hammerProvider, 'addPressAndHoldEvent');
        spyOn(hammerProvider, 'init');
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
});
