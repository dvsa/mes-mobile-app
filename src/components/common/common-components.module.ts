import { NgModule } from '@angular/core';
import { SignatureAreaComponent } from './signature-area/signature-area';
import { SignaturePadModule } from 'angular2-signaturepad';
import { CommonModule } from '@angular/common';
import { LockScreenIndicator } from './screen-lock-indicator/lock-screen-indicator';
import { DrivingFaultsBadgeComponent } from './driving-faults-badge/driving-faults-badge';
import { SeriousFaultBadgeComponent } from './serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent } from './dangerous-fault-badge/dangerous-fault-badge';
import { IonicModule } from 'ionic-angular';
import { EndTestLinkComponent } from './end-test-link/end-test-link';
import { TerminateTestModalModule } from './terminate-test-modal/terminate-test-modal.module';
import { CandidateSectionComponent } from './candidate-section/candidate-section';
import { TranslateModule } from 'ng2-translate';
import { DisplayAddressComponent } from './display-address/display-address';
import { PracticeModeBanner } from './practice-mode-banner/practice-mode-banner';
import { TickIndicatorComponent } from './tick-indicator/tick-indicator';
import { ModalAlertTitleComponent } from './modal-alert-title/modal-alert-title';
import { ModalReturnButtonComponent } from './modal-return-button/modal-return-button';
import { ErrorMessageComponent } from './error-message/error-message';
import { TabComponent } from './tab/tab';
import { TabsComponent } from './tabs/tabs';
import { ActivityCodeComponent } from '../../pages/office/components/activity-code/activity-code';
import { IncompleteTestsBanner } from './incomplete-tests-banner/incomplete-tests-banner';
import { WarningBannerComponent } from './warning-banner/warning-banner';
import { TransmissionComponent } from './transmission/transmission';

@NgModule({
  declarations: [
    SignatureAreaComponent,
    LockScreenIndicator,
    DrivingFaultsBadgeComponent,
    SeriousFaultBadgeComponent,
    DangerousFaultBadgeComponent,
    EndTestLinkComponent,
    CandidateSectionComponent,
    DisplayAddressComponent,
    PracticeModeBanner,
    TickIndicatorComponent,
    ModalAlertTitleComponent,
    ModalReturnButtonComponent,
    ErrorMessageComponent,
    TabComponent,
    TabsComponent,
    ActivityCodeComponent,
    IncompleteTestsBanner,
    WarningBannerComponent,
    TransmissionComponent,
  ],
  imports: [
    SignaturePadModule,
    CommonModule,
    IonicModule,
    TerminateTestModalModule,
    TranslateModule,
  ],
  exports: [
    SignatureAreaComponent,
    LockScreenIndicator,
    DrivingFaultsBadgeComponent,
    SeriousFaultBadgeComponent,
    DangerousFaultBadgeComponent,
    EndTestLinkComponent,
    CandidateSectionComponent,
    DisplayAddressComponent,
    PracticeModeBanner,
    TickIndicatorComponent,
    ModalAlertTitleComponent,
    ModalReturnButtonComponent,
    ErrorMessageComponent,
    TabComponent,
    TabsComponent,
    ActivityCodeComponent,
    IncompleteTestsBanner,
    WarningBannerComponent,
    TransmissionComponent,
  ],
})
export class ComponentsModule { }
