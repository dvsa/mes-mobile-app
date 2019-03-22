import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { CompetencyComponent } from '../competency';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { HammerProvider } from '../../../../../providers/hammer/hammer';

describe('CompetencyComponent', () => {
  let fixture: ComponentFixture<CompetencyComponent>;
  let component: CompetencyComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyComponent],
      imports: [IonicModule, AppModule],
      providers: [
        HammerProvider,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CompetencyComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
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
