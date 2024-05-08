import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';

import { StaticReqProps } from 'models';
import App from 'app/App';

export interface Props {
  req: StaticReqProps;
  store: Store;
}

const IndexComponent = ({ req, store }: Props): React.ReactNode => (
  <Provider store={store}>
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  </Provider>
);

export default IndexComponent;
