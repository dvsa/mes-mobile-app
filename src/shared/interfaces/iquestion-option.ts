export interface IQuestionOption {
  id: string;
  question: string;
  keyWords: string;
  today: number;
  last7days: number;
  isExpanded: boolean;
}
