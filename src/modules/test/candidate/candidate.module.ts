import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { candidateReducer } from './candidate.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('candidate', candidateReducer),
  ],
})
export class CandidateModule {}
