export type FieldValidators = {
  pattern: RegExp;
  maxLength: string;
};

// Used for when you want to replace all parts of input except numbers 0-9
export const nonNumericValues: RegExp = /[^0-9]/g;

// Used for when you want to replace all parts of input except numbers 0-9 and alpha A-Z
export const nonAlphaNumericValues: RegExp = /[^A-Z0-9]/gi;

export const getRegistrationNumberValidator = (): FieldValidators => {
  return {
    pattern: /^[A-Z0-9]{1,7}$/gi,
    maxLength: '7',
  };
};

export const getInstructorRegistrationNumberValidator = (): FieldValidators => {
  return {
    pattern: /^[0-9]{1,7}$/gi,
    maxLength: '7',
  };
};
