// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    // Configuration pour les origines autorisées en développement (correctement placée)
    allowedDevOrigins: ['localhost', '127.0.0.1'],
    // Ajoutez cette configuration pour les redirections
    async redirects() {
        return [
            {
                source: '/',
                destination: '/en',
                permanent: true,
            },
        ];
    },
}

export default withNextIntl(nextConfig);