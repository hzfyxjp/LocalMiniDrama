const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  isXx1Sd25FixedDurationModel,
  normalizeXx1VideoDuration,
} = require('../src/services/videoClient');

describe('video-sd25-30s-xx1 duration', () => {
  it('detects the fixed 5/30s model', () => {
    assert.equal(isXx1Sd25FixedDurationModel('video-sd25-30s-xx1'), true);
    assert.equal(isXx1Sd25FixedDurationModel('video-sd25-480p-xx1'), false);
    assert.equal(isXx1Sd25FixedDurationModel('sd2-pro-xx1'), false);
  });

  it('snaps duration to 5 or 30 only', () => {
    assert.equal(normalizeXx1VideoDuration('video-sd25-30s-xx1', 4), 5);
    assert.equal(normalizeXx1VideoDuration('video-sd25-30s-xx1', 5), 5);
    assert.equal(normalizeXx1VideoDuration('video-sd25-30s-xx1', 10), 5);
    assert.equal(normalizeXx1VideoDuration('video-sd25-30s-xx1', 12), 30);
    assert.equal(normalizeXx1VideoDuration('video-sd25-30s-xx1', 15), 30);
    assert.equal(normalizeXx1VideoDuration('video-sd25-30s-xx1', 30), 30);
  });

  it('does not clamp other xx1 video models', () => {
    assert.equal(normalizeXx1VideoDuration('video-sd25-480p-xx1', 10), 10);
    assert.equal(normalizeXx1VideoDuration('sd2-pro-xx1', 8), 8);
  });
});
