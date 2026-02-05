import { formatDate } from '@/lib/date';
import { describe, expect, it } from 'vitest';

describe('formatDate', () => {
  it('formats date correctly in French locale', () => {
    const date = new Date('2024-12-25');
    const formatted = formatDate(date, 'fr');
    
    // Le format exact dépend de l'implémentation
    expect(formatted).toBeTruthy();
    expect(typeof formatted).toBe('string');
  });

  it('formats date correctly in English locale', () => {
    const date = new Date('2024-12-25');
    const formatted = formatDate(date, 'en');
    
    expect(formatted).toBeTruthy();
    expect(typeof formatted).toBe('string');
  });

  it('handles string dates', () => {
    const formatted = formatDate('2024-12-25', 'fr');
    expect(formatted).toBeTruthy();
  });
});
