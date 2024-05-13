import React, { StrictMode } from 'react';
import { Store } from '@reduxjs/toolkit';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';

import { StaticReqProps } from '@models';
import App from 'app/App';

export interface Props {
  helmetContext: { helmet?: HelmetServerState };
  req: StaticReqProps;
  store: Store;
}

const IndexComponent = ({
  helmetContext,
  req,
  store,
}: Props): React.ReactNode => (
  <StrictMode>
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </StaticRouter>
    </Provider>
  </StrictMode>
);

export default IndexComponent;
