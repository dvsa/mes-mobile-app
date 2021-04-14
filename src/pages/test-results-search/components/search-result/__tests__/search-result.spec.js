import { async, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../../app/app.module';
import { IonicModule } from 'ionic-angular';
import { SearchResultComponent } from '../search-result';
import { App } from '../../../../../app/app.component';
import { MockAppComponent } from '../../../../../app/__mocks__/app.component.mock';
import { configureTestSuite } from 'ng-bullet';
describe('SearchResultComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
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
    beforeEach(async(function () {
        fixture = TestBed.createComponent(SearchResultComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        it('should create', function () {
            expect(component).toBeDefined();
        });
    });
});
//# sourceMappingURL=search-result.spec.js.map