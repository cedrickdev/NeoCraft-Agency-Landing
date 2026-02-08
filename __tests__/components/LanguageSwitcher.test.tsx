import LanguageSwitcher from '@/components/LanguageSwitcher';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock pour usePathname
vi.mock('next/navigation', () => ({
  usePathname: () => '/fr/about',
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'fr',
}));

vi.mock('@/i18n', () => ({
  locales: ['fr', 'en'],
}));

// Mock sessionStorage
const mockSessionStorage: Record<string, string> = {};
Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: vi.fn((key: string) => mockSessionStorage[key] || null),
    setItem: vi.fn((key: string, value: string) => { mockSessionStorage[key] = value; }),
    removeItem: vi.fn((key: string) => { delete mockSessionStorage[key]; }),
  },
  writable: true,
});

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { href: '/fr/about', scrollY: 0 },
      writable: true,
    });
  });

  it('renders language options', () => {
    render(<LanguageSwitcher />);
    
    expect(screen.getByText('FR')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('highlights current locale', () => {
    render(<LanguageSwitcher />);
    
    const frButton = screen.getByText('FR');
    expect(frButton).toHaveClass('text-primary');
  });

  it('changes language when clicking on another locale', () => {
    render(<LanguageSwitcher />);
    
    const enButton = screen.getByText('EN');
    fireEvent.click(enButton);
    
    // The component uses window.location.href for full navigation
    expect(window.location.href).toBe('/en/about');
  });

  it('does not navigate when clicking current locale', () => {
    // Set initial href
    window.location.href = '/fr/about';
    
    render(<LanguageSwitcher />);
    
    const frButton = screen.getByText('FR');
    fireEvent.click(frButton);
    
    // Should stay on the same page
    expect(window.location.href).toBe('/fr/about');
  });
});
