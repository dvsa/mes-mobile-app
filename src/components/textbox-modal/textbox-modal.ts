import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'textbox-modal',
  templateUrl: 'textbox-modal.html'
})
export class TextboxModalComponent {
  title: string;
  liveNotes: string;
  notes: string;

  constructor(private viewCtrl: ViewController, public params: NavParams) {
    this.title = params.get('title');
    this.notes = params.get('notes');
    this.liveNotes = this.notes;
  }

  cancel() {
    if (this.notes) {
      this.viewCtrl.dismiss(this.notes);
    } else {
      this.viewCtrl.dismiss();
    }
  }

  save() {
    if (this.liveNotes) {
      this.notes = this.liveNotes;
      this.viewCtrl.dismiss(this.notes);
    } else {
      this.viewCtrl.dismiss();
    }
  }
}
