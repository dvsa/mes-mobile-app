
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { TestSummaryCardComponent } from '../test-summary-card';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../data-row/data-row';
import { DataRowCustomComponent } from '../../data-row-custom/data-row-custom';

describe('TestSummaryCardComponent', () => {
  let fixture: ComponentFixture<TestSummaryCardComponent>;
  let component: TestSummaryCardComponent;

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
        fixture = TestBed.createComponent(TestSummaryCardComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    describe('shouldHideCard', () => {
      it('should return true if there is no data', () => {
        component.data = {};
        expect(component.shouldHideCard()).toEqual(true);
      });
      it('should return false if there is data', () => {
        component.data = { routeNumber: 12345 };
        expect(component.shouldHideCard()).toEqual(false);
      });
    });
  });

  describe('shouldDisplayLicenceProvided', () => {
    it('should return a true when data supplied has a value of true', () => {
      const result: boolean = component.shouldDisplayLicenceProvided(true);
      expect(result).toBeTruthy();
    });

    it('should return a true when data supplied has a value of false', () => {
      const result: boolean = component.shouldDisplayLicenceProvided(false);
      expect(result).toBeTruthy();
    });

    it('should return a false when data passed in is not a boolean', () => {
      const result: boolean = component.shouldDisplayLicenceProvided(undefined);
      expect(result).toBeFalsy();
    });
  });

});
