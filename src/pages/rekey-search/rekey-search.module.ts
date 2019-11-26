import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RekeySearchPage } from './rekey-search';
import { EffectsModule } from '@ngrx/effects';
import { RekeySearchAnalyticsEffects } from './rekey-search.analytics.effects';
import { ComponentsModule } from '../../components/common/common-components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { RekeySearchEffects } from './rekey-search.effects';
import { StoreModule } from '@ngrx/store';
import { rekeySearchReducer } from './rekey-search.reducer';
import { RekeySearchProvider } from '../../providers/rekey-search/rekey-search';
import { CompressionProvider } from '../../providers/compression/compression';
import { TestSlotComponentsModule } from '../../components/test-slot/test-slot-components.module';
import { SlotProvider } from '../../providers/slot/slot';
import { SearchProvider } from '../../providers/search/search';

@NgModule({
  declarations: [
    RekeySearchPage,
  ],
  imports: [
    IonicPageModule.forChild(RekeySearchPage),
    StoreModule.forFeature('rekeySearch', rekeySearchReducer),
    EffectsModule.forFeature([
      RekeySearchEffects,
      RekeySearchAnalyticsEffects,
    ]),
    ComponentsModule,
    TestSlotComponentsModule,
    DirectivesModule,
  ],
  providers: [
    RekeySearchProvider,
    SearchProvider,
    CompressionProvider,
    SlotProvider,
  ],
})
export class RekeySearchPageModule {}
