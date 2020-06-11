import React from 'react';
import github from 'svg/github';
import twitter from 'svg/twitter';
import linkedin from 'svg/linkedin';
import stackoverflow from 'svg/stackoverflow';
import { SocialLinksSt } from './SocialLinks.css';

export interface IProps {
  className?: string
}

export const SocialLinks = ({ className }: IProps) => (
  <SocialLinksSt className={className}>
    <li>
      <a href="https://github.com/matfin/" rel="external" title="matfin (Matt Finucane)">
        <img alt="GitHub" src={github} width="32" height="32" />
      </a>
    </li>
    <li>
      <a href="https://twitter.com/matfinucane" rel="external" title="matfinucane on Twitter">
        <img alt="Twitter" src={twitter} width="32" height="32" />
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com/in/mattfinucane/" rel="external" title="Matt Finucane on LinkedId">
        <img alt="LinkedIn" src={linkedin} width="32" height="32" />
      </a>
    </li>
    <li>
      <a href="https://stackoverflow.com/users/1515180/matfin" rel="external" title="Matt Finucane on StackOverflow">
        <img alt="StackOverflow" src={stackoverflow} width="32" height="32" />
      </a>
    </li>
  </SocialLinksSt>
);
