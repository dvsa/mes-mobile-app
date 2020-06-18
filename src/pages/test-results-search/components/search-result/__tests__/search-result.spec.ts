import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../../app/app.module';
import { IonicModule } from 'ionic-angular';
import { SearchResultComponent } from '../search-result';
import { App } from '../../../../../app/app.component';
import { MockAppComponent } from '../../../../../app/__mocks__/app.component.mock';
import { configureTestSuite } from 'ng-bullet';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('SearchResultComponent', () => {
  let fixture: ComponentFixture<SearchResultComponent>;
  let component: SearchResultComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchResultComponent,
      ],
      imports: [
        AppModule,
        IonicModule,
      ],
      providers: [
        { provide: App, useClass: MockAppComponent },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('driverRider', () => {
    it('should return driver when cat is not A', () => {

      const searchResult = {
        costCode: null,
        testDate: null,
        driverNumber: null,
        candidateName: null,
        applicationReference: null,
        category: TestCategory.B,
        activityCode: null,
      };
      expect(component.driverRider(searchResult)).toEqual('Driver');
    });

    it('should return driver when cat is EUA1M1', () => {

      const searchResult = {
        costCode: null,
        testDate: null,
        driverNumber: null,
        candidateName: null,
        applicationReference: null,
        category: TestCategory.EUA1M1,
        activityCode: null,
      };
      expect(component.driverRider(searchResult)).toEqual('Rider');
    });

    it('should return driver when cat is EUAM2', () => {

      const searchResult = {
        costCode: null,
        testDate: null,
        driverNumber: null,
        candidateName: null,
        applicationReference: null,
        category: TestCategory.EUAM2,
        activityCode: null,
      };
      expect(component.driverRider(searchResult)).toEqual('Rider');
    });
  });

});
