import { Component, Input } from '@angular/core';
import { OverlayCallback } from '../../test-report';
import { ManoeuvreIndicator } from '@dvsa/mes-test-schema/categories/B';
import { Observable } from 'rxjs/Observable';
interface ManoeuvresState {
  selectedReverseLeft$: Observable<ManoeuvreIndicator>;
  selectedReverseRight$: Observable<ManoeuvreIndicator>;
  selectedReverseParkRoad$: Observable<ManoeuvreIndicator>;
  selectedForwardPark$: Observable<ManoeuvreIndicator>;
  selectedControlledStop$: Observable<ManoeuvreIndicator>;
}
@Component({
  selector: 'competency-with-modal',
  templateUrl: 'competency-with-modal.html',
})
export class CompetencyWithModalComponent {

  @Input()
  controlLabel: String;
  @Input()
  completed:boolean;

  @Input()
  clickCallback: OverlayCallback;
  manoeuvres: ManoeuvresState;
  displayPopover: boolean;

  constructor() {
    this.displayPopover = false;
  }

  togglePromote(): void {
    this.displayPopover = !this.displayPopover;
    this.toggleOverlay();
  }
  toggleOverlay(): void {
    if (this.clickCallback) {
      this.clickCallback.callbackMethod();
    }
  }
  ngOnInit(): void {
  }
}
