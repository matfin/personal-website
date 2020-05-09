import React from 'react';
import {
  Github,
  Twitter,
  Linkedin,
  Stackoverflow,
} from '@icons-pack/react-simple-icons';
import { SocialLinksSt } from './SocialLinks.css';

export interface IProps {
  className?: string
}

export const SocialLinks = ({ className }: IProps) => (
  <SocialLinksSt className={className}>
    <li>
      <a href="https://github.com/matfin/" rel="external" title="matfin (Matt Finucane)">
        <Github size={32} />
      </a>
    </li>
    <li>
      <a href="https://twitter.com/matfinucane" rel="external" title="matfinucane on Twitter">
        <Twitter size={32} />
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com/in/mattfinucane/" rel="external" title="Matt Finucane on LinkedId">
        <Linkedin size={32} />
      </a>
    </li>
    <li>
      <a href="https://stackoverflow.com/users/1515180/matfin" rel="external" title="Matt Finucane on StackOverflow">
        <Stackoverflow size={32} />
      </a>
    </li>
  </SocialLinksSt>
);
