import React from 'react';
import { Position as PositionModel } from 'models';
import { formatDate } from 'utils';
import {
  CompanyNameSt,
  DateFromToSt,
  LocationAndRoleSt,
  PositionSt,
  TaskListSt,
  TaskItemSt,
} from './Position.css';

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
    <PositionSt className={className}>
      <DateFromToSt>
        <time dateTime={startDate}>{dateFrom}</time>
        {endDate ? <time dateTime={endDate}>{dateTo}</time> : ' to present'}
      </DateFromToSt>
      <CompanyNameSt>{company}</CompanyNameSt>
      <LocationAndRoleSt>
        {role} / {location}
      </LocationAndRoleSt>
      <TaskListSt>
        {tasks.map((task: string) => (
          <TaskItemSt key={task}>{task}</TaskItemSt>
        ))}
      </TaskListSt>
    </PositionSt>
  );
};

export default Position;
