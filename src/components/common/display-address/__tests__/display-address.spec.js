import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DisplayAddressComponent } from '../display-address';
import { configureTestSuite } from 'ng-bullet';
describe('DisplayAddressComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                DisplayAddressComponent,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(DisplayAddressComponent);
        component = fixture.componentInstance;
    }));
    describe('DOM', function () {
        it('should hide the address if not available', function () {
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#address'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#addressLine1'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#addressLine2'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#addressLine3'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#addressLine4'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#addressLine5'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#postcode'))).toBeNull();
        });
        it('should display the address if available', function () {
            component.address = {
                addressLine1: 'somewhere',
                addressLine2: 'some street',
                addressLine3: 'some city',
                addressLine4: 'some country',
                addressLine5: 'some planet',
                postcode: 'AB12 3CD',
            },
                fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#address'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('#addressLine1'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('#addressLine2'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('#addressLine3'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('#addressLine4'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('#addressLine5'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('#postcode'))).not.toBeNull();
        });
    });
});
//# sourceMappingURL=display-address.spec.js.map