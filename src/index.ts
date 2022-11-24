import { unicodeLength, timeToInt } from './utils';

const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_INT = /^\d+$/;
const REGEX_FLOAT = /^\d+(\.\d+)?$/;
const REGEX_PHONE = /^(?=.{2,50}$)[/\-.()+\s\d–]*\d{2,}[/\-.()+\s\d–]*$/;
const REGEX_URL = /^(?:https?:\/\/)?((?:[^\u0000-\u007F]|[\w-])+\.(?:(?:[^\u0000-\u007F]|[\w-]){2,}\.)*(?:[^\u0000-\u007F]|[a-zA-Z])+)(?::\d+)?(\/(?:(?:[^\u0000-\u007F]|[\w/.,'"@+=!:;=%()-])+)?(?:\.(?:[^\u0000-\u007F]|[\w-])+)?)?((?:\?|#)\S+)?$/;

const REGEX_LOWERCASE = /[a-z]+/;
const REGEX_UPPERCASE = /[A-Z]+/;
const REGEX_NUMBERS = /\d+/;
const REGEX_SPECIAL = /[^A-Za-z\d]+/;
const REGEX_TIME = /^\d{2}:\d{2}$/;

export const isEmpty = (value?: any): boolean => typeof value === 'undefined' || value === null;

export const isRequired = (value?: any): boolean => {
  if (isEmpty(value)) return false;
  if (Array.isArray(value)) return value.length !== 0;

  switch (typeof (value)) {
    case 'string': return unicodeLength(value) !== 0;
    case 'object': return JSON.stringify(value) !== '{}';
    case 'boolean': return value;
    case 'number': return true;
    default: return Boolean(value);
  }
};

export const isLength = (value = '', min = 0, max = Infinity): boolean => {
  if (isEmpty(value)) return false;
  const length = Array.isArray(value) ? value.length : unicodeLength(value);
  return (max >= length) && (length >= min);
};

export const isRegex = (value: string, regex: RegExp): boolean => regex.test(value);
export const isEmail = (value: string): boolean => isRegex(value, REGEX_EMAIL);
export const isMostLikelyEmail = (value: string): boolean => Boolean(
  value && value.includes('.') && value.includes('@') && isLength(value, 7),
);
export const isPhone = (value: string): boolean => isRegex(value, REGEX_PHONE);
export const isUrl = (value: string): boolean => isRegex(value, REGEX_URL);
export const isInt = (value: string): boolean => isRegex(value, REGEX_INT);
export const isNumber = (value: string): boolean => isRegex(value, REGEX_FLOAT);
export const isEqual = (value: string, prop: string): boolean => (value === prop);
export const isOneOf = (
  value: (string | number),
  ...props: (string | number)[]
): boolean => props.includes(value);

// Common enough to be share-worthy
export const isShortText = (value: string): boolean => isLength(value, 2, 250);
export const isLongText = (value: string): boolean => isLength(value, 2, 5000);

export const hasPasswordLength = (value: string): boolean => isLength(value, 8);
export const hasLowerCase = (value: string): boolean => isRegex(value, REGEX_LOWERCASE);
export const hasUpperCase = (value: string): boolean => isRegex(value, REGEX_UPPERCASE);
export const hasNumbers = (value: string): boolean => isRegex(value, REGEX_NUMBERS);
export const hasSpecialCharacters = (value: string): boolean => isRegex(value, REGEX_SPECIAL);
export const isPassword = (value: string): boolean => (
  [
    hasPasswordLength,
    hasLowerCase,
    hasUpperCase,
    hasNumbers,
    hasSpecialCharacters,
  ].every((fn) => fn(value))
);

export const isTime = (value: string, min = '00:00', max = '23:59'): boolean => {
  if (!isRegex(value, REGEX_TIME)) return false;

  const valueInt = timeToInt(value);
  return valueInt >= timeToInt(min) && valueInt <= timeToInt(max);
};
