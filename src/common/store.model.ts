import { JournalModel } from '../pages/journal/journal.model';
import { AppInfoModel } from '../modules/app-info/app-info.model';
import { AirwatchConfigStateModel } from '../modules/airwatch-config/airwatch-config.model';

export type StoreModel = {
  journal: JournalModel,
  appInfo: AppInfoModel,
  airwatchConfig: AirwatchConfigStateModel,
};
