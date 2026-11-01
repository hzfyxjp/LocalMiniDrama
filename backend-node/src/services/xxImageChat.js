/**
 * xx-image 文本（gpt-5.6-terra 等）：OpenAI Chat Completions，但官方示例是
 * stream:false + enable_thinking:false，不能走项目默认的强制流式。
 */

function isXxImageTextConfig(config = {}, modelHint) {
  const provider = String(config.provider || '').trim().toLowerCase();
  if (provider === 'xx_image') return true;

  const model = String(
    modelHint ||
    config.default_model ||
    (Array.isArray(config.model) ? config.model[0] : config.model) ||
    ''
  ).trim().toLowerCase();
  if (model === 'gpt-5.6-terra' || /gpt-5\.6-terra/.test(model)) return true;

  const base = String(config.base_url || '').trim().toLowerCase();
  return base.includes('opc-wenzhou') || /(?:^|\.)xx-image\.com(?:[:/]|$)/.test(base);
}

function flattenMessageContent(content) {
  if (content == null) return '';
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.map((part) => {
      if (typeof part === 'string') return part;
      if (part && typeof part.text === 'string') return part.text;
      return '';
    }).join('');
  }
  return '';
}

function extractChatMessageText(payload) {
  if (!payload || typeof payload !== 'object') return '';
  const message = payload.choices?.[0]?.message || payload.choices?.[0]?.delta || {};
  return (
    flattenMessageContent(message.content) ||
    flattenMessageContent(message.reasoning_content) ||
    flattenMessageContent(payload.content) ||
    ''
  ).trim();
}

function buildXxImageChatBody({ model, messages, temperature, maxTokens, jsonMode }) {
  const body = {
    model: model || '',
    messages: Array.isArray(messages) ? messages : [],
    stream: false,
    temperature: temperature == null ? 0.7 : Number(temperature),
    top_p: 1.0,
    frequency_penalty: 0.0,
    enable_thinking: false,
    web_search: false,
  };
  if (maxTokens != null && Number(maxTokens) > 0) {
    body.max_tokens = Number(maxTokens);
  }
  if (jsonMode) {
    body.response_format = { type: 'json_object' };
  }
  return body;
}

module.exports = {
  isXxImageTextConfig,
  extractChatMessageText,
  flattenMessageContent,
  buildXxImageChatBody,
};
