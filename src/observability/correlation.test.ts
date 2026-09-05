import { describe, expect, it } from 'vitest';

import {
  generateCorrelationId,
  isValidCorrelationId,
  resolveCorrelationId,
} from './correlation.js';

describe('correlatein IDs', () => {
  it('accepts_bounded_safe_ids', () => {
    expect(isValidCorrelationId('correlation-123')).toBe(true);
    expect(isValidCorrelationId('trace:123-abc.def')).toBe(true);
  });

  it('rejects_invalid_ids', () => {
    expect(isValidCorrelationId(undefined)).toBe(false);
    expect(isValidCorrelationId('')).toBe(false);
    expect(isValidCorrelationId('contains spaces')).toBe(false);
    expect(isValidCorrelationId('contains\nnewlines')).toBe(false);
    expect(isValidCorrelationId('a'.repeat(129))).toBe(false);
  });

  it('generates_valid_unique_ids', () => {
    const firstCorrelationId = generateCorrelationId();
    const secondCorrelationId = generateCorrelationId();

    expect(isValidCorrelationId(firstCorrelationId)).toBe(true);
    expect(firstCorrelationId).not.toBe(secondCorrelationId);
  });

  it('preserves_valid_ids_and_replaces_invalid_ones', () => {
    expect(resolveCorrelationId('correlation-123')).toBe('correlation-123');
    expect(isValidCorrelationId(resolveCorrelationId('invalid id'))).toBe(true);
  });
});
