import { TELL_ME_QUESTIONS } from './../../app/constants';
import { VehicleCheckProvider, vCheckType } from './../../providers/vehicle-check/vehicle-check';
import { AllOnOneV2Page } from './../all-on-one-v2/all-on-one-v2';
import { EyesightFaultRecordingModalPage } from './../eyesight-fault-recording-modal/eyesight-fault-recording-modal';
import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { PolicyDataPage } from '../policy-data/policy-data';
import { EndTestReasonPage } from '../end-test-reason/end-test-reason';
import { Page } from 'ionic-angular/navigation/nav-util';
import { QuestionsModalComponent } from '../../components/questions-modal/questions-modal';
import { select } from '@angular-redux/store';

@Component({
  selector: 'page-pretest-checks',
  templateUrl: 'pretest-checks.html'
})
export class PretestChecksPage {
  @ViewChild('isAutomatic') isAutomaticInput;
  endTestReasonPage: Page = EndTestReasonPage;
  policyDataPage: Page = PolicyDataPage;
  eyeSightSeriousFault = false;
  disableBackdropDismissModalOption = { enableBackdropDismiss: false };
  preCheck = {
    isEyesightCompleted: false,
    carRegistration: null,
    tellMeQuestionId: null,
    isAutomatic: null
  };

  @select(['faults', 'vehicleCheck'])
  vcState$;

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private vcProvider: VehicleCheckProvider
  ) {}

  ngAfterViewInit() {
    this.vcProvider.reset(vCheckType.TELLME);
    this.vcProvider.reset(vCheckType.SHOWME);
  }

  setTellMeState(faultType, $event) {
    const isActive = $event.currentTarget.className.includes('active');

    if (isActive) {
      this.vcProvider.removeFault(vCheckType.TELLME);
    } else {
      this.vcProvider.addFault(vCheckType.TELLME, faultType);
    }
  }

  showTellMeOptions = () => {
    const tellMeQuestionModal = this.modalCtrl.create(
      QuestionsModalComponent,
      { options: TELL_ME_QUESTIONS, selectedTellMeQuestionId: this.preCheck.tellMeQuestionId },
      this.disableBackdropDismissModalOption
    );

    tellMeQuestionModal.onDidDismiss((selectedQuestion = { id: null }, role: string) => {
      if (role !== 'dismiss') {
        this.preCheck.tellMeQuestionId = selectedQuestion.id;
        this.vcProvider.markAsComplete(selectedQuestion, vCheckType.TELLME);
      }
    });

    tellMeQuestionModal.present();
  };

  showEyesightFaultRecordingModal() {
    const eyesightFaultRecordingModal = this.modalCtrl.create(
      EyesightFaultRecordingModalPage,
      null,
      this.disableBackdropDismissModalOption
    );

    eyesightFaultRecordingModal.onDidDismiss((flag) => {
      this.eyeSightSeriousFault = flag;
    });

    eyesightFaultRecordingModal.present();
  }

  gotoDL25(form) {
    if (form.valid) {
      this.navCtrl.push(AllOnOneV2Page, {}, { animate: false });
    }
  }

  automaticInputChanged(event, secondInput) {
    secondInput.checked = false;
    this.preCheck.isAutomatic = event.target.checked;
    this.isAutomaticInput.control.markAsDirty();
  }
}
