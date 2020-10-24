import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CombinedAppState, ThemeType } from 'common/models';
import { switchTheme } from 'app/actions';
import { fetchPage, PageActionTypes, resetPage } from './actions';
import { AppActionTypes } from '../../actions';
import Page, { Props } from './Page';

const mapStateToProps = (state: CombinedAppState) => ({
  currentTheme: state.appState.currentTheme,
  error: state.pageState.error,
  pending: state.pageState.pending,
  page: state.pageState.page,
});

export const mapDispatchToProps = (
  dispatch: Dispatch<PageActionTypes | AppActionTypes>
) => ({
  fetchPage: (slug: string): void => {
    dispatch<any>(fetchPage(slug));
  },
  resetPage: (): void => {
    dispatch<PageActionTypes>(resetPage());
  },
  switchTheme: (theme: ThemeType): void => {
    dispatch<AppActionTypes>(switchTheme(theme));
  },
});

const Component = (props: Props): JSX.Element => <Page {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(Component);
