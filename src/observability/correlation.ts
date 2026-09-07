import { randomUUID } from 'node:crypto';

export const CORRELATION_ID_MAX_LENGTH = 128;
export const CORRELATION_ID_PATTERN = '^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$';

const correlationIdRegex = new RegExp(CORRELATION_ID_PATTERN);

export function isValidCorrelationId(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length <= CORRELATION_ID_MAX_LENGTH &&
    correlationIdRegex.test(value)
  );
}

export function generateCorrelationId(): string {
  return randomUUID();
}

export function resolveCorrelationId(value: unknown): string {
  return isValidCorrelationId(value) ? value : generateCorrelationId();
}
