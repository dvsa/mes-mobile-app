import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { TestCategoryComponent } from '../test-category';
import { configureTestSuite } from 'ng-bullet'

describe('TestCategoryComponent', () => {
  let fixture: ComponentFixture<TestCategoryComponent>;
  let component: TestCategoryComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCategoryComponent,
      ],
      imports: [IonicModule],

    })
  })

  beforeEach(async(() => {
      fixture = TestBed.createComponent(TestCategoryComponent);
      component = fixture.componentInstance;
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
  });

});
