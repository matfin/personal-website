/* istanbul ignore file */
import { connect } from 'react-redux';
import { fetchStory, resetStory } from './actions';
import Story from './Story';

const mapStateToProps = (state:any) => ({
  error: state.storyState.error,
  pending: state.storyState.pending,
  story: state.storyState.story,
});
const mapDispatchToProps = { fetchStory, resetStory };

export default connect(mapStateToProps, mapDispatchToProps)(Story);
