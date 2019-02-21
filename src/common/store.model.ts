import { JournalModel } from '../pages/journal/journal.model';
import { AppInfoModel } from '../modules/app-info/app-info.model';

export type StoreModel = {
  journal: JournalModel,
  appInfo: AppInfoModel,
};
