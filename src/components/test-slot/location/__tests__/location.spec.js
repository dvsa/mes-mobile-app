import { async, TestBed } from '@angular/core/testing';
import { LocationComponent } from '../location';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';
describe('LocationComponent', function () {
    var component;
    var fixture;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [LocationComponent],
            imports: [IonicModule.forRoot(LocationComponent)],
            providers: [],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(LocationComponent);
        component = fixture.componentInstance;
        component.location = 'Example Test Centre';
    }));
    describe('DOM', function () {
        describe('location icon', function () {
            it('should display test centre name', function () {
                var locationEl = fixture.debugElement.query(By.css('h3')).nativeElement;
                fixture.detectChanges();
                expect(locationEl.textContent).toBe('Example Test Centre');
            });
            it('should display a location icon', function () {
                var iconElement = fixture.debugElement.queryAll(By.css('ion-icon[name="pin"]'));
                fixture.detectChanges();
                expect(iconElement.length).toBe(1);
            });
        });
    });
});
//# sourceMappingURL=location.spec.js.map