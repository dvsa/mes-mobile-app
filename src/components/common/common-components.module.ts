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
import { TranslateModule } from '@ngx-translate/core';
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
import { DataRowComponent } from './data-row/data-row';
import { DataRowCustomComponent } from './data-row-custom/data-row-custom';
import { CPCDebriefCardComponent } from './cpc-debrief-card/cpc-debrief-card';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { HealthDeclarationSignedComponent } from './health-declaration-signed/health-declaration-signed';
import { BikeCategoryTypeComponent } from './bike-category-type/bike-category-type';

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
    DataRowComponent,
    DataRowCustomComponent,
    CPCDebriefCardComponent,
    HealthDeclarationSignedComponent,
    BikeCategoryTypeComponent,
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
    DataRowComponent,
    DataRowCustomComponent,
    CPCDebriefCardComponent,
    PipesModule,
    HealthDeclarationSignedComponent,
    BikeCategoryTypeComponent,
  ],
})
export class ComponentsModule { }
