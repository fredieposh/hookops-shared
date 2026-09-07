export {
  COMPATIBILITY_ERROR_CODES,
  SUPPORTED_SCHEMA_MAJOR,
  CURRENT_SCHEMA_VERSION,
  checkSchemaCompatibility,
  parseSchemaVersion,
} from './contracts/compatibility.js';

export type { CompatibilityResult, ParsedSchemaVersion } from './contracts/compatibility.js';

export {
  createEnvelopeSchema,
  EnvelopeSchema,
  QueueEnvelopeSchema,
  TelemetryEnvelopeSchema,
} from './contracts/envelope.js';

export { type Envelope, type QueueEnvelope, type TelemetryEnvelope } from './contracts/envelope.js';

export {
  CORRELATION_ID_MAX_LENGTH,
  CORRELATION_ID_PATTERN,
  isValidCorrelationId,
  generateCorrelationId,
  resolveCorrelationId,
} from './observability/correlation.js';

export { PINO_REDACTION_CENSOR, createPinoRedactionPaths } from './observability/redaction.js';
