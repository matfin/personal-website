import { StrictMode } from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { prerenderToNodeStream } from 'react-dom/static';
import { ServerStyleSheet } from 'styled-components';

import type { Page } from '@models/interfaces';
import { store } from '@services/state/store';
import { setPage } from '@services/state/page/slice';
import { loadPage } from '@ssg/content_loader';
import App from '@app/App';

export type StaticRender = {
  body: string;
  linkTags: string;
  metaTags: string;
  preloadedStateJSON: string;
  styleTags: string;
  titleTag: string;
}

const cleanedHtml = (html: string): Pick<StaticRender, 'body' | 'linkTags' | 'metaTags' | 'titleTag'> => {
  const headTags: string[] = [];
  const headTagRegex: RegExp = /<title>.*?<\/title>|<meta[^>]*>|<link[^>]*>/gi;
  const body = html.replace(headTagRegex, (match) => {
    headTags.push(match);
    return ''; 
  });
  const titleTag = headTags.find(tag => tag.startsWith('<title>')) || '';
  const linkTags = headTags.filter(tag => tag.startsWith('<link')).join('\n');
  const metaTags = headTags.filter(tag => tag.startsWith('<meta')).join('\n');

  return { body, linkTags, metaTags, titleTag };
}

const prerender = async (slug: string): Promise<Pick<StaticRender, 'body' | 'preloadedStateJSON' | 'styleTags'>> => {
  const sheet = new ServerStyleSheet();
  const url: string = `/${slug}`;
  const page: Page | null = await loadPage(
    slug,
    './public/pages',
  );

  if (page) {
    store.dispatch(setPage(page));
  }

  const preloadedStateJSON: string = JSON.stringify(store.getState()).replace(
    /</g,
    '\\u003c',
  );

  const { prelude } = await prerenderToNodeStream(
    sheet.collectStyles(
      <StrictMode>
        <Provider store={store}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </Provider>
      </StrictMode>,
    ),
  );

  const body: string = await new Promise((resolve, reject) => {
    let data = '';
    prelude.on('data', (chunk) => {
      data += chunk;
    });

    prelude.on('end', () => {
      resolve(data);
    });

    prelude.on('error', reject);
  });
  const styleTags: string = sheet.getStyleTags();

  sheet.seal();

  return {
    body,
    preloadedStateJSON,
    styleTags
  }
}

export const renderStatic = async (slug: string): Promise<StaticRender> => {
  const { body: prerendered, preloadedStateJSON, styleTags } = await prerender(slug);
  const { body, linkTags, metaTags, titleTag } = cleanedHtml(prerendered);

  return {
    body,
    linkTags,
    metaTags,
    preloadedStateJSON,
    styleTags,
    titleTag
  }
}