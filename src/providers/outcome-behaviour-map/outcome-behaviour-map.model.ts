export interface FieldDetail {
  display: string;
  defaultValue?: string;
  showNotApplicable?: boolean;
}
export interface Field {
  [k: string]: FieldDetail;
}

export interface OutcomeBehaviourMapping {
  [k: string]: Field;
}
