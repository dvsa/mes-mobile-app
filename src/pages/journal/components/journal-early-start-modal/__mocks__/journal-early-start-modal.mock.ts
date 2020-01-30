import { SlotDetail } from '@dvsa/mes-journal-schema';
import { DateTime, Duration } from '../../../../../shared/helpers/date-time';

export class JournalEarlyStartModalMock {
  public mockSlotDetail(): SlotDetail {
    return {
      duration: 57,
      slotId: 123,
      start: new DateTime().add(6, Duration.MINUTE).toString(),
    };
  }
}
