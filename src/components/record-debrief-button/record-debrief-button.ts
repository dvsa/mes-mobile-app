import { Component, Input } from '@angular/core';

@Component({
  selector: 'record-debrief-button',
  templateUrl: 'record-debrief-button.html'
})
export class RecordDebriefButtonComponent {
  @Input() isRecording: boolean;
  @Input() isPausedRecording: boolean;
  @Input() activeFile: any;
  constructor() {}
}
