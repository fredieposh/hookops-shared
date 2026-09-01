import { Type, type Static } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { describe, it, expect } from 'vitest';

import { createEnvelopeSchema } from './envelope.js';

describe('envelope contracts', () => {
  it('accepts supported major', () => {
    const schema = createEnvelopeSchema(
      Type.Object({
        kind: Type.Literal('test'),
      }),
    );

    const baseEnvelope = {
      schemaVersion: '1.0',
      messageId: 'message-123',
      correlationId: 'correlation-123',
      occurredAt: '2026-08-29T20:00:00.000Z',
      payload: {
        kind: 'test',
      },
    } satisfies Static<typeof schema>;

    const envelope = {
      ...baseEnvelope,
      futureField: 'additive fields remain compatible',
    };

    expect(Value.Check(schema, envelope)).toBe(true);
  });
});
