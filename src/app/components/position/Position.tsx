import * as React from 'react';
import { IPosition, ITopic } from 'common/interfaces';
import {
  CompanyNameSt,
  DateSt,
  LocationAndRoleSt,
  PositionSt,
  TaskListSt,
  TopicsListSt,
  TopicSt,
  TaskItemSt,
} from './Position.css';

export interface IProps extends IPosition {
  className?: string,
}

export const Position = ({
  className,
  company,
  endDate,
  location,
  role,
  startDate,
  tasks,
  topics,
}: IProps): JSX.Element => (
  <PositionSt className={className}>
    <DateSt datetime={new Date(startDate)}>{startDate}</DateSt>
    {endDate ? (
      <DateSt datetime={new Date(endDate)}>
        {endDate}
      </DateSt>
    ) : ' to present'}
    <CompanyNameSt>
      {company}
    </CompanyNameSt>
    <LocationAndRoleSt>
      {role} / {location}
    </LocationAndRoleSt>
    <TaskListSt>
      {tasks.map((task: string, idx: number) => <TaskItemSt key={idx}>{task}</TaskItemSt>)}
    </TaskListSt>
    <TopicsListSt>
      {topics.map((topic: ITopic, idx: number) => <TopicSt {...topic} key={idx} />)}
    </TopicsListSt>
  </PositionSt>
);
