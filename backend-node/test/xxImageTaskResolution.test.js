const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { pickOpenAIImageTaskResolution } = require('../src/services/imageClient');

describe('xx-image openai_image_tasks resolution', () => {
  it('does not send OpenAI quality=standard as resolution', () => {
    assert.equal(pickOpenAIImageTaskResolution({}, 'gpt-image-2-xx1'), '');
    assert.equal(pickOpenAIImageTaskResolution({ image_resolution: 'standard' }, 'gpt-image-2-xx1'), '');
    assert.equal(pickOpenAIImageTaskResolution({ resolution: 'hd' }, 'gpt-image-2-xx1'), '');
  });

  it('converts 4k models to resolution 4k', () => {
    assert.equal(pickOpenAIImageTaskResolution({}, 'gpt-image-2-4k-xx1'), '4k');
    assert.equal(pickOpenAIImageTaskResolution({ image_resolution: 'standard' }, 'gpt-image-2-4k-xx1'), '4k');
  });

  it('keeps explicit channel resolution such as 4k', () => {
    assert.equal(pickOpenAIImageTaskResolution({ image_resolution: '4k' }, 'gpt-image-2-xx1'), '4k');
    assert.equal(pickOpenAIImageTaskResolution({ resolution: '2K' }, 'gpt-image-2-4k-xx1'), '2K');
  });
});
