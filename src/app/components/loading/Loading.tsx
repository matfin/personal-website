import React from 'react';
import loadingSpinner from 'svg/loadingSpinner.svg';
import { LoadingSpinnerSt, LoadingSt } from './Loading.css';

interface IProps {
  className?: string
}

export const Loading = ({ className }: IProps): JSX.Element => (
  <LoadingSt className={className}>
    <LoadingSpinnerSt src={loadingSpinner} />
  </LoadingSt>
);
