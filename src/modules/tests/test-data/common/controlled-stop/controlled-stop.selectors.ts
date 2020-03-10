import { ControlledStopUnion } from './controlled-stop.reducer';
import { ControlledStop } from '@dvsa/mes-test-schema/categories/G/partial';
import { get } from 'lodash';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';

export const isControlledStopSelected =
  (data: ControlledStopUnion): boolean => get(data, 'selected');

export const getControlledStopFault =
  (data: ControlledStop): CompetencyOutcome => get(data , 'fault') as CompetencyOutcome;
