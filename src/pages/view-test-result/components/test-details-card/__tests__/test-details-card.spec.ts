
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { TestDetailsCardComponent } from '../test-details-card';
import { ConfigMock } from 'ionic-mocks';

describe('TestDetailsCardComponent', () => {
  let fixture: ComponentFixture<TestDetailsCardComponent>;
  let component: TestDetailsCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestDetailsCardComponent,
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestDetailsCardComponent);
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

  });

});
