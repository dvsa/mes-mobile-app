import { TestBed, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { VehicleDetailsComponent } from '../vehicle-details';
import { configureTestSuite } from 'ng-bullet';
describe('VehicleDetailsComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleDetailsComponent,
            ],
            imports: [IonicModule],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleDetailsComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        it('should create', function () {
            expect(component).toBeDefined();
        });
    });
});
//# sourceMappingURL=vehicle-details.spec.js.map