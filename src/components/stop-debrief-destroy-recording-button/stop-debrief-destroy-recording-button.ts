import { Component, Input } from '@angular/core';

@Component({
  selector: 'stop-debrief-destroy-recording-button',
  templateUrl: 'stop-debrief-destroy-recording-button.html'
})
export class StopDebriefDestroyRecordingButtonComponent {
  @Input() buttonStatus: string;
  @Input() disabled: boolean;
  @Input() clickEventHandler: () => void;
  constructor() {}
  ionViewWillEnter() {}
  ngOnInit() {}
}
