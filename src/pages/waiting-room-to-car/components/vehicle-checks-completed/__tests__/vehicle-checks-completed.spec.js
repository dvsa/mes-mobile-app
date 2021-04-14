import { By } from '@angular/platform-browser';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
import { AppModule } from '../../../../../app/app.module';
import { VehicleChecksToggleComponent } from '../vehicle-checks-completed';
describe('VehicleChecksToggleComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleChecksToggleComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleChecksToggleComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
    }));
    describe('DOM', function () {
        it('should call VehicleChecksToggleResultChanged with Completed when selected', function () {
            spyOn(component, 'vehicleChecksToggleResultChanged');
            component.testCategory = "B+E" /* BE */;
            component.ngOnChanges();
            var vehicleChecksCompletedRadio = fixture.debugElement.query(By.css('#vehicle-checks-toggle-completed'));
            vehicleChecksCompletedRadio.triggerEventHandler('change', { target: { value: 'Completed' } });
            fixture.detectChanges();
            expect(component.vehicleChecksToggleResultChanged).toHaveBeenCalledWith('Completed');
        });
        it('should call VehicleChecksToggleResultChanged with Not completed when not selected', function () {
            spyOn(component, 'vehicleChecksToggleResultChanged');
            component.testCategory = "B+E" /* BE */;
            component.ngOnChanges();
            var vehicleChecksCompletedRadio = fixture.debugElement.query(By.css('#vehicle-checks-toggle-non-completed'));
            vehicleChecksCompletedRadio.triggerEventHandler('change', { target: { value: 'Not completed' } });
            fixture.detectChanges();
            expect(component.vehicleChecksToggleResultChanged).toHaveBeenCalledWith('Not completed');
        });
    });
});
//# sourceMappingURL=vehicle-checks-completed.spec.js.map