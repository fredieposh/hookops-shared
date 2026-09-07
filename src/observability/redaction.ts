export const PINO_REDACTION_CENSOR = '[REDACTED]';

const REDACTION_PATHS = [
  'req.headers.authorization',
  'req.headers.cookie',
  'req.headers["x-api-key"]',
  'request.headers.authorization',
  'request.headers.cookie',
  'request.headers["x-api-key"]',
  'headers.authorization',
  'headers.cookie',
  'headers["x-api-key"]',
  'body.token',
  'body.password',
  'body.secret',
  'body.apiKey',
  'body.api_key',
  'req.body.token',
  'req.body.password',
  'req.body.secret',
  'req.body.apiKey',
  'req.body.api_key',
  'payload.token',
  'payload.password',
  'payload.secret',
  'payload.apiKey',
  'payload.api_key',
] as const;

export function createPinoRedactionPaths(): string[] {
  return [...REDACTION_PATHS];
}
