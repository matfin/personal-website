import { clsx } from 'clsx/lite';

import type { Position as PositionModel } from '@models/types';
import { formatDate } from '@utils/general';
import Text from '@components/text';
import classNames from './Position.module.css';

type Task = string;

export type Props = Omit<PositionModel, 'tasks'> & {
  className?: string;
  tasks: Task[];
};

type DateRange = Record<'dateFrom' | 'dateTo', string | null>;

const formatDateRange = (startDate: string, endDate?: string): DateRange => {
  return {
    dateFrom: formatDate(new Date(startDate)),
    dateTo: endDate ? formatDate(new Date(endDate)) : null,
  };
};

const getTaskKey = (task: Task, index: number): string =>
  `${task.substring(0, 10)}-${index}`;

const Position = ({
  className,
  company,
  endDate,
  location,
  role,
  startDate,
  tasks,
}: Props): React.ReactNode => {
  const { dateFrom, dateTo } = formatDateRange(startDate, endDate);

  return (
    <article className={classNames.container}>
      <header>
        <Text className={clsx(className, classNames.dateFromTo)} type="h4">
          <time dateTime={startDate}>{dateFrom}</time>
          {' to '}
          {dateTo ? <time dateTime={endDate}>{dateTo}</time> : 'present'}
        </Text>
        <Text className={classNames.companyName} type="h3">
          {company}
        </Text>
        <Text className={classNames.locationAndRole} type="h4">
          {role} / {location}
        </Text>
      </header>
      <ul className={classNames.taskList}>
        {tasks.map((task: Task, index: number) => (
          <Text
            className={clsx(classNames.taskItem, 'list-item')}
            type="li"
            key={getTaskKey(task, index)}
          >
            {task}
          </Text>
        ))}
      </ul>
    </article>
  );
};

export default Position;
