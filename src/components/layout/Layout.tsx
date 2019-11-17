import React from 'react';
import { Header } from './Header';
import { Container } from 'semantic-ui-react';

interface LayoutProps {
  children: JSX.Element;
}

export const Layout = (props: LayoutProps) => {
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
};
