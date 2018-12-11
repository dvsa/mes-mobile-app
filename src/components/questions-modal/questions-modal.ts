import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { IQuestionOption } from '../../shared/interfaces/iquestion-option';

@Component({
  selector: 'questions-modal',
  templateUrl: 'questions-modal.html'
})
export class QuestionsModalComponent {
  selectedTellMeQuestionId: string;
  options: IQuestionOption[];

  constructor(private viewCtrl: ViewController, params: NavParams) {
    this.options = params.get('options');
    this.options.forEach((option, index) => (this.options[index].isExpanded = false));
    this.selectedTellMeQuestionId = params.get('selectedTellMeQuestionId');
  }

  dismiss() {
    this.viewCtrl.dismiss(null, 'dismiss');
  }

  select({ id, keyWords, shortText } = { id: '', keyWords: '', shortText: '' }) {
    this.selectedTellMeQuestionId = id;
    setTimeout(() => this.viewCtrl.dismiss({ id, keyWords, shortText }), 300);
  }

  toggle(index: number) {
    this.options[index].isExpanded = !this.options[index].isExpanded;
  }
}
