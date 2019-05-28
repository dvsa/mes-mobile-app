import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { PracticeEndToEndCardComponent } from '../practice-end-to-end-card';

describe('PracticeEndToEndCard ', () => {
  let component: PracticeEndToEndCardComponent;
  let fixture: ComponentFixture<PracticeEndToEndCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeEndToEndCardComponent],
      imports: [IonicModule.forRoot(PracticeEndToEndCardComponent)],
      providers: [],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(PracticeEndToEndCardComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {

  });
});
