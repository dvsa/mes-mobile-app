import { Component, Input } from '@angular/core';
import { FaultStoreProvider } from '../../providers/fault-store/fault-store';

@Component({
  selector: 'all-on-one-form-sub-element-button',
  templateUrl: 'all-on-one-form-sub-element-button.html'
})
export class AllOnOneFormSubElementButtonComponent {
  @Input() isEnabled: boolean = false;
  @Input() text: string;
  @Input() sectionsToShow: string;
  @Input() isComplete: boolean;
  serious: boolean = false;
  dangerous: boolean = false;
  faultCount: number = 0;

  constructor(private faultStore: FaultStoreProvider) {
    this.faultStore.currentFaults$.subscribe((data) => {
      let serious = false;
      let dangerous = false;
      let sumCount = 0;

      Object.keys(data).map((section) => {
        if (section.includes(this.sectionsToShow) && this.sectionsToShow !== '') {
          sumCount = data[section].fault ? data[section].fault + sumCount : sumCount;
          serious = data[section].serious ? !!data[section].serious : serious;
          dangerous = data[section].dangerous ? !!data[section].dangerous : dangerous;
        }
      });

      this.serious = serious;
      this.dangerous = dangerous;
      this.faultCount = sumCount;
    });
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
  }
}
