import { Component, Input } from '@angular/core';
import { HazardRecorderProvider } from '../../providers/hazard-recorder/hazard-recorder';
import { Subscription } from 'rxjs/Subscription';
import { FaultStoreProvider } from '../../providers/fault-store/fault-store';

/**
 * Generated class for the TotalsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'totals',
  templateUrl: 'totals.html'
})
export class TotalsComponent {
  isRemoveDisabled: boolean = false;
  subscription: Subscription;
  numFaults: number = 0;
  numDangerous: number = 0;
  numSerious: number = 0;

  @Input() options;

  isRemoveButtonPressed = false;

  constructor(
    private hazardProvider: HazardRecorderProvider,
    private faultStore: FaultStoreProvider
  ) {
    this.faultStore.currentFaults$.subscribe((data) => {
      let fs = 0;
      let ds = 0;
      let ss = 0;
      Object.keys(data).forEach((fault) => {
        if (fault === 'lastFault') {
          return false;
        }
        if (data[fault].fault) {
          fs += data[fault].fault;
        }
        if (data[fault].dangerous) {
          ds += data[fault].dangerous;
        }
        if (data[fault].serious) {
          ss += data[fault].serious;
        }
      });

      this.numFaults = fs;
      this.numDangerous = ds;
      this.numSerious = ss;
      this.toggleRemoveDisabledButton();
    });

    this.toggleRemoveDisabledButton();
  }

  toggleRemoveDisabledButton() {
    if (this.numDangerous > 0 || this.numFaults > 0 || this.numSerious > 0) {
      this.isRemoveDisabled = false;
    } else {
      this.isRemoveDisabled = true;
    }
  }

  toggleRemoveButtonState(hazardProviderClass: HazardRecorderProvider) {
    const enabledFault = this.hazardProvider.getEnabled();
    if (this.numFaults < 1) return (this.isRemoveDisabled = true);
    if (enabledFault !== null && enabledFault !== 'remove') return (this.isRemoveDisabled = true);

    return (this.isRemoveDisabled = false);
  }

  enableRemovingFaults() {
    this.isRemoveButtonPressed = !this.isRemoveButtonPressed;
    this.hazardProvider.enableRemovingFaults(() => (this.isRemoveButtonPressed = false));
  }
}
