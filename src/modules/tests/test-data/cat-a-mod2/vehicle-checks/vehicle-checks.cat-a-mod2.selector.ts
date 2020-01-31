import { SafetyAndBalanceQuestions } from '@dvsa/mes-test-schema/categories/AM2';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { createFeatureSelector } from '@ngrx/store';
import { some } from 'lodash';

export const getSelectedSafetyQuestions = (
  safetyAndBalanceQuestions: SafetyAndBalanceQuestions,
): QuestionResult[] => {
  return safetyAndBalanceQuestions.safetyQuestions;
};

export const getSelectedBalanceQuestions = (
  safetyAndBalanceQuestions: SafetyAndBalanceQuestions,
): QuestionResult[] => {
  return safetyAndBalanceQuestions.balanceQuestions;
};

export const safetyAndBalanceQuestionsExist = (safetyAndBalanceQuestions: SafetyAndBalanceQuestions): boolean => {
  const questions = [...safetyAndBalanceQuestions.safetyQuestions, ... safetyAndBalanceQuestions.balanceQuestions];
  return some(questions, fault => fault.outcome != null);
};

export const getSafetyAndBalanceQuestions =
  createFeatureSelector<SafetyAndBalanceQuestions>('safetyAndBalanceQuestions');
