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
import { ConductedLanguageComponent } from './conducted-language/conducted-language';

@NgModule({
  declarations: [
    SignatureAreaComponent,
    LockScreenIndicator,
    DrivingFaultsBadgeComponent,
    SeriousFaultBadgeComponent,
    DangerousFaultBadgeComponent,
    EndTestLinkComponent,
    CandidateSectionComponent,
    ConductedLanguageComponent,
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
    ConductedLanguageComponent,
  ],
})
export class ComponentsModule { }
