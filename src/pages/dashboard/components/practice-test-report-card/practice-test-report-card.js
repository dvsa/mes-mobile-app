var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StartTestReportPracticeTest } from '../../../../modules/tests/tests.actions';
import { TellMeQuestionDrivingFault, TellMeQuestionCorrect } from '../../../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import { ModalEvent } from '../practice-test-modal/practice-test-modal.constants';
import { testReportPracticeModeSlot } from '../../../../modules/tests/__mocks__/tests.mock';
import { CAT_B } from '../../../page-names.constants';
var PracticeTestReportCardComponent = /** @class */ (function () {
    function PracticeTestReportCardComponent(store$, alertController, navController, modalController) {
        var _this = this;
        this.store$ = store$;
        this.alertController = alertController;
        this.navController = navController;
        this.modalController = modalController;
        this.slotId = testReportPracticeModeSlot.slotDetail.slotId;
        this.showDrivingFaultModal = function () {
            var options = { cssClass: 'mes-modal-alert text-zoom-regular' };
            _this.modal = _this.modalController.create('PracticeTestModal', {}, options);
            _this.modal.onDidDismiss(_this.onModalDismiss);
            _this.modal.present();
        };
        this.onModalDismiss = function (event) {
            switch (event) {
                case ModalEvent.FAULT:
                    _this.store$.dispatch(new StartTestReportPracticeTest(_this.slotId));
                    _this.store$.dispatch(new TellMeQuestionDrivingFault());
                    _this.navController.push(CAT_B.TEST_REPORT_PAGE);
                    break;
                case ModalEvent.NO_FAULT:
                    _this.store$.dispatch(new StartTestReportPracticeTest(_this.slotId));
                    _this.store$.dispatch(new TellMeQuestionCorrect());
                    _this.navController.push(CAT_B.TEST_REPORT_PAGE);
                    break;
                case ModalEvent.CANCEL:
                    break;
            }
        };
    }
    PracticeTestReportCardComponent = __decorate([
        Component({
            selector: 'practice-test-report-card',
            templateUrl: 'practice-test-report-card.html',
        }),
        __metadata("design:paramtypes", [Store,
            AlertController,
            NavController,
            ModalController])
    ], PracticeTestReportCardComponent);
    return PracticeTestReportCardComponent;
}());
export { PracticeTestReportCardComponent };
//# sourceMappingURL=practice-test-report-card.js.map