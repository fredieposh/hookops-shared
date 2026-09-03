import { Type, type Static, type TSchema } from '@sinclair/typebox';

export const SCHEMA_VERSION_PATTERN = String.raw`^(0|[1-9]\d*)\.(0|[1-9]\d*)$`;
const UTC_TIMESTAMP_PATTERN = String.raw`^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$`;

const envelopeFields = {
  schemaVersion: Type.String({ pattern: SCHEMA_VERSION_PATTERN }),
  messageId: Type.String({ minLength: 1, maxLength: 128 }),
  correlationId: Type.String({ minLength: 1, maxLength: 128 }),
  occurredAt: Type.String({ pattern: UTC_TIMESTAMP_PATTERN }),
};

export const createEnvelopeSchema = <TPayload extends TSchema>(payload: TPayload) =>
  Type.Object(
    {
      ...envelopeFields,
      payload,
    },
    {
      additionalProperties: true,
    },
  );

export const EnvelopeSchema = createEnvelopeSchema(Type.Unknown());

export type Envelope = Static<typeof EnvelopeSchema>;
