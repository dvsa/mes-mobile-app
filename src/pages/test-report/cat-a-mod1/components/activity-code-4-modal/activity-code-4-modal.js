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
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ModalEvent } from '../../../test-report.constants';
var ActivityCode4Modal = /** @class */ (function () {
    function ActivityCode4Modal(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
    }
    ActivityCode4Modal.prototype.ngOnInit = function () {
        this.modalReason = this.navParams.get('modalReason');
    };
    ActivityCode4Modal.prototype.onCancel = function () {
        this.viewCtrl.dismiss(ModalEvent.CANCEL);
    };
    ActivityCode4Modal.prototype.onEndTest = function () {
        this.viewCtrl.dismiss(ModalEvent.END_WITH_ACTIVITY_CODE_4);
    };
    ActivityCode4Modal = __decorate([
        IonicPage(),
        Component({
            selector: 'activity-code-4-modal',
            templateUrl: 'activity-code-4-modal.html',
        }),
        __metadata("design:paramtypes", [ViewController,
            NavParams])
    ], ActivityCode4Modal);
    return ActivityCode4Modal;
}());
export { ActivityCode4Modal };
//# sourceMappingURL=activity-code-4-modal.js.map