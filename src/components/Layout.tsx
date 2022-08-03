import * as React from 'react';
import { Container } from '@mui/material';

import MetaHead from '@/components/MetaHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PageMetaProps } from '@/config/pages';

type Props = {
  children: NonNullable<React.ReactNode>;
  meta?: PageMetaProps;
  spacing?: number;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
};

export default function Layout({ children, meta, maxWidth = 'lg' }: Props) {
  return (
    <div tw="flex flex-col h-screen">
      <MetaHead meta={meta} />
      <Header />
      <Container disableGutters tw="flex-grow" maxWidth={maxWidth}>
        {children}
      </Container>
      <Footer />
    </div>
  );
}
