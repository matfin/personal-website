import React from 'react';
import { SocialLinksSt } from './SocialLinks.css';
import github from 'svg/github.svg';
import twitter from 'svg/twitter.svg';
import linkedin from 'svg/linkedin.svg';
import stackoverflow from 'svg/stackoverflow.svg';

export interface IProps {
  className?: string
}

export const SocialLinks = ({ className }: IProps) => (
  <SocialLinksSt className={className}>
    <li>
      <a href="https://github.com/matfin/" rel="external" title="matfin (Matt Finucane)">
        <img src={github} width="32" height="32" />
      </a>
    </li>
    <li>
      <a href="https://twitter.com/matfinucane" rel="external" title="matfinucane on Twitter">
        <img src={twitter} width="32" height="32" />
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com/in/mattfinucane/" rel="external" title="Matt Finucane on LinkedId">
        <img src={linkedin} width="32" height="32" />
      </a>
    </li>
    <li>
      <a href="https://stackoverflow.com/users/1515180/matfin" rel="external" title="Matt Finucane on StackOverflow">
        <img src={stackoverflow} width="32" height="32" />
      </a>
    </li>
  </SocialLinksSt>
);
