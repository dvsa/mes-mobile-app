var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ModalEvent } from './journal-early-start-modal.constants';
import { Store } from '@ngrx/store';
import { EarlyStartDidContinue, EarlyStartDidReturn } from '../../../../modules/journal/journal.actions';
import * as moment from 'moment';
var JournalEarlyStartModal = /** @class */ (function () {
    function JournalEarlyStartModal(store$, viewCtrl, params) {
        this.store$ = store$;
        this.viewCtrl = viewCtrl;
        this.params = params;
    }
    JournalEarlyStartModal.prototype.ngOnInit = function () {
        this.slotData = this.params.get('slotData');
    };
    JournalEarlyStartModal.prototype.getSlotData = function () {
        return this.slotData;
    };
    JournalEarlyStartModal.prototype.onCancel = function () {
        this.store$.dispatch(new EarlyStartDidReturn());
        this.viewCtrl.dismiss(ModalEvent.CANCEL);
    };
    JournalEarlyStartModal.prototype.onStart = function () {
        this.store$.dispatch(new EarlyStartDidContinue());
        this.viewCtrl.dismiss(ModalEvent.START);
    };
    JournalEarlyStartModal.prototype.getStartTime = function () {
        return moment(this.slotData.start).format('kk:mm');
    };
    JournalEarlyStartModal = __decorate([
        IonicPage(),
        Component({
            selector: 'journal-early-start-modal',
            templateUrl: 'journal-early-start-modal.html',
        }),
        __metadata("design:paramtypes", [Store,
            ViewController,
            NavParams])
    ], JournalEarlyStartModal);
    return JournalEarlyStartModal;
}());
export { JournalEarlyStartModal };
//# sourceMappingURL=journal-early-start-modal.js.map