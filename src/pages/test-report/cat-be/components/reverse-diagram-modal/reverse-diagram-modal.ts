import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TestCategory } from '../../../../../shared/models/test-category';

interface ReverseDiagramPageState {
  length: number;
  width: number;
}

@IonicPage()
@Component({
  selector: 'reverse-diagram-modal',
  templateUrl: 'reverse-diagram-modal.html',
})
export class ReverseDiagramCatBEPage {
  pageState: ReverseDiagramPageState;
  testCategory = TestCategory.BE;

  handleDoneButtonClick(): void {}
}
