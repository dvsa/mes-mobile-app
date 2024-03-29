import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Config, IonicModule } from 'ionic-angular';
import { TestDetailsCardComponent } from '../test-details-card';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { DataRowCustomComponent } from '../../../../../components/common/data-row-custom/data-row-custom';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';
import { configureTestSuite } from 'ng-bullet';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { TestDetailsModel } from '../test-details-card.model';
import {
  InappropriateUseBannerComponent,
} from '../../../../candidate-details/components/inappropriate-use-banner/inappropriate-use-banner';

describe('TestDetailsCardComponent', () => {
  let fixture: ComponentFixture<TestDetailsCardComponent>;
  let component: TestDetailsCardComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestDetailsCardComponent,
        MockComponent(DataRowComponent),
        MockComponent(DataRowCustomComponent),
        MockComponent(InappropriateUseBannerComponent),
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
    fixture = TestBed.createComponent(TestDetailsCardComponent);
    component = fixture.componentInstance;
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

    describe('showFullCatHeld', () => {
      it('should return true if it is a +E category', () => {
        component.data = {
          category: TestCategory.CE,
        } as TestDetailsModel;
        expect(component.showFullCatHeld()).toBeTruthy();
      });

      it('should return false if it is not a +E category', () => {
        component.data = {
          category: TestCategory.C,
        } as TestDetailsModel;
        expect(component.showFullCatHeld()).toBeFalsy();
      });
    });

  });
});
