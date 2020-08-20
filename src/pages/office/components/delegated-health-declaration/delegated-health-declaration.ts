import { Component, Input, OnChanges } from '@angular/core';

export enum ValidHealthDeclarationValues {
  SIGNED = 'Signed',
  NOT_SIGNED = 'Not Signed',
}
@Component({
  selector: 'delegated-health-declaration',
  templateUrl: 'delegated-health-declaration.html',
})
export class DelegatedHealthDeclarationComponent implements OnChanges {

  @Input()
  healthDeclarationSigned: boolean;

  ngOnChanges(): void {
  }

  healthDeclarationChanged(formValue: string): void {
  }

}
