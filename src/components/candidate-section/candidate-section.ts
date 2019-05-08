import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'candidate-section',
  templateUrl: 'candidate-section.html',
})
export class CandidateSectionComponent {

  @Input()
  candidateName: string;

  @Input()
  candidateDriverNumber: string;

  @Output()
  continueClickEvent = new EventEmitter<boolean>();

  proceed(): void {
    this.continueClickEvent.emit(true);
  }
}
