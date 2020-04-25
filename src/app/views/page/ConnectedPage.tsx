import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchPage, PageActionTypes, resetPage } from './actions';
import Page from './Page';

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

export default connect(mapStateToProps, mapDispatchToProps)(Page);
