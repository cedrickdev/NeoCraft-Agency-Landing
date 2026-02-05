import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock pour useRouter
const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => '/fr/about',
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'fr',
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
    
    expect(mockReplace).toHaveBeenCalledWith('/en/about', { scroll: false });
  });

  it('does not navigate when clicking current locale', () => {
    render(<LanguageSwitcher />);
    
    const frButton = screen.getByText('FR');
    fireEvent.click(frButton);
    
    expect(mockReplace).not.toHaveBeenCalled();
  });
});

// Export default pour éviter l'erreur d'import
export default function LanguageSwitcherExport() {
  return <LanguageSwitcher />;
}
