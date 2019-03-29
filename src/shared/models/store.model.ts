import { JournalModel } from '../../pages/journal/journal.model';
import { AppInfoModel } from '../../modules/app-info/app-info.model';
import { LogsModel } from '../../modules/logs/logs.model';
import { TestsModel } from '../../modules/tests/tests.reducer';
import { WaitingRoomToCarModel } from '../../pages/waiting-room-to-car/waiting-room-to-car.reducer';

export type StoreModel = {
  journal: JournalModel,
  appInfo: AppInfoModel,
  logs: LogsModel,
  tests: TestsModel;
  waitingRoomToCar: WaitingRoomToCarModel,
};
