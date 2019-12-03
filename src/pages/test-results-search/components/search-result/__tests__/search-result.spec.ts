import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../../app/app.module';
import { IonicModule } from 'ionic-angular';
import { SearchResultComponent } from '../search-result';
import { App } from '../../../../../app/app.component';
import { MockAppComponent } from '../../../../../app/__mocks__/app.component.mock';
import { configureTestSuite } from 'ng-bullet';

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

});
