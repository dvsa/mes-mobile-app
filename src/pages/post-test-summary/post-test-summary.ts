import { IManualSummary } from './../../components/test-summary/interfaces/IManualSummary';
import { TestSummaryMetadataProvider } from './../../providers/test-summary-metadata/test-summary-metadata';
import { Component, ViewChildren, QueryList } from '@angular/core';
import {
  Platform,
  ModalController,
  NavController,
  AlertController,
  NavParams
} from 'ionic-angular';
import { Page } from 'ionic-angular/navigation/nav-util';
import { FaultStoreProvider } from '../../providers/fault-store/fault-store';
import { IFaultSummary } from '../../components/test-summary/interfaces/IFaultSummary';
import { WeatherSelectorComponent } from '../../components/weather-selector/weather-selector';
import { JournalPage } from '../journal/journal';
import { QuestionsModalComponent } from '../../components/questions-modal/questions-modal';
import { SHOW_ME_QUESTIONS } from '../../app/constants';
import { VehicleCheckProvider } from '../../providers/vehicle-check/vehicle-check';
import { isNonBlankString } from '../../shared/utils/string-utils';
import { PostTestSummarySectionComponent } from '../../components/post-test-summary-section/post-test-summary-section';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { IJournal, ICandidateName } from '../../providers/journal/journal-model';
import { HelpFinalisationSubmissionPage } from '../../help/pages/help-finalisation-submission/help-finalisation-submission';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@Component({
  selector: 'page-post-test-summary',
  templateUrl: 'post-test-summary.html'
})
export class PostTestSummaryPage {
  drivingFaultSummary: IFaultSummary;
  seriousFaultSummary: IFaultSummary;
  dangerousFaultSummary: IFaultSummary;
  journalPage: Page = JournalPage;
  helpPage: Page = HelpFinalisationSubmissionPage;
  selectedRoute: string = null;
  showMeQuestion = null;
  disableBackdropDismissModalOption = { enableBackdropDismiss: false };
  safetyQuestionSummary: IManualSummary;
  conditionsList: string;
  independentDrivingType: string = '0';
  candidateDescription: string = null;
  @ViewChildren(PostTestSummarySectionComponent)
  summarySectionComponents: QueryList<PostTestSummarySectionComponent>;
  slotDetail: IJournal;

  // Validation Flags
  showRouteNumberValidation: boolean = false;
  showShowMeQuestionValidation: boolean = false;
  showWeatherValidation: boolean = false;
  showIndependentDrivingValidation: boolean = false;
  showPhysicalDescriptionValidation: boolean = false;

  constructor(
    private platform: Platform,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    public navParams: NavParams,
    private faultStore: FaultStoreProvider,
    private alertCtrl: AlertController,
    private vehicleCheckProvider: VehicleCheckProvider,
    private summaryMetadata: TestSummaryMetadataProvider,
    private screenOrientation: ScreenOrientation,
    public logging: AnalyticsProvider
  ) {
    this.faultStore.getFaultTotals().subscribe((faultSummaries) => {
      this.drivingFaultSummary = faultSummaries.drivingFaultSummary;
      this.seriousFaultSummary = faultSummaries.seriousFaultSummary;
      this.dangerousFaultSummary = faultSummaries.dangerousFaultSummary;
      this.slotDetail = this.navParams.get('slotDetail');
    });

    this.safetyQuestionSummary = {
      title: 'Safety Questions',
      color: 'dark',
      sentences: this.mapSafetyQuestion()
    };
  }

  ionViewDidEnter() {
    if (this.platform.is('cordova')) {
      this.screenOrientation.unlock();
    }
  }

  ionViewDidLoad() {
    this.logging.setCurrentPage('test page');
  }

  ionViewDidLeave() {
    if (this.platform.is('cordova')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
    }
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

  onSubmit() {
    if (this.isFullyComplete()) {
      this.backToJournal();
    } else {
      const title = 'Defer test result submission?';
      const message =
        'You must complete all the mandatory fields before this test result can be submitted.' +
        ' Are you sure you want to defer submission to a later time?';
      this.alertCtrl
        .create({
          title,
          message,
          buttons: [
            {
              text: 'Defer',
              handler: () => this.backToJournal()
            },
            {
              text: 'Complete report'
            }
          ]
        })
        .present();
    }
  }

  onReturnToJournal() {
    this.backToJournal();
  }

  private backToJournal() {
    this.logging.logEvent('click', 'test end');
    this.faultStore.reset();
    this.summaryMetadata.reset();
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
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

  private isFullyComplete() {
    this.runValidation();

    // Need to run validation for all sections
    let allSectionsComplete = true;

    if (this.summarySectionComponents) {
      this.summarySectionComponents.forEach((c) => {
        if (!c.isComplete()) {
          allSectionsComplete = false;
        }
      });
    }

    return (
      !this.showRouteNumberValidation &&
      !this.showWeatherValidation &&
      !this.showShowMeQuestionValidation &&
      !this.showPhysicalDescriptionValidation &&
      !this.showIndependentDrivingValidation &&
      allSectionsComplete
    );
  }

  private runValidation() {
    this.showRouteNumberValidation = !isNonBlankString(this.selectedRoute);
    this.showWeatherValidation = !isNonBlankString(this.conditionsList);
    this.showShowMeQuestionValidation = !isNonBlankString(this.showMeQuestion);
    this.showPhysicalDescriptionValidation = !isNonBlankString(this.candidateDescription);
    this.showIndependentDrivingValidation = this.independentDrivingType === '0';
  }

  private mapSafetyQuestion(showMeQuestion?): string[] {
    return [
      this.vehicleCheckProvider.getTellMe(),
      showMeQuestion && showMeQuestion.id ? showMeQuestion : null
    ]
      .filter((n) => n)
      .map((question: { id; keyWords }) => `${question.id} - ${question.keyWords}`);
  }

  getTitle(): string {
    const name: ICandidateName = this.slotDetail.candidateName;
    return `${name.firstName} ${name.lastName} - Test summary`;
  }
}
