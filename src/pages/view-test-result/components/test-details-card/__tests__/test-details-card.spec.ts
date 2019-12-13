
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { TestDetailsCardComponent } from '../test-details-card';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { DataRowCustomComponent } from '../../../../../components/common/data-row-custom/data-row-custom';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';

describe('TestDetailsCardComponent', () => {
  let fixture: ComponentFixture<TestDetailsCardComponent>;
  let component: TestDetailsCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestDetailsCardComponent,
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
        fixture = TestBed.createComponent(TestDetailsCardComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('specialNeedsIsPopulated', () => {
      it('should return false for an empty array', () => {
        const specialNeedsArray = [];
        expect(component.specialNeedsIsPopulated(specialNeedsArray)).toBeFalsy();
      });

      it('should return false for an array that has None in it', () => {
        const specialNeedsArray = ['None'];
        expect(component.specialNeedsIsPopulated(specialNeedsArray)).toBeFalsy();
      });

      it('should return true for a populated array', () => {
        const specialNeedsArray = ['special need 1', 'special need 2'];
        expect(component.specialNeedsIsPopulated(specialNeedsArray)).toBeTruthy();
      });
    });

  });
});
