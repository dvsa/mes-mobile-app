import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { ModalEvent } from './journal-early-start-modal.constants';
import { SlotDetail } from '@dvsa/mes-journal-schema';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { EarlyStartDidContinue, EarlyStartDidReturn } from '../../../../modules/journal/journal.actions';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'journal-early-start-modal',
  templateUrl: 'journal-early-start-modal.html',
})
export class JournalEarlyStartModal implements OnInit {
  private slotData: SlotDetail;
  constructor(
    public store$: Store<StoreModel>,
    public viewCtrl: ViewController,
    private params: NavParams,
  ) {
  }

  ngOnInit(): void {
    this.slotData = this.params.get('slotData');
  }

  getSlotData() {
    return this.slotData;
  }

  onCancel() {
    this.store$.dispatch(new EarlyStartDidReturn());
    this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }

  onStart() {
    this.store$.dispatch(new EarlyStartDidContinue());
    this.viewCtrl.dismiss(ModalEvent.START);
  }

  getStartTime() {
    return moment(this.slotData.start).format('kk:mm');
  }
}
