import { clsx } from 'clsx/lite';

import type { Position as PositionModel } from '@models/interfaces';
import { formatDate } from '@utils/general';
import Text from '@components/text';
import classNames from './Position.module.css';

export interface Props extends PositionModel {
  className?: string;
}

const Position = ({
  className,
  company,
  endDate,
  location,
  role,
  startDate,
  tasks,
}: Props): React.ReactNode => {
  const dateFrom = formatDate(new Date(startDate));
  const dateTo = endDate
    ? ` to ${formatDate(new Date(endDate))}`
    : ' to present';

  return (
    <div className={classNames.container}>
      <Text className={clsx(className, classNames.dateFromTo)} type="h4">
        <time dateTime={startDate}>{dateFrom}</time>
        {endDate ? <time dateTime={endDate}>{dateTo}</time> : ' to present'}
      </Text>
      <Text className={classNames.companyName} type="h3">
        {company}
      </Text>
      <Text className={classNames.locationAndRole} type="h4">
        {role} / {location}
      </Text>
      <ul className={classNames.taskList}>
        {tasks.map((task: string) => (
          <Text
            className={clsx(classNames.taskItem, 'list-item')}
            type="li"
            key={task}
          >
            {task}
          </Text>
        ))}
      </ul>
    </div>
  );
};

export default Position;
