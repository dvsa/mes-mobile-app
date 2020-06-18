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
    const searchResult = {
      costCode: null,
      testDate: null,
      driverNumber: null,
      candidateName: null,
      applicationReference: null,
      category: null,
      activityCode: null,
    };
    it('should return driver when cat is not A', () => {
      searchResult.category = TestCategory.B;
      expect(component.driverRider(searchResult)).toEqual('Driver');
    });
    it('should return driver when cat is EUA1M1', () => {
      searchResult.category = TestCategory.EUA1M1;
      expect(component.driverRider(searchResult)).toEqual('Rider');
    });
    it('should return driver when cat is EUAM2', () => {
      searchResult.category = TestCategory.EUAM2;
      expect(component.driverRider(searchResult)).toEqual('Rider');
    });
  });

});
