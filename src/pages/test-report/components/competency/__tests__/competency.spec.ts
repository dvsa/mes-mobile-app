import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { CompetencyComponent } from '../competency';
import { AppModule } from '../../../../../app/app.module';

describe('CompetencyComponent', () => {
  let fixture: ComponentFixture<CompetencyComponent>;
  let component: CompetencyComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyComponent],
      imports: [IonicModule, AppModule],
      providers: [],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CompetencyComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    // Unit tests for the components template
  });
});
