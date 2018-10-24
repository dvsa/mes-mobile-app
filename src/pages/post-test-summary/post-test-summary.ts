import { IManualSummary } from './../../components/test-summary/interfaces/IManualSummary';
import { TestSummaryMetadataProvider } from './../../providers/test-summary-metadata/test-summary-metadata';
import { Component } from '@angular/core';
import { ModalController, NavController, AlertController } from 'ionic-angular';
import { Page } from 'ionic-angular/navigation/nav-util';
import { FaultStoreProvider } from '../../providers/fault-store/fault-store';
import { IFaultSummary } from '../../components/test-summary/interfaces/IFaultSummary';
import { FaultTitle } from '../../components/test-summary/enums/FaultTitle';
import { WeatherSelectorComponent } from '../../components/weather-selector/weather-selector';
import { JournalPage } from '../journal/journal';
import { QuestionsModalComponent } from '../../components/questions-modal/questions-modal';
import { SHOW_ME_QUESTIONS } from '../../app/constants';
import { VehicleCheckProvider } from '../../providers/vehicle-check/vehicle-check';
import { TextboxModalComponent } from '../../components/textbox-modal/textbox-modal';

@Component({
  selector: 'page-post-test-summary',
  templateUrl: 'post-test-summary.html'
})
export class PostTestSummaryPage {
  drivingFaultSummary: IFaultSummary;
  seriousFaultSummary: IFaultSummary;
  dangerousFaultSummary: IFaultSummary;
  journalPage: Page = JournalPage;
  selectedRoute: number = null;
  showMeQuestion = null;
  disableBackdropDismissModalOption = { enableBackdropDismiss: false };
  safetyQuestionSummary: IManualSummary;
  conditionsList: string;
  faultTitleColourMap = [
    { title: FaultTitle.Dangerous, colour: 'failRed' },
    { title: FaultTitle.Serious, colour: 'seriousYellow' },
    { title: FaultTitle.DrivingFaults, colour: 'dark' }
  ];
  routeDeviations: string;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private faultStore: FaultStoreProvider,
    private alertCtrl: AlertController,
    private vehicleCheckProvider: VehicleCheckProvider,
    private summaryMetadata: TestSummaryMetadataProvider
  ) {
    this.faultStore.getFaultTotals().subscribe((faultSummaries) => {
      this.drivingFaultSummary = faultSummaries.drivingFaultSummary;
      this.seriousFaultSummary = faultSummaries.seriousFaultSummary;
      this.dangerousFaultSummary = faultSummaries.dangerousFaultSummary;
    });

    this.safetyQuestionSummary = {
      title: 'Safety Questions',
      color: 'dark',
      sentences: this.mapSafetyQuestion()
    };
  }

  showShowMeQuestions = () => {
    const showMeQuestionModal = this.modalCtrl.create(
      QuestionsModalComponent,
      { options: SHOW_ME_QUESTIONS, selectedTellMeQuestionId: this.showMeQuestion },
      this.disableBackdropDismissModalOption
    );

    showMeQuestionModal.onDidDismiss((selectedShowMeQuestion, role: string) => {
      if (role !== 'dismiss') {
        this.showMeQuestion = selectedShowMeQuestion.id;
        this.safetyQuestionSummary.sentences = this.mapSafetyQuestion(selectedShowMeQuestion);
      }
    });

    showMeQuestionModal.present();
  };

  backToJournal() {
    this.faultStore.reset();
    this.summaryMetadata.reset();
    this.navCtrl.popToRoot();
  }

  openWeatherModal() {
    const modal = this.modalCtrl.create(WeatherSelectorComponent);
    modal.onDidDismiss((data) => {
      if (data) {
        this.conditionsList = data;
      }
    });
    modal.present();
  }

  showRouteListAlert() {
    const inputs = [];
    for (let i = 1; i <= 13; i += 1) {
      inputs.push({
        type: 'radio',
        label: i,
        value: i,
        checked: this.selectedRoute === i
      });
    }

    const prompt = this.alertCtrl.create({
      inputs,
      title: 'Choose route number',
      buttons: [
        {
          text: 'Ok',
          handler: (chosenRoute) => {
            this.selectedRoute = chosenRoute;
          }
        }
      ]
    });
    prompt.present();
  }

  openTextBoxModal() {
    const textBoxModal = this.modalCtrl.create(TextboxModalComponent, {
      title: 'Route Deviations',
      notes: this.routeDeviations || ''
    });
    textBoxModal.onDidDismiss(
      (routeDeviations?: string) => (this.routeDeviations = routeDeviations)
    );
    textBoxModal.present();
  }

  independentDrivingOptionChanged(event, secondInput) {
    secondInput.checked = false;
  }

  private mapSafetyQuestion(showMeQuestion?): string[] {
    return [
      this.vehicleCheckProvider.getTellMe(),
      showMeQuestion && showMeQuestion.id ? showMeQuestion : null
    ]
      .filter((n) => n)
      .map((question: { id; keyWords }) => `${question.id} - ${question.keyWords}`);
  }
}
