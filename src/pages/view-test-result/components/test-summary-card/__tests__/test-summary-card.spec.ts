
import {  async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { TestSummaryCardComponent } from '../test-summary-card';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../data-row/data-row';
import { DataRowCustomComponent } from '../../data-row-custom/data-row-custom';

describe('TestSummaryCardComponent', () => {
  // let fixture: ComponentFixture<TestSummaryCardComponent>;
  // let component: TestSummaryCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestSummaryCardComponent,
        MockComponent(DataRowComponent),
        MockComponent(DataRowCustomComponent),
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
        // fixture = TestBed.createComponent(TestSummaryCardComponent);
        // component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {

  });
});
