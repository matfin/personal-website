import React from 'react';
import { Store } from 'redux';
import { Request } from 'express';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../src/App';

export interface IProps {
  context: any,
  req: Request,
  store: Store,
}

export const IndexComponent = ({ context, req, store }: IProps) => (
  <Provider store={store}>
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  </Provider>
);

export default IndexComponent;
