/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Link from 'next/link';
import { CSSInterpolation } from '@emotion/css';

type Props = {
  href: string;
  target?: string;
  active?: boolean;
  className?: string;
  css?: CSSInterpolation;
};

export default function CustomLink({ children, ...allProps }: React.PropsWithChildren<Props>) {
  const { active, ...props } = allProps;
  const { href } = props;
  const internal = href && (href.startsWith('/') ?? href.startsWith('#'));

  if (internal) {
    return (
      <Link href={href} passHref>
        <a {...props}>{children}</a>
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noreferrer noopener" {...props}>
      {children}
    </a>
  );
}
