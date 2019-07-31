import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RekeySearchPage } from './rekey-search';
import { SearchProvider } from '../../providers/search/search';
import { EffectsModule } from '@ngrx/effects';
import { RekeySearchAnalyticsEffects } from './rekey-search.analytics.effects';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    RekeySearchPage,
  ],
  imports: [
    IonicPageModule.forChild(RekeySearchPage),
    EffectsModule.forFeature([RekeySearchAnalyticsEffects]),
    ComponentsModule,
    DirectivesModule,
  ],
  providers: [
    SearchProvider,
  ],
})
export class RekeySearchPageModule {}
