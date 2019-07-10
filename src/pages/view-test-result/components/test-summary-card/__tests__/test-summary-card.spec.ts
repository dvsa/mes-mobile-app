
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
        expect(component.shouldHideCard()).toBeTruthy();
      });
      it('should return false if there is data', () => {
        component.data = { routeNumber: 12345 };
        expect(component.shouldHideCard()).toBeFalsy();
      });
    });
    describe('flattenArray', () => {
      it('should return the correct result when provided with an array with a length of 1', () => {
        const array = ['Item 1'];
        expect(component.flattenArray(array)).toBe('Item 1');
      });
      it('should return the correct result when provided with an array with a length of 2', () => {
        const array = ['Item 1', 'Item 2'];
        expect(component.flattenArray(array)).toBe('Item 1 and Item 2');
      });
      it('should return the correct result when provided with an array with a length of 3', () => {
        const array = ['Item 1', 'Item 2', 'Item 3'];
        expect(component.flattenArray(array)).toBe('Item 1, Item 2 and Item 3');
      });
    });
    describe('convertBooleanToString', () => {
      it('should return the correct result for true', () => {
        expect(component.convertBooleanToString(true)).toBe('Yes');
      });
      it('should return the correct result for false', () => {
        expect(component.convertBooleanToString(false)).toBe('No');
      });
    });

  });

  describe('DOM', () => {

  });

});
