
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { TestSummaryCardComponent } from '../test-summary-card';

describe('TestSummaryCardComponent', () => {
  let fixture: ComponentFixture<TestSummaryCardComponent>;
  let component: TestSummaryCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestSummaryCardComponent,
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

  describe('isBoolean', () => {
    it('should return a true when data supplied has a value of true', () => {
      const result: boolean = component.isBoolean(true);
      expect(result).toBeTruthy();
    });

    it('should return a true when data supplied has a value of false', () => {
      const result: boolean = component.isBoolean(false);
      expect(result).toBeTruthy();
    });

    it('should return a false when data passed in is not a boolean', () => {
      const result: boolean = component.isBoolean(undefined);
      expect(result).toBeFalsy();
    });
  });

});
