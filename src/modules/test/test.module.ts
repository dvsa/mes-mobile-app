import { NgModule } from '@angular/core';
import { PreTestDeclarationsModule } from './pre-test-declarations/pre-test-declarations.module';

@NgModule({
  exports: [
    PreTestDeclarationsModule,
  ],
  imports: [
    PreTestDeclarationsModule,
  ],
})
export class TestModule {}
