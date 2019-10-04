export interface MessageModel {
  body: string;
  date: Date;
}

export interface MessageTypeModel {
  code: string;
  description: string;
}

export enum MessageType {
  Delayed10 = 'Delayed 10 mins',
  Delayed20 = 'Delayed 20 mins',
  Delayed30 = 'Delayed 30+ mins',
  Backup = 'Backup required',
  Other = 'Other',
}

export enum MessageTypeDescription {
  Delayed10 = 'I will be about 10 minutes late due to traffic.',
  Delayed20 = 'I will be about 20 minutes late due to traffic.',
  Delayed30 = 'I will be at least 30 minutes late due to traffic.',
  Backup = 'I will require assistance on my return to the test centre.',
  Other = '',
}

function populateMessageTypeOptions(): MessageTypeModel[] {
  const codeList = [];
  Object.keys(MessageType).forEach(code => codeList.push({
    code,
    shortMessage: MessageType[code],
    longMessage: MessageTypeDescription[code],
  }));
  return codeList;
}

export let messageTypeOptions: MessageTypeModel[] = populateMessageTypeOptions();
