/* eslint no-control-regex: "off" */
import { unicodeLength } from './utils';

const REGEX_EMAIL = /^((([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
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
export const isPassword = (value) => (
  isLength(value, 8) &&
  isRegex(value, REGEX_LOWERCASE) &&
  isRegex(value, REGEX_UPPERCASE) &&
  isRegex(value, REGEX_NUMBERS) &&
  isRegex(value, REGEX_SPECIAL)
);
