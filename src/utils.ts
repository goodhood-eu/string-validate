import punycode from 'punycode';

export const unicodeLength = (string?: string | unknown): number => {
  if (!string || typeof string !== 'string') return 0;
  return punycode.ucs2.decode(string).length;
};

export const timeToInt = (time: string): number => parseInt(time.replace(':', ''), 10);
