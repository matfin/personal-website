import React from 'react';
import loadingSpinner from 'svg/loadingSpinner';
import { LoadingSpinnerSt, LoadingSt } from './Loading.css';

export interface Props {
  className?: string;
}

const Loading = ({ className }: Props): JSX.Element => (
  <LoadingSt className={className}>
    <LoadingSpinnerSt src={loadingSpinner} />
  </LoadingSt>
);

export default Loading;
