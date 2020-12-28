import * as React from 'react';
import { connect } from 'react-redux';
import { CombinedAppState, ThemeType } from 'models';
import { switchTheme } from 'app/actions';
import { fetchPage, FetchPageDispatch, resetPage } from './actions';
import Page, { Props } from './Page';

interface MapDispatchToProps {
  fetchPage: (slug: string) => void;
  resetPage: () => void;
  switchTheme: (theme: ThemeType) => void;
}

const mapStateToProps = (state: CombinedAppState) => ({
  currentTheme: state.appState.currentTheme,
  error: state.pageState.error,
  pending: state.pageState.pending,
  page: state.pageState.page,
});

export const mapDispatchToProps = (
  dispatch: FetchPageDispatch
): MapDispatchToProps => ({
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
