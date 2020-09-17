import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Toast, ToastController } from 'ionic-angular';

@Component({
  selector: 'question-footer',
  templateUrl: 'question-footer.html',
})
export class QuestionFooterComponent {

  @Output()
  questionPageChange = new EventEmitter();

  @Output()
  testSummaryRequested = new EventEmitter<boolean>();

  @Input()
  questionNumber: number;

  @Input()
  formGroup: FormGroup;

  @Input()
  isDelegated?: boolean = false;

  toast: Toast;

  constructor(
    public toastController: ToastController) {
  }

  showPreviousPageButton = (): boolean => this.questionNumber > 1 && !this.isDelegated;

  showNextPageButton = (): boolean => this.questionNumber < 5 && !this.isDelegated;

  showViewSummaryButton = (): boolean => this.questionNumber === 5 || this.isDelegated;

  goToPreviousQuestion = (): void => {
    const questionNumber: number = this.questionNumber - 1;
    this.questionPageChange.emit(questionNumber);
  }

  goToNextQuestion = () => {
    const questionNumber: number = this.questionNumber + 1;
    this.questionPageChange.emit(questionNumber);
  }

  goToSummary = () => {
    if (this.isDelegated) {
      if (this.isFormValid()) {
        this.testSummaryRequested.emit(true);
      }
      return;
    }
    this.testSummaryRequested.emit(true);
  }

  isFormValid() {
    Object.keys(this.formGroup.controls).forEach(controlName => this.formGroup.controls[controlName].markAsDirty());
    if (this.formGroup.valid) {
      return true;
    }

    this.createToast('Please select all scores');
    this.toast.present();
    return false;
  }

  private createToast = (errorMessage: string) => {
    this.toast = this.toastController.create({
      message: errorMessage,
      position: 'top',
      dismissOnPageChange: true,
      cssClass: 'mes-toast-message-error',
      duration: 5000,
      showCloseButton: true,
      closeButtonText: 'X',
    });
  }

}
