import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RekeySearchPage } from './rekey-search';
import { EffectsModule } from '@ngrx/effects';
import { RekeySearchAnalyticsEffects } from './rekey-search.analytics.effects';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { RekeySearchEffects } from './rekey-search.effects';
import { StoreModule } from '@ngrx/store';
import { rekeySearchReducer } from './rekey-search.reducer';
import { RekeySearchProvider } from '../../providers/rekey-search/rekey-search';

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
    DirectivesModule,
  ],
  providers: [
    RekeySearchProvider,
  ],
})
export class RekeySearchPageModule {}
