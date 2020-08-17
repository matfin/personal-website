import React from 'react';
import loadingSpinner from 'svg/loadingSpinner';
import { LoadingSpinnerSt, LoadingSt } from './Loading.css';

export interface IProps {
  className?: string;
}

const Loading = ({ className }: IProps): JSX.Element => (
  <LoadingSt className={className}>
    <LoadingSpinnerSt src={loadingSpinner} />
  </LoadingSt>
);

export default Loading;
