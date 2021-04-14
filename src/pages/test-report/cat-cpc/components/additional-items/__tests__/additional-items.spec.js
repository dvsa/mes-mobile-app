import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';
import { AppModule } from '../../../../../../app/app.module';
import { AdditionalItemsComponent } from '../additional-items';
import { mockEmptyAdditionalItems, mockPopulatedAdditionalItems } from '../__mocks__/additional-items.mock';
describe('AdditionalItemsComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                AdditionalItemsComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(AdditionalItemsComponent);
        component = fixture.componentInstance;
    }));
    describe('showAdditionalItems', function () {
        it('should return a true when the additionalItems length is greater than 0', function () {
            expect(component.showAdditionalItems(mockPopulatedAdditionalItems)).toEqual(true);
        });
        it('should return a false when the additionalItems length is not greater than 0', function () {
            expect(component.showAdditionalItems(mockEmptyAdditionalItems)).toEqual(false);
        });
    });
});
//# sourceMappingURL=additional-items.spec.js.map