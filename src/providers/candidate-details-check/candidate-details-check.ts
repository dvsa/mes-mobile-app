import { Injectable } from '@angular/core';

@Injectable()
export class CandidateDetailsCheckProvider {

  private viewedSlotIds: number[] = [];

  candidateDetailsViewed(slotId: number) {
    if (!this.viewedSlotIds.includes(slotId)) {
      this.viewedSlotIds.push(slotId);
    }
  }

  isCandidateDetailsSeen(slotId: number): boolean {
    return this.viewedSlotIds.includes(slotId);
  }

}
