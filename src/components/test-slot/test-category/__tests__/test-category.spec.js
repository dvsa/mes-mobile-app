import { TestBed, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { TestCategoryComponent } from '../test-category';
import { configureTestSuite } from 'ng-bullet';
describe('TestCategoryComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                TestCategoryComponent,
            ],
            imports: [IonicModule],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TestCategoryComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        it('should create', function () {
            expect(component).toBeDefined();
        });
    });
});
//# sourceMappingURL=test-category.spec.js.map