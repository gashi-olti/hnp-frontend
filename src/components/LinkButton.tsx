/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Link from 'next/link';
import { Button, ButtonProps } from '@mui/material';
import { CSSInterpolation } from '@emotion/css';

type Props = {
  href: string;
  className?: string;
  css?: CSSInterpolation;
} & ButtonProps;

export default function LinkButton({
  href,
  children,
  className,
  css,
  ...props
}: React.PropsWithChildren<Props>) {
  return (
    <Link href={href} passHref>
      <Button {...(props as any)} component="a" css={css} className={className}>
        {children}
      </Button>
    </Link>
  );
}
