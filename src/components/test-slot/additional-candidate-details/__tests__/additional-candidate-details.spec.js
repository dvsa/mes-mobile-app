import { TestBed, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { AdditionalCandidateDetailsComponent } from '../additional-candidate-details';
import { configureTestSuite } from 'ng-bullet';
xdescribe('VehicleDetailsComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                AdditionalCandidateDetailsComponent,
            ],
            imports: [IonicModule],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(AdditionalCandidateDetailsComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        it('should create', function () {
            expect(component).toBeDefined();
        });
    });
});
//# sourceMappingURL=additional-candidate-details.spec.js.map