import { describe, it, expect } from 'vitest';
import { PLACEHOLDER } from '../src/index.js';

describe('hookops-shared', () => {
  it('exports PLACEHOLDER', () => {
    expect(PLACEHOLDER).toBe('hookops-shared');
  });
});
