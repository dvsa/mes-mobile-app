import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { ModalEvent } from './journal-early-start-modal.constants';
import { SlotDetail } from '@dvsa/mes-journal-schema';
import { DateTime } from '../../../../shared/helpers/date-time';

@IonicPage()
@Component({
  selector: 'journal-early-start-modal',
  templateUrl: 'journal-early-start-modal.html',
})
export class JournalEarlyStartModal implements OnInit {
  private slotData: SlotDetail;
  constructor(private viewCtrl: ViewController, private params: NavParams) {
  }

  ngOnInit(): void {
    this.slotData = this.params.get('slotData');
  }

  getSlotData() {
    return this.slotData;
  }

  onCancel() {
    this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }

  onStart() {
    this.viewCtrl.dismiss(ModalEvent.START);
  }

  getStartTime() {
    return new DateTime(this.slotData.start).format('kk:mm');
  }
}
