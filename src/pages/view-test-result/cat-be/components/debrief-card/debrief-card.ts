import { Component, Input } from '@angular/core';
import { DebriefCardModel } from './debrief-card.model';
import { flattenArray } from '../../../view-test-result-helpers';
import {
  DataRowListItem,
  ViewTestResultLabels,
} from '../../../components/data-row-with-list/data-list-with-row.model';

@Component({
  selector: 'debrief-card',
  templateUrl: 'debrief-card.html',
})
export class DebriefCardComponent {

  @Input()
  data: DebriefCardModel;

  constructor() {}

  getFlattenArray = (data: string[]): string => flattenArray(data);

  showNoFaultsMessage = () : boolean =>
    this.data.drivingFaultCount === 0 &&
    this.data.seriousFaults.length === 0 &&
    this.data.dangerousFaults.length === 0

  getTestRequirements = (): DataRowListItem[] => {
    return [
      // TODO - need to update
    ];
  }

  getEco = (): DataRowListItem[] => {
    return [
      {
        label: ViewTestResultLabels.control,
        checked: this.data.ecoControl,
      },
      {
        label: ViewTestResultLabels.planning,
        checked: this.data.ecoPlanning,
      },
    ];
  }

}
