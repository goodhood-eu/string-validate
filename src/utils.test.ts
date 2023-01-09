import { assert } from 'chai';
import { unicodeLength, timeToInt } from './utils';

const UNICODE = '💩';

describe('utils', () => {
  it('unicodeLength', () => {
    const short = '123';
    const complex = UNICODE + short + UNICODE;

    const expectedShort = short.length;
    const expectedComplex = short.length + 2;

    assert.equal(unicodeLength(), 0, 'nothing');
    assert.equal(unicodeLength(UNICODE), 1, 'single emoji length');
    assert.equal(unicodeLength(short), expectedShort, 'simple ascii string');
    assert.equal(unicodeLength(complex), expectedComplex, 'complex unicode string');
  });

  it('timeToInt', () => {
    assert.equal(timeToInt('12:14'), 1214, 'parse hours and minutes');
    assert.equal(timeToInt('01:10'), 110, 'omit prefixed zeros');
    assert.equal(timeToInt('00:01'), 1, 'only minutes');
  });
});
