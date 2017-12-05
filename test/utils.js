const { assert } = require('chai');
const { unicodeLength } = require('../lib/utils');

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
});
