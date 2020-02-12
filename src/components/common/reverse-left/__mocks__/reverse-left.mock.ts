import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { OnInit } from '@angular/core';
import { DeselectReverseLeftManoeuvre }
 from '../../../../modules/tests/test-data/cat-be/manoeuvres/manoeuvres.cat-be.actions';
import { DeselectReverseLeftManoeuvreCatC }
 from '../../../../modules/tests/test-data/cat-c/manoeuvres/manoeuvres.cat-c.actions';
import { DeselectReverseLeftManoeuvreCatD }
 from '../../../../modules/tests/test-data/cat-d/manoeuvres/manoeuvres.cat-d.actions';

export interface ReverseLeftMockData {
  deselectReverseLeftManoeuvre;
}

export class ReverseLeftMock implements OnInit {
  mockData: Map<TestCategory, ReverseLeftMockData>;

  public getMockData(): Map<TestCategory, ReverseLeftMockData> {
    return this.mockData;
  }

  ngOnInit(): void {
    this.mockData = new Map([
      [TestCategory.BE, { deselectReverseLeftManoeuvre: new DeselectReverseLeftManoeuvre() }],
      [TestCategory.C, { deselectReverseLeftManoeuvre: new DeselectReverseLeftManoeuvreCatC() }],
      [TestCategory.C1, { deselectReverseLeftManoeuvre: new DeselectReverseLeftManoeuvreCatC() }],
      [TestCategory.CE, { deselectReverseLeftManoeuvre: new DeselectReverseLeftManoeuvreCatC() }],
      [TestCategory.C1E, { deselectReverseLeftManoeuvre: new DeselectReverseLeftManoeuvreCatC() }],
      [TestCategory.D, { deselectReverseLeftManoeuvre: new DeselectReverseLeftManoeuvreCatD() }],
      [TestCategory.D1, { deselectReverseLeftManoeuvre: new DeselectReverseLeftManoeuvreCatD() }],
      [TestCategory.DE, { deselectReverseLeftManoeuvre: new DeselectReverseLeftManoeuvreCatD() }],
      [TestCategory.D1E, { deselectReverseLeftManoeuvre: new DeselectReverseLeftManoeuvreCatD() }],
    ]);
  }

}
