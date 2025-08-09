// components/IntlLink.tsx
// @ts-ignore
import { Link } from 'next-intl';
import { ComponentProps } from 'react';

export default function IntlLink({ href, ...rest }: ComponentProps<typeof Link>) {
    return <Link href={href} {...rest} />;
}