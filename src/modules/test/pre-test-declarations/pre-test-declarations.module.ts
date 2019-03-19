import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { preTestDeclarationsReducer } from './pre-test-declarations.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('preTestDeclarations', preTestDeclarationsReducer),
  ],
})
export class PreTestDeclarationsModule {}
