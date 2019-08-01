import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RekeySearchPage } from './rekey-search';
import { SearchProvider } from '../../providers/search/search';
import { EffectsModule } from '@ngrx/effects';
import { RekeySearchAnalyticsEffects } from './rekey-search.analytics.effects';

@NgModule({
  declarations: [
    RekeySearchPage,
  ],
  imports: [
    IonicPageModule.forChild(RekeySearchPage),
    EffectsModule.forFeature([RekeySearchAnalyticsEffects]),
  ],
  providers: [
    SearchProvider,
  ],
})
export class RekeySearchPageModule {}
