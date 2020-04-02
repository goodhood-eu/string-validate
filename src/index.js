/* eslint no-control-regex: "off" */
import { unicodeLength } from './utils';

const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_INT = /^\d+$/;
const REGEX_FLOAT = /^\d+(\.\d+)?$/;
const REGEX_PHONE = /^(?=.{2,50}$)[/\-.()+\s\d–]*\d{2,}[/\-.()+\s\d–]*$/;

const REGEX_LOWERCASE = /[a-z]/;
const REGEX_UPPERCASE = /[A-Z]/;
const REGEX_NUMBERS = /\d/;
const REGEX_SPECIAL = /[^A-Za-z\d]/;

export const isRequired = (value) => {
  if (typeof value === 'undefined' || value === null) return false;
  if (Array.isArray(value)) return value.length !== 0;

  switch (typeof (value)) {
    case 'string': return unicodeLength(value) !== 0;
    case 'object': return JSON.stringify(value) !== '{}';
    case 'boolean': return value;
    case 'number': return true;
    default: return Boolean(value);
  }
};

export const isLength = (value = '', min = 0, max = Infinity) => {
  if (typeof value === 'undefined' || value === null) return false;
  const length = Array.isArray(value) ? value.length : unicodeLength(value);
  return (max >= length) && (length >= min);
};

export const isRegex = (value, regex) => regex.test(value);
export const isEmail = (value) => isRegex(value, REGEX_EMAIL);
export const isPhone = (value) => isRegex(value, REGEX_PHONE);
export const isInt = (value) => isRegex(value, REGEX_INT);
export const isNumber = (value) => isRegex(value, REGEX_FLOAT);
export const isEqual = (value, prop) => (value === prop);
export const isOneOf = (value, ...props) => props.includes(value);

// Common enough to be share-worthy
export const isShortText = (value) => isLength(value, 2, 250);
export const isLongText = (value) => isLength(value, 2, 5000);

export const isPasswordLength = (value) => isLength(value, 8);
export const isWithLowerCase = (value) => isRegex(value, REGEX_LOWERCASE);
export const isWithUpperCase = (value) => isRegex(value, REGEX_UPPERCASE);
export const isWithNumbers = (value) => isRegex(value, REGEX_NUMBERS);
export const isWithSpecialCharacters = (value) => isRegex(value, REGEX_SPECIAL);
export const isPassword = (value) => (
  [
    isPasswordLength,
    isWithLowerCase,
    isWithUpperCase,
    isWithNumbers,
    isWithSpecialCharacters,
  ].every((fn) => fn(value))
);
