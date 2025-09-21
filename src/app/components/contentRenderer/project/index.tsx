import { clsx } from 'clsx/lite';
import { Link } from 'react-router-dom';

import type { Project as ProjectModel } from '@models/types';
import Text from '@components/text';
import classNames from './Project.module.css';

export type Props = ProjectModel & {
  className?: string;
};

const Project = ({
  className,
  description,
  slug,
  title,
}: Props): React.ReactNode => (
  <Link
    to={`/projects/${slug}/`}
    className={clsx(classNames.container, className)}
    aria-label={`View project ${title}`}
  >
    <Text type="h3" className={classNames.title}>
      {title}
    </Text>
    <Text type="p" className={classNames.description}>
      {description}
    </Text>
  </Link>
);

export default Project;
