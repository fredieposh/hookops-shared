import { Type, type Static } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { describe, it, expect } from 'vitest';
import { COMPATIBILITY_ERROR_CODES, checkSchemaCompatibility } from './compatibility.js';

import {
  createEnvelopeSchema,
  QueueEnvelopeSchema,
  TelemetryEnvelopeSchema,
  type QueueEnvelope,
  type TelemetryEnvelope,
} from './envelope.js';

const schema = createEnvelopeSchema(
  Type.Object({
    kind: Type.Literal('test'),
  }),
);

type TestEnvelope = Static<typeof schema>;

const createEnvelope = (overrides: Partial<TestEnvelope> = {}): TestEnvelope => ({
  schemaVersion: '1.0',
  messageId: 'message-123',
  correlationId: 'correlation-123',
  occurredAt: '2026-08-29T20:00:00.000Z',
  payload: {
    kind: 'test',
  },
  ...overrides,
});

describe('envelope contracts', () => {
  it('accepts_supported_major', () => {
    const envelope = createEnvelope();

    expect(Value.Check(schema, envelope)).toBe(true);
    expect(checkSchemaCompatibility(envelope.schemaVersion)).toEqual({
      ok: true,
      version: {
        major: 1,
        minor: 0,
      },
    });
  });

  it('rejects_unsupported_major', () => {
    const result = checkSchemaCompatibility('2.0');
    expect(result).toEqual({
      ok: false,
      error: {
        code: COMPATIBILITY_ERROR_CODES.UNSUPPORTED_SCHEMA_MAJOR,
        supportedMajor: 1,
        receivedMajor: 2,
      },
    });
  });

  it('accepts_additive_minor_fields', () => {
    const envelope = {
      ...createEnvelope({ schemaVersion: '1.1' }),
      futureField: 'added by a newer compatible producer',
    };

    expect(Value.Check(schema, envelope)).toBe(true);
    expect(checkSchemaCompatibility(envelope.schemaVersion).ok).toBe(true);
  });

  it('validates_versioned_queue_envelope', () => {
    const envelope = {
      schemaVersion: '1.0',
      messageId: 'message-123',
      correlationId: 'correlation-123',
      occurredAt: '2026-08-29T20:00:00.000Z',
      payload: {},
    } satisfies QueueEnvelope;

    expect(Value.Check(QueueEnvelopeSchema, envelope)).toBe(true);
    expect(checkSchemaCompatibility(envelope.schemaVersion).ok).toBe(true);
  });

  it('validates_versioned_telemetry_envelope', () => {
    const envelope = {
      schemaVersion: '1.0',
      messageId: 'message-123',
      correlationId: 'correlation-123',
      occurredAt: '2026-08-29T20:00:00.000Z',
      payload: {},
    } satisfies TelemetryEnvelope;

    expect(Value.Check(TelemetryEnvelopeSchema, envelope)).toBe(true);
    expect(checkSchemaCompatibility(envelope.schemaVersion).ok).toBe(true);
  });
});
