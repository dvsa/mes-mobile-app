import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DelegatedRekeySearchPage } from './delegated-rekey-search';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../components/common/common-components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { DelegatedRekeySearchEffects } from './delegated-rekey-search.effects';
import { StoreModule } from '@ngrx/store';
import { delegatedSearchReducer } from './delegated-rekey-search.reducer';
import { DelegatedRekeySearchProvider } from '../../providers/delegated-rekey-search/delegated-rekey-search';
import { CompressionProvider } from '../../providers/compression/compression';
import { TestSlotComponentsModule } from '../../components/test-slot/test-slot-components.module';
import { SlotProvider } from '../../providers/slot/slot';
import { SearchProvider } from '../../providers/search/search';

@NgModule({
  declarations: [
    DelegatedRekeySearchPage,
  ],
  imports: [
    IonicPageModule.forChild(DelegatedRekeySearchPage),
    StoreModule.forFeature('delegatedRekeySearch', delegatedSearchReducer),
    EffectsModule.forFeature([
      DelegatedRekeySearchEffects,
    ]),
    ComponentsModule,
    TestSlotComponentsModule,
    DirectivesModule,
  ],
  providers: [
    DelegatedRekeySearchProvider,
    SearchProvider,
    CompressionProvider,
    SlotProvider,
  ],
})
export class DelegatedRekeySearchPageModule {}
