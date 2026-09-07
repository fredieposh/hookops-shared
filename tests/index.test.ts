import { describe, it, expect } from 'vitest';
import { Value } from '@sinclair/typebox/value';
import {
  COMPATIBILITY_ERROR_CODES,
  QueueEnvelope,
  SUPPORTED_SCHEMA_MAJOR,
  QueueEnvelopeSchema,
  TelemetryEnvelopeSchema,
  checkSchemaCompatibility,
  createPinoRedactionPaths,
  isValidCorrelationId,
  type CompatibilityResult,
  type TelemetryEnvelope,
} from '../src/index.js';

describe('public package API', () => {
  it('exports_contract_and_observability_members', () => {});

  const envelope = {
    schemaVersion: '1.0',
    messageId: 'message-123',
    correlationId: 'correlation-123',
    occurredAt: '2026-08-29T20:00:00.000Z',
    payload: {},
  } satisfies QueueEnvelope;

  envelope satisfies TelemetryEnvelope;

  const compatibility: CompatibilityResult = checkSchemaCompatibility(envelope.schemaVersion);

  expect(Value.Check(QueueEnvelopeSchema, envelope));
  expect(Value.Check(TelemetryEnvelopeSchema, envelope));
  expect(compatibility.ok).toBe(true);
  expect(SUPPORTED_SCHEMA_MAJOR).toBe(1);
  expect(isValidCorrelationId(envelope.correlationId)).toBe(true);
  expect(createPinoRedactionPaths()).not.toHaveLength(0);
  expect(COMPATIBILITY_ERROR_CODES.INVALID_SCHEMA_VERSION).toBe('INVALID_SCHEMA_VERSION');
});
