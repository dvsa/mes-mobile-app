
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ExaminerDetailsComponent } from '../examiner-details';
import { ConfigMock } from 'ionic-mocks';

describe('ExaminerDetailsComponent', () => {
  let fixture: ComponentFixture<ExaminerDetailsComponent>;
  let component: ExaminerDetailsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExaminerDetailsComponent,
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
        fixture = TestBed.createComponent(ExaminerDetailsComponent);
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
