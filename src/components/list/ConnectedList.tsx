/* istanbul ignore file */
import { connect } from 'react-redux';
import { fetchStories } from './actions';
import List from './List';

const mapStateToProps = (state: any) => ({
  error: state.listState.error,
  pending: state.listState.pending,
  stories: state.listState.stories,
});
const mapDispatchToProps = { fetchStories };

export default connect(mapStateToProps, mapDispatchToProps)(List);
