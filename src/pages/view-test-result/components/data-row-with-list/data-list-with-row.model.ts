export type DataRowListItem = {
  label: string,
  checked: boolean,
};

export enum TestRequirementsLabels {
  normalStart1 = 'Normal start (NS)',
  normalStart2 = 'Normal start (NS)',
  angledStart = 'Angled start (AS)',
  hillStart = 'Hill Start (HS) / Designated Start (DS)',
}

export enum ViewTestResultLabels {
  completed = 'Completed',
  notCompleted = 'Not completed',
  control = 'Control',
  planning = 'Planning',
}
