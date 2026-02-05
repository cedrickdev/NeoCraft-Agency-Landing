// components/IntlLink.tsx
// @ts-expect-error - next-intl Link types may not match exactly
import { Link } from 'next-intl';
import { ComponentProps } from 'react';

export default function IntlLink({ href, ...rest }: ComponentProps<typeof Link>) {
    return <Link href={href} {...rest} />;
}