import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useParams } from 'react-router-dom';
import { fetchPage, PageActionTypes, resetPage } from './actions';
import Page, { IProps } from './Page';

const mapStateToProps = (state: any) => ({
  error: state.pageState.error,
  pending: state.pageState.pending,
  page: state.pageState.page,
});

export const mapDispatchToProps = (dispatch: Dispatch<PageActionTypes>) => ({
  fetchPage: (slug: string): void => {
    dispatch<any>(fetchPage(slug))
  },
  resetPage: (): void => {
    dispatch(resetPage())
  },
});

const Component = (props: IProps): JSX.Element => {
  const { slug } = useParams();

  return <Page {...props} slug={slug || 'home'} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
