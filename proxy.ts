// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { defaultLocale, locales } from './i18n';

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // Ignorer les assets et les API
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.')
    ) {
        return;
    }
    
    // Vérifier si le chemin est exactement /en ou /fr (sans slash à la fin)
    if (locales.some(locale => pathname === `/${locale}`)) {
        return NextResponse.rewrite(
            new URL(`${pathname}/`, request.url)
        );
    }
    
    // Vérifier si le chemin a déjà une locale
    const pathnameIsMissingLocale = locales.every(
        locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );
    
    // Si la locale manque, rediriger vers la locale par défaut
    if (pathnameIsMissingLocale) {
        // Construire l'URL avec la locale par défaut
        const newURL = new URL(
            pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`,
            request.url
        );
        
        return NextResponse.redirect(newURL);
    }
    
    return NextResponse.next();
}

// Définir explicitement les chemins que le middleware doit traiter
export const config = {
    matcher: ['/((?!_next|api|.*\\..*).*)'],
};
