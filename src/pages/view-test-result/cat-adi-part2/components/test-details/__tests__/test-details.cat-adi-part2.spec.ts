import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { configureTestSuite } from 'ng-bullet';

import { DataRowComponent } from '../../../../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../../../../components/common/data-row-custom/data-row-custom';
import { CandidateDetails, TestDetailsCardCatADI2Component } from '../test-details.cat-adi-part2';

describe('TestDetailsCardCatADI2Component', () => {
  let fixture: ComponentFixture<TestDetailsCardCatADI2Component>;
  let component: TestDetailsCardCatADI2Component;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestDetailsCardCatADI2Component,
        MockComponent(DataRowComponent),
        MockComponent(DataRowCustomComponent),
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
    fixture = TestBed.createComponent(TestDetailsCardCatADI2Component);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
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
    describe('showAttemptNumber', () => {
      it('should return false when attemptNumber is undefined', () => {
        expect(component.showAttemptNumber()).toEqual(false);
      });
      it('should return true when attemptNumber is not null', () => {
        component.candidateDetails = { attemptNumber: 2 } as CandidateDetails;
        expect(component.showAttemptNumber()).toEqual(true);
      });
    });
    describe('showPrn', () => {
      it('should return false when attemptNumber is undefined', () => {
        expect(component.showPrn()).toEqual(false);
      });
      it('should return true when attemptNumber is not null', () => {
        component.candidateDetails = { prn: 223434 } as CandidateDetails;
        expect(component.showPrn()).toEqual(true);
      });
    });
  });
});
