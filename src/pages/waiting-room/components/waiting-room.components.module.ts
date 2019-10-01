import { NgModule } from '@angular/core';
import { ConductedLanguageComponent } from './conducted-language/conducted-language';
import { IonicModule } from 'ionic-angular';
import { InsuranceDeclarationComponent } from './insurance-declaration/insurance-declaration';
import { TranslateModule } from 'ng2-translate';
import { ResidencyDeclarationComponent } from './residency-declaration/residency-declaration';
import { SignatureComponent } from './signature/signature';
import { ComponentsModule } from '../../../components/common/common-components.module';

@NgModule({
  declarations: [
    ConductedLanguageComponent,
    InsuranceDeclarationComponent,
    ResidencyDeclarationComponent,
    SignatureComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule,
    ComponentsModule,
  ],
  exports: [
    ConductedLanguageComponent,
    InsuranceDeclarationComponent,
    ResidencyDeclarationComponent,
    SignatureComponent,
  ],
})
export class WaitingRoomComponentsModule { }
