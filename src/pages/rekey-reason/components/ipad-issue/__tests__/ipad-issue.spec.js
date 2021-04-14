import { async, TestBed } from '@angular/core/testing';
import { IpadIssueComponent } from '../ipad-issue';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
describe('IpadIssueComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                IpadIssueComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
            providers: [],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(IpadIssueComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
        component.ngOnChanges();
    }));
    describe('class', function () {
        describe('ngOnChanges', function () {
            it('should add the form controls', function () {
                expect(component.formGroup.get('ipadIssueSelected')).not.toBeNull();
                expect(component.formGroup.get('ipadIssueTechnicalFault')).not.toBeNull();
                expect(component.formGroup.get('ipadIssueLost')).not.toBeNull();
                expect(component.formGroup.get('ipadIssueStolen')).not.toBeNull();
                expect(component.formGroup.get('ipadIssueBroken')).not.toBeNull();
            });
        });
        describe('selectedValueChanged', function () {
            it('should emit when checkbox is selected', function () {
                spyOn(component.selectedChange, 'emit');
                component.selectedValueChanged(true);
                expect(component.selectedChange.emit).toHaveBeenCalledWith(true);
            });
            it('should reset the fields when unselecting the checkbox', function () {
                var technicalFault = component.formGroup.get('ipadIssueTechnicalFault');
                spyOn(technicalFault, 'reset');
                var lost = component.formGroup.get('ipadIssueLost');
                spyOn(lost, 'reset');
                var stolen = component.formGroup.get('ipadIssueStolen');
                spyOn(stolen, 'reset');
                var broken = component.formGroup.get('ipadIssueBroken');
                spyOn(broken, 'reset');
                component.selectedValueChanged(false);
                expect(technicalFault.reset).toHaveBeenCalled();
                expect(lost.reset).toHaveBeenCalled();
                expect(stolen.reset).toHaveBeenCalled();
                expect(broken.reset).toHaveBeenCalled();
            });
        });
        describe('technicalFaultSelected', function () {
            it('should emit', function () {
                spyOn(component.technicalFaultChange, 'emit');
                component.technicalFaultSelected();
                expect(component.technicalFaultChange.emit).toHaveBeenCalledWith(true);
            });
        });
        describe('lostSelected', function () {
            it('should emit', function () {
                spyOn(component.lostChange, 'emit');
                component.lostSelected();
                expect(component.lostChange.emit).toHaveBeenCalledWith(true);
            });
        });
        describe('stolenSelected', function () {
            it('should emit', function () {
                spyOn(component.stolenChange, 'emit');
                component.stolenSelected();
                expect(component.stolenChange.emit).toHaveBeenCalledWith(true);
            });
        });
        describe('brokenSelected', function () {
            it('should emit', function () {
                spyOn(component.brokenChange, 'emit');
                component.brokenSelected();
                expect(component.brokenChange.emit).toHaveBeenCalledWith(true);
            });
        });
    });
    describe('DOM', function () {
        describe('select checkbox', function () {
            it('should show the radio buttons when selected', function () {
                component.selected = true;
                fixture.detectChanges();
                var radios = fixture.debugElement.query(By.css('#ipadIssueSection'));
                expect(radios).toBeDefined();
            });
            it('should not show the radio buttons when not selected', function () {
                component.selected = false;
                fixture.detectChanges();
                var radios = fixture.debugElement.query(By.css('#ipadIssueSection'));
                expect(radios).toBeNull();
            });
        });
    });
});
//# sourceMappingURL=ipad-issue.spec.js.map