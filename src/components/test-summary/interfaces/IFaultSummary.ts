import { IFault } from './IFault';
import { FaultTitle } from '../enums/FaultTitle';

export interface IFaultSummary {
  title: FaultTitle;
  total: number;
  faults: IFault[];
}
