import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThemeType } from 'common/interfaces';
import { switchTheme } from 'app/actions';
import { fetchPage, PageActionTypes, resetPage } from './actions';
import Page, { IProps } from './Page';

const mapStateToProps = (state: any) => ({
  currentTheme: state.appState.currentTheme,
  error: state.pageState.error,
  pending: state.pageState.pending,
  page: state.pageState.page,
});

export const mapDispatchToProps = (dispatch: Dispatch<PageActionTypes>) => ({
  fetchPage: (slug: string): void => {
    dispatch<any>(fetchPage(slug));
  },
  resetPage: (): void => {
    dispatch<any>(resetPage());
  },
  switchTheme: (theme: ThemeType): void => {
    dispatch<any>(switchTheme(theme));
  },
});

const Component = (props: IProps): JSX.Element => <Page {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(Component);
