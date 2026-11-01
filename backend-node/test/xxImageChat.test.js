const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  isXxImageTextConfig,
  extractChatMessageText,
  buildXxImageChatBody,
} = require('../src/services/xxImageChat');

describe('xx-image chat', () => {
  it('detects xx_image provider, terra model, and opc-wenzhou host', () => {
    assert.equal(isXxImageTextConfig({ provider: 'xx_image' }, 'gpt-4o'), true);
    assert.equal(isXxImageTextConfig({ provider: 'openai' }, 'gpt-5.6-terra'), true);
    assert.equal(isXxImageTextConfig({ provider: 'openai', base_url: 'https://api.opc-wenzhou.com/api/v1' }, 'gpt-4o'), true);
    assert.equal(isXxImageTextConfig({ provider: 'openai' }, 'gpt-4o'), false);
  });

  it('builds the documented non-stream body', () => {
    const body = buildXxImageChatBody({
      model: 'gpt-5.6-terra',
      messages: [{ role: 'user', content: '你好' }],
      temperature: 0.7,
    });
    assert.equal(body.stream, false);
    assert.equal(body.enable_thinking, false);
    assert.equal(body.web_search, false);
    assert.equal(body.top_p, 1.0);
    assert.equal(body.frequency_penalty, 0.0);
    assert.equal(body.max_tokens, undefined);
    assert.equal(body['messages[].role'], undefined);
  });

  it('reads standard OpenAI message.content', () => {
    const text = extractChatMessageText({
      id: 'chatcmpl-xxx',
      choices: [{ message: { role: 'assistant', content: '你好！' } }],
      usage: { prompt_tokens: 12, completion_tokens: 8, total_tokens: 20 },
    });
    assert.equal(text, '你好！');
  });
});
