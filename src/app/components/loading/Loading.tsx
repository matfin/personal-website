import React from 'react';
import { LoadingSpinnerSt, LoadingSt } from './Loading.css';

export interface Props {
  className?: string;
}

const Loading = ({ className }: Props): JSX.Element => (
  <LoadingSt className={className}>
    <LoadingSpinnerSt />
  </LoadingSt>
);

export default Loading;
