export type FieldValidators = {
  pattern: RegExp;
  maxLength: string;
};

export const getRegistrationNumberValidator = (): FieldValidators => {
  return {
    pattern: /^[A-Z0-9]{1,7}$/gi,
    maxLength: '7',
  };
};
