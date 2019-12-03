
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { RekeyDetailsCardComponent } from '../rekey-details';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../components/data-row/data-row';

describe('ExaminerDetailsCardComponent', () => {
  let fixture: ComponentFixture<RekeyDetailsCardComponent>;
  let component: RekeyDetailsCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RekeyDetailsCardComponent,
        MockComponent(DataRowComponent),
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
        fixture = TestBed.createComponent(RekeyDetailsCardComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });
});
