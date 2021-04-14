import { async, TestBed } from '@angular/core/testing';
import { RouteNumberComponent } from '../route-number';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { OutcomeBehaviourMapProvider } from '../../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../../../../pages/office/office-behaviour-map';
import { configureTestSuite } from 'ng-bullet';
describe('RouteNumberComponent', function () {
    var fixture;
    var component;
    var behaviourMapProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                RouteNumberComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
            providers: [
                { provide: OutcomeBehaviourMapProvider, useClass: OutcomeBehaviourMapProvider },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(RouteNumberComponent);
        behaviourMapProvider = TestBed.get(OutcomeBehaviourMapProvider);
        behaviourMapProvider.setBehaviourMap(behaviourMap);
        component = fixture.componentInstance;
    }));
    describe('class', function () {
        it('should emit route number if 1 character', function () {
            spyOn(component.routeNumberChange, 'emit');
            var routeNumber = '7';
            component.routeNumberChanged(routeNumber);
            expect(component.routeNumberChange.emit).toHaveBeenCalledWith(Number.parseInt(routeNumber, 10));
        });
        it('should emit route number if 2 characters', function () {
            spyOn(component.routeNumberChange, 'emit');
            var routeNumber = '44';
            component.routeNumberChanged(routeNumber);
            expect(component.routeNumberChange.emit).toHaveBeenCalledWith(Number.parseInt(routeNumber, 10));
        });
        it('should emit no route number if not numeric', function () {
            spyOn(component.routeNumberChange, 'emit');
            var routeNumber = 'ABC123';
            component.routeNumberChanged(routeNumber);
            expect(component.routeNumberChange.emit).toHaveBeenCalledWith(null);
        });
    });
});
//# sourceMappingURL=route-number.spec.js.map