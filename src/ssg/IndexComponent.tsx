import React from 'react';
import { Store } from 'redux';
import { StaticRouter, StaticRouterContext } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StaticReqProps } from 'models';
import App from 'app/App';

export interface Props {
  context: StaticRouterContext | undefined;
  req: StaticReqProps;
  store: Store;
}

export const IndexComponent = ({ context, req, store }: Props): JSX.Element => (
  <Provider store={store}>
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  </Provider>
);

export default IndexComponent;
