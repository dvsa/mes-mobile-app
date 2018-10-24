import { File } from '@ionic-native/file';
import { DirectivesModule } from './../directives/directives.module';
import { AllOnOneV2Page } from './../pages/all-on-one-v2/all-on-one-v2';
import { ErrorHandler, NgModule } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { App } from './app.component';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CandidateInfoPage } from '../pages/candidate-info/candidate-info';
import { DeclarationConsentPage } from '../pages/declaration-consent/declaration-consent';
import { EndTestReasonPage } from '../pages/end-test-reason/end-test-reason';
import { InitiateDrivingPeriodPage } from '../pages/initiate-driving-period/initiate-driving-period';
import { InitiateSwapPage } from '../pages/initiate-swap/initiate-swap';
import { JournalPage } from '../pages/journal/journal';
import { LdtmModePage } from '../pages/ldtm-mode/ldtm-mode';
import { ManageDeviceDebriefStoragePage } from '../pages/manage-device-debrief-storage/manage-device-debrief-storage';
import { PolicyDataPage } from '../pages/policy-data/policy-data';
import { PretestChecksPage } from '../pages/pretest-checks/pretest-checks';
import { SignaturePadModule } from 'angular2-signaturepad';
import { TestResultPage } from '../pages/test-result/test-result';
import { TrainerModePage } from '../pages/trainer-mode/trainer-mode';
import { PostTestSummaryPage } from '../pages/post-test-summary/post-test-summary';
import { ComponentsModule } from '../components/components.module';
import { WeatherSelectorComponent } from '../components/weather-selector/weather-selector';
import { JournalProvider } from '../providers/journal/journal';
import { DateTimeUtility } from '../shared/utils/datetime';
import { AppConfigProvider } from '../providers/app-config/app-config';
import { QuestionsModalComponent } from '../components/questions-modal/questions-modal';
import { SelectButtonComponent } from '../components/select-button/select-button';
import { EyesightFaultRecordingModalPage } from '../pages/eyesight-fault-recording-modal/eyesight-fault-recording-modal';
import {
  TranslateModule,
  TranslateStaticLoader,
  TranslateLoader
} from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';
import { HazardRecorderProvider } from '../providers/hazard-recorder/hazard-recorder';
import { FaultStoreProvider } from '../providers/fault-store/fault-store';
import { NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { FaultStoreActions } from '../providers/fault-store/fault-store.action';
import { CustomHammerConfigProvider } from '../providers/custom-hammer-config/custom-hammer-config';
import { DeviceAuthentication } from '../types/device-authentication';
import { AoopCustomHammerConfigPage } from '../pages/aoop-custom-hammer-config/aoop-custom-hammer-config';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { Globalization } from '@ionic-native/globalization';
import { FormsModule } from '@angular/forms';
import { PassDataCollectionPage } from '../pages/pass-data-collection/pass-data-collection';
import { HealthDeclarationPage } from '../pages/health-declaration/health-declaration';
import { TextboxModalComponent } from '../components/textbox-modal/textbox-modal';
import { TestSummaryMetadataProvider } from '../providers/test-summary-metadata/test-summary-metadata';
import { VehicleCheckProvider } from '../providers/vehicle-check/vehicle-check';
import { Media } from '@ionic-native/media';
import { AudioRecorderProvider } from '../providers/audio-recorder/audio-recorder';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    App,
    LoginPage,
    DashboardPage,
    CandidateInfoPage,
    DeclarationConsentPage,
    EndTestReasonPage,
    InitiateDrivingPeriodPage,
    InitiateSwapPage,
    JournalPage,
    LdtmModePage,
    ManageDeviceDebriefStoragePage,
    PolicyDataPage,
    PretestChecksPage,
    TestResultPage,
    TrainerModePage,
    EyesightFaultRecordingModalPage,
    PostTestSummaryPage,
    AllOnOneV2Page,
    AoopCustomHammerConfigPage,
    PassDataCollectionPage,
    HealthDeclarationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App),
    ComponentsModule,
    HttpClientModule,
    SignaturePadModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    }),
    NgReduxModule,
    FormsModule,
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    LoginPage,
    DashboardPage,
    CandidateInfoPage,
    DeclarationConsentPage,
    EndTestReasonPage,
    InitiateDrivingPeriodPage,
    InitiateSwapPage,
    JournalPage,
    LdtmModePage,
    ManageDeviceDebriefStoragePage,
    PolicyDataPage,
    PretestChecksPage,
    TestResultPage,
    TrainerModePage,
    QuestionsModalComponent,
    SelectButtonComponent,
    EyesightFaultRecordingModalPage,
    PostTestSummaryPage,
    WeatherSelectorComponent,
    AllOnOneV2Page,
    AoopCustomHammerConfigPage,
    PassDataCollectionPage,
    HealthDeclarationPage,
    TextboxModalComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppConfigProvider,
    JournalProvider,
    DateTimeUtility,
    HazardRecorderProvider,
    FaultStoreProvider,
    DevToolsExtension,
    FaultStoreActions,
    CustomHammerConfigProvider,
    DeviceAuthentication,
    ScreenOrientation,
    Insomnia,
    Globalization,
    TestSummaryMetadataProvider,
    VehicleCheckProvider,
    File,
    Media,
    AudioRecorderProvider
  ]
})
export class AppModule {}
