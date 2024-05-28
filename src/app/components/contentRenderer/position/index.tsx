import { Position as PositionModel } from '@models/interfaces';
import { formatDate } from '@utils/general';
import {
  CompanyName,
  DateFromTo,
  LocationAndRole,
  Container,
  TaskList,
  TaskItem,
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
    <Container className={className}>
      <DateFromTo>
        <time dateTime={startDate}>{dateFrom}</time>
        {endDate ? <time dateTime={endDate}>{dateTo}</time> : ' to present'}
      </DateFromTo>
      <CompanyName>{company}</CompanyName>
      <LocationAndRole>
        {role} / {location}
      </LocationAndRole>
      <TaskList>
        {tasks.map((task: string) => (
          <TaskItem key={task}>{task}</TaskItem>
        ))}
      </TaskList>
    </Container>
  );
};

export default Position;
