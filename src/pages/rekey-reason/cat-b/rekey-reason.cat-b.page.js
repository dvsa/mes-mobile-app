var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { IonicPage, NavController, Platform, ModalController, LoadingController, } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { Store, select } from '@ngrx/store';
import { RekeyReasonViewDidEnter, ValidateTransferRekey, ResetStaffNumberValidationError, } from '../rekey-reason.actions';
import { UploadRekeyModalEvent } from '../components/upload-rekey-modal/upload-rekey-modal.constants';
import { Subscription, merge } from 'rxjs';
import { IpadIssueSelected, IpadIssueTechFaultSelected, IpadIssueLostSelected, IpadIssueStolenSelected, IpadIssueBrokenSelected, OtherSelected, OtherReasonUpdated, TransferSelected, } from '../../../modules/tests/rekey-reason/rekey-reason.actions';
import { CAT_B, REKEY_SEARCH_PAGE, JOURNAL_PAGE } from '../../page-names.constants';
import { getRekeyReasonState } from '../rekey-reason.reducer';
import { map } from 'rxjs/operators';
import { SendCurrentTest } from '../../../modules/tests/tests.actions';
import { getUploadStatus } from '../rekey-reason.selector';
import { FormGroup } from '@angular/forms';
import { getReasonForRekey, getRekeyIpadIssue, getRekeyTransfer, getRekeyOther, } from '../../../modules/tests/rekey-reason/rekey-reason.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../modules/tests/tests.selector';
import { EndRekey } from '../../../modules/tests/rekey/rekey.actions';
import { ExitRekeyModalEvent } from '../components/exit-rekey-modal/exit-rekey-modal.constants';
import { SetExaminerConducted } from '../../../modules/tests/examiner-conducted/examiner-conducted.actions';
import { SetRekeyDate } from '../../../modules/tests/rekey-date/rekey-date.actions';
import { getExaminerKeyed } from '../../../modules/tests/examiner-keyed/examiner-keyed.reducer';
import { getExaminerConducted } from '../../../modules/tests/examiner-conducted/examiner-conducted.reducer';
var RekeyReasonCatBPage = /** @class */ (function (_super) {
    __extends(RekeyReasonCatBPage, _super);
    function RekeyReasonCatBPage(navController, platform, authenticationProvider, store$, modalController, loadingController) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.navController = navController;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.store$ = store$;
        _this.modalController = modalController;
        _this.loadingController = loadingController;
        _this.subscription = Subscription.EMPTY;
        _this.isUploading = false;
        _this.hasUploaded = false;
        _this.hasTriedUploading = false;
        _this.isStaffNumberInvalid = false;
        _this.isTransferSelected = false;
        _this.reasonCharsRemaining = null;
        _this.examinerConducted = null;
        _this.examinerKeyed = null;
        _this.onUploadPressed = function () {
            if (_this.isFormValid()) {
                _this.onShowUploadRekeyModal();
            }
        };
        _this.onShowUploadRekeyModal = function (retryMode) {
            if (retryMode === void 0) { retryMode = false; }
            var options = { cssClass: 'mes-modal-alert text-zoom-regular' };
            _this.modal = _this.modalController.create('UploadRekeyModal', { retryMode: retryMode }, options);
            _this.modal.onDidDismiss(_this.onUploadRekeyModalDismiss);
            _this.modal.present();
        };
        _this.onUploadRekeyModalDismiss = function (event) {
            switch (event) {
                case UploadRekeyModalEvent.UPLOAD:
                    _this.store$.dispatch(new SetRekeyDate());
                    if (_this.isTransferSelected) {
                        _this.store$.dispatch(new ValidateTransferRekey());
                    }
                    else {
                        _this.store$.dispatch(new SendCurrentTest());
                    }
                    break;
            }
        };
        _this.handleUploadOutcome = function (uploadStatus) {
            _this.handleLoadingUI(uploadStatus.isUploading);
            _this.isStaffNumberInvalid = uploadStatus.hasStaffNumberFailedValidation;
            if (uploadStatus.hasUploadSucceeded || uploadStatus.isDuplicate) {
                _this.navController.push(CAT_B.REKEY_UPLOAD_OUTCOME_PAGE);
                return;
            }
            if (uploadStatus.hasUploadFailed) {
                _this.onShowUploadRekeyModal(true);
            }
        };
        _this.handleLoadingUI = function (isLoading) {
            if (isLoading) {
                if (!_this.loadingSpinner) {
                    _this.loadingSpinner = _this.loadingController.create({
                        spinner: 'circles',
                        content: 'Uploading...',
                    });
                    _this.loadingSpinner.present();
                }
                return;
            }
            if (_this.loadingSpinner) {
                _this.loadingSpinner.dismiss();
                _this.loadingSpinner = null;
            }
        };
        _this.exitRekey = function () {
            var rekeySearchPage = _this.navController.getViews().find(function (view) { return view.id === REKEY_SEARCH_PAGE; });
            var journalPage = _this.navController.getViews().find(function (view) { return view.id === JOURNAL_PAGE; });
            if (rekeySearchPage) {
                _this.navController.popTo(rekeySearchPage);
            }
            else {
                _this.navController.popTo(journalPage);
            }
            _this.store$.dispatch(new EndRekey());
        };
        _this.onExitRekeyModalDismiss = function (event) {
            switch (event) {
                case ExitRekeyModalEvent.EXIT_REKEY:
                    _this.exitRekey();
                    break;
            }
        };
        _this.formGroup = new FormGroup({});
        return _this;
    }
    RekeyReasonCatBPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            uploadStatus$: this.store$.pipe(select(getRekeyReasonState), select(getUploadStatus)),
            ipadIssue$: currentTest$.pipe(select(getReasonForRekey), select(getRekeyIpadIssue)),
            transfer$: currentTest$.pipe(select(getReasonForRekey), select(getRekeyTransfer)),
            other$: currentTest$.pipe(select(getReasonForRekey), select(getRekeyOther)),
            examinerConducted$: currentTest$.pipe(select(getExaminerConducted)),
            examinerKeyed$: currentTest$.pipe(select(getExaminerKeyed)),
        };
        var _a = this.pageState, uploadStatus$ = _a.uploadStatus$, examinerConducted$ = _a.examinerConducted$, examinerKeyed$ = _a.examinerKeyed$, transfer$ = _a.transfer$;
        this.subscription = merge(uploadStatus$.pipe(map(this.handleUploadOutcome)), examinerConducted$.pipe(map(function (val) { return _this.examinerConducted = val; })), examinerKeyed$.pipe(map(function (val) { return _this.examinerKeyed = val; })), transfer$.pipe(map(function (transfer) { return _this.isTransferSelected = transfer.selected; }))).subscribe();
    };
    RekeyReasonCatBPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new RekeyReasonViewDidEnter());
    };
    RekeyReasonCatBPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    RekeyReasonCatBPage.prototype.isFormValid = function () {
        var _this = this;
        if (this.formGroup.valid) {
            return true;
        }
        Object.keys(this.formGroup.controls).forEach(function (controlName) {
            if (_this.formGroup.controls[controlName].invalid) {
                _this.formGroup.controls[controlName].markAsDirty();
            }
        });
        return false;
    };
    RekeyReasonCatBPage.prototype.ipadIssueSelected = function (checked) {
        this.store$.dispatch(new IpadIssueSelected(checked));
    };
    RekeyReasonCatBPage.prototype.ipadIssueTechnicalFaultChanged = function (selected) {
        this.store$.dispatch(new IpadIssueTechFaultSelected());
    };
    RekeyReasonCatBPage.prototype.ipadIssueLostChanged = function (selected) {
        this.store$.dispatch(new IpadIssueLostSelected());
    };
    RekeyReasonCatBPage.prototype.ipadIssueStolenChanged = function (selected) {
        this.store$.dispatch(new IpadIssueStolenSelected());
    };
    RekeyReasonCatBPage.prototype.ipadIssueBrokenChanged = function (selected) {
        this.store$.dispatch(new IpadIssueBrokenSelected());
    };
    RekeyReasonCatBPage.prototype.otherSelected = function (checked) {
        this.store$.dispatch(new OtherSelected(checked));
    };
    RekeyReasonCatBPage.prototype.otherReasonChanged = function (reason) {
        this.store$.dispatch(new OtherReasonUpdated(reason));
    };
    RekeyReasonCatBPage.prototype.transferSelected = function (isChecked) {
        this.store$.dispatch(new TransferSelected(isChecked));
        if (isChecked) {
            this.store$.dispatch(new SetExaminerConducted(null));
        }
        else {
            this.store$.dispatch(new SetExaminerConducted(this.examinerKeyed)); // reset to current user
            this.store$.dispatch(new ResetStaffNumberValidationError());
        }
    };
    RekeyReasonCatBPage.prototype.staffNumberChanged = function (staffNumber) {
        if (this.isStaffNumberInvalid) {
            this.store$.dispatch(new ResetStaffNumberValidationError());
        }
        this.store$.dispatch(new SetExaminerConducted(staffNumber));
    };
    RekeyReasonCatBPage.prototype.onExitRekeyPressed = function () {
        this.showExitRekeyModal();
    };
    RekeyReasonCatBPage.prototype.showExitRekeyModal = function () {
        var options = { cssClass: 'mes-modal-alert text-zoom-regular' };
        this.modal = this.modalController.create('ExitRekeyModal', {}, options);
        this.modal.onDidDismiss(this.onExitRekeyModalDismiss);
        this.modal.present();
    };
    RekeyReasonCatBPage = __decorate([
        IonicPage(),
        Component({
            selector: '.rekey-reason-cat-b-page',
            templateUrl: 'rekey-reason.cat-b.page.html',
        }),
        __metadata("design:paramtypes", [NavController,
            Platform,
            AuthenticationProvider,
            Store,
            ModalController,
            LoadingController])
    ], RekeyReasonCatBPage);
    return RekeyReasonCatBPage;
}(BasePageComponent));
export { RekeyReasonCatBPage };
//# sourceMappingURL=rekey-reason.cat-b.page.js.map