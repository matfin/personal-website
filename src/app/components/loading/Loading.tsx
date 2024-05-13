import React from 'react';

import { Container, LoadingSpinner } from './Loading.css';

export interface Props {
  className?: string;
}

const Loading = ({ className }: Props): React.ReactNode => (
  <Container className={className}>
    <LoadingSpinner />
  </Container>
);

export default Loading;
