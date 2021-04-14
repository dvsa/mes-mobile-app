var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { async, TestBed, fakeAsync, tick, } from '@angular/core/testing';
import { IonicModule, ModalController } from 'ionic-angular';
import { ModalControllerMock, StatusBarMock } from 'ionic-mocks';
import { StatusBar } from '@ionic-native/status-bar';
import { By } from '@angular/platform-browser';
import { CandidateLinkComponent } from '../candidate-link';
import { Store } from '@ngrx/store';
import { SecureStorage } from '@ionic-native/secure-storage';
import { DataStoreProvider } from '../../../../providers/data-store/data-store';
import { DataStoreProviderMock } from '../../../../providers/data-store/__mocks__/data-store.mock';
import { SecureStorageMock } from '@ionic-native-mocks/secure-storage';
import { TranslateService } from '@ngx-translate/core';
import { translateServiceMock } from '../../../../shared/__mocks__/translate';
import { end2endPracticeSlotId } from '../../../../shared/mocks/test-slot-ids.mock';
import { CANDIDATE_DETAILS_PAGE, FAKE_CANDIDATE_DETAILS_PAGE } from '../../../../pages/page-names.constants';
import { App } from '../../../../app/app.component';
import { MockAppComponent } from '../../../../app/__mocks__/app.component.mock';
import { bookedTestSlotMock } from '../../../../shared/mocks/test-slot-data.mock';
import { configureTestSuite } from 'ng-bullet';
var MockStore = /** @class */ (function () {
    function MockStore() {
    }
    return MockStore;
}());
describe('CandidateLinkComponent', function () {
    var component;
    var fixture;
    var modalControllerMock = ModalControllerMock.instance();
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [CandidateLinkComponent],
            imports: [IonicModule.forRoot(CandidateLinkComponent)],
            providers: [
                { provide: StatusBar, useFactory: function () { return StatusBarMock.instance(); } },
                { provide: ModalController, useFactory: function () { return modalControllerMock; } },
                { provide: App, useClass: MockAppComponent },
                { provide: Store, useClass: MockStore },
                { provide: SecureStorage, useClass: SecureStorageMock },
                { provide: DataStoreProvider, useClass: DataStoreProviderMock },
                { provide: TranslateService, useValue: translateServiceMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(CandidateLinkComponent);
        component = fixture.componentInstance;
        component.name = { title: '', firstName: '', lastName: '' };
        component.name.title = 'Mr';
        component.name.firstName = 'Joe';
        component.name.lastName = 'Bloggs';
        component.slot = bookedTestSlotMock;
        component.slotChanged = false;
        component.isPortrait = true;
    }));
    describe('Class', function () {
        describe('openCandidateDetailsModal', function () {
            it('should open CandidateDetailsPage when not in practice mode', function () {
                component.openCandidateDetailsModal();
                expect(component.modalController.create).toHaveBeenCalledWith(CANDIDATE_DETAILS_PAGE, { slot: component.slot, slotChanged: false }, { cssClass: 'modal-fullscreen text-zoom-regular' });
            });
            it('should open FakeCandidateDetailsPage when in practice mode', function () {
                component.slot = __assign(__assign({}, bookedTestSlotMock), { slotDetail: __assign(__assign({}, bookedTestSlotMock), { slotId: end2endPracticeSlotId + "_1" }) });
                component.openCandidateDetailsModal();
                expect(component.modalController.create).toHaveBeenCalledWith(FAKE_CANDIDATE_DETAILS_PAGE, { slot: component.slot, slotChanged: false }, { cssClass: 'modal-fullscreen text-zoom-regular' });
            });
        });
    });
    describe('DOM', function () {
        it('should display candidate name', function () {
            var nameSpan = fixture.debugElement.query(By.css('h3')).nativeElement;
            fixture.detectChanges();
            expect(nameSpan.textContent).toBe('Mr Joe Bloggs');
        });
        it('should display a right arrow after the candidate name', function () {
            var iconElement = fixture.debugElement.queryAll(By.css('ion-icon[name="arrow-forward"]'));
            fixture.detectChanges();
            expect(iconElement.length).toBe(1);
        });
        it('should apply additional css styles if device isPortrait', function () {
            component.isPortrait = true;
            fixture.detectChanges();
            var renderedImages = fixture.debugElement.queryAll(By.css('.candidate-name-short'));
            expect(renderedImages.length).toBe(1);
        });
        it('should not apply additional css styles if device isPortrait', function () {
            component.isPortrait = true;
            fixture.detectChanges();
            var renderedImages = fixture.debugElement.queryAll(By.css('.candidate-name-long'));
            expect(renderedImages.length).toBe(0);
        });
        it('should apply additional css styles if device isLandscape', function () {
            component.isPortrait = false;
            fixture.detectChanges();
            var renderedImages = fixture.debugElement.queryAll(By.css('.candidate-name-long'));
            expect(renderedImages.length).toBe(1);
        });
        it('should not apply additional css styles if device isLandscape', function () {
            component.isPortrait = false;
            fixture.detectChanges();
            var renderedImages = fixture.debugElement.queryAll(By.css('.candidate-name-short'));
            expect(renderedImages.length).toBe(0);
        });
        it('should call openCandidateDetailsModal when the main div component is clicked', fakeAsync(function () {
            fixture.detectChanges();
            spyOn(component, 'openCandidateDetailsModal');
            var button = fixture.debugElement.query(By.css('button'));
            button.triggerEventHandler('click', null);
            tick();
            fixture.detectChanges();
            expect(component.openCandidateDetailsModal).toHaveBeenCalled();
        }));
    });
});
//# sourceMappingURL=candidate-link.spec.js.map