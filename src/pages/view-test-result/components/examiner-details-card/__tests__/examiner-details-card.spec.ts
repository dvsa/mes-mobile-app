
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ExaminerDetailsCardComponent } from '../examiner-details';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';
import { configureTestSuite } from 'ng-bullet';

describe('ExaminerDetailsCardComponent', () => {
  let fixture: ComponentFixture<ExaminerDetailsCardComponent>;
  let component: ExaminerDetailsCardComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExaminerDetailsCardComponent,
        MockComponent(DataRowComponent),
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExaminerDetailsCardComponent);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });

  });

});
