import * as React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, CombinedAppState, ThemeType } from 'common/models';
import { switchTheme } from 'app/actions';
import { fetchPage, resetPage } from './actions';
import Page, { Props } from './Page';

const mapStateToProps = (state: CombinedAppState) => ({
  currentTheme: state.appState.currentTheme,
  error: state.pageState.error,
  pending: state.pageState.pending,
  page: state.pageState.page,
});

export const mapDispatchToProps = (dispatch: AppDispatch): unknown => ({
  fetchPage: (slug: string): void => {
    dispatch(fetchPage(slug));
  },
  resetPage: (): void => {
    dispatch(resetPage());
  },
  switchTheme: (theme: ThemeType): void => {
    dispatch(switchTheme(theme));
  },
});

const Component = (props: Props): JSX.Element => <Page {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(Component);
