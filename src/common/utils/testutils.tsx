/* istanbul ignore file */
import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  IListState,
  IStoryState,
} from 'app/common/interfaces';

export type IReduxStateType = IListState | IStoryState;

export const createMockStore = (reduxStates: IReduxStateType[]): Store => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  return mockStore(reduxStates);
};

export const mountWithRouter = (children: any): any => mount(<Router>{children}</Router>);

export const mountWithStore = (children: any): any => {
  const store = createMockStore([]);

  return mount(<Provider store={store}>{children}</Provider>);
};

export default mountWithRouter;
