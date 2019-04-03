import { NgModule } from '@angular/core';
import { SignatureAreaComponent } from './signature-area/signature-area';
import { SignaturePadModule } from 'angular2-signaturepad';
import { CommonModule } from '@angular/common';
import { LockScreenIndicator } from './screen-lock-indicator/lock-screen-indicator';
import { FaultCounterComponent } from './fault-counter/fault-counter';
import { SeriousFaultBadgeComponent } from './serious-fault-badge/serious-fault-badge';

@NgModule({
  declarations: [
    SignatureAreaComponent,
    LockScreenIndicator,
    FaultCounterComponent,
    SeriousFaultBadgeComponent,
  ],
  imports: [
    SignaturePadModule,
    CommonModule,
  ],
  exports:[
    SignatureAreaComponent,
    LockScreenIndicator,
    FaultCounterComponent,
    SeriousFaultBadgeComponent,
  ],
})
export class ComponentsModule {}
