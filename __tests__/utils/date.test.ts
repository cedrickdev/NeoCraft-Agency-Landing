import { formatFullDate } from '@/lib/date';
import { describe, expect, it } from 'vitest';

describe('formatFullDate', () => {
  it('formats date correctly in French', () => {
    const date = new Date('2024-12-25');
    const formatted = formatFullDate(date);
    
    // Le format est "dd MMM yyyy" en français
    expect(formatted).toBeTruthy();
    expect(typeof formatted).toBe('string');
    expect(formatted).toContain('25');
    expect(formatted).toContain('2024');
  });

  it('handles different dates', () => {
    const date = new Date('2024-01-15');
    const formatted = formatFullDate(date);
    
    expect(formatted).toContain('15');
    expect(formatted).toContain('2024');
  });

  it('returns consistent format', () => {
    const date = new Date('2024-06-01');
    const formatted = formatFullDate(date);
    
    // Should match pattern like "01 juin 2024"
    expect(formatted).toMatch(/^\d{2}\s+\w+\s+\d{4}$/);
  });
});
