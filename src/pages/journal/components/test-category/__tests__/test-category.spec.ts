import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { TestCategoryComponent } from '../test-category';

describe('TestCategoryComponent', () => {
  let fixture: ComponentFixture<TestCategoryComponent>;
  let component: TestCategoryComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCategoryComponent
      ],
      imports: [IonicModule],

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TestCategoryComponent);
      component = fixture.componentInstance;
    })
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
  });

});
