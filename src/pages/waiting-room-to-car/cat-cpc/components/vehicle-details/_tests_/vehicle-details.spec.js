import { async, TestBed } from '@angular/core/testing';
import { VehicleDetailsCatCPCComponent } from '../vehicle-details';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
import { AppModule } from '../../../../../../app/app.module';
describe('VehicleDetailsCatCPCComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleDetailsCatCPCComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleDetailsCatCPCComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
    }));
    describe('vehicleDetailsChanged', function () {
        it('should emit the value passed into the function', function () {
            spyOn(component.vehicleDetailsChange, 'emit');
            component.vehicleDetailsChanged('Rigid');
            expect(component.vehicleDetailsChange.emit).toHaveBeenCalledWith('Rigid');
        });
    });
});
//# sourceMappingURL=vehicle-details.spec.js.map