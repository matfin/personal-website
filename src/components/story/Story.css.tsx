import styled, { css } from 'styled-components';
import { colours, SubHeading, Text } from 'app/common/styles';

interface IParagraphStProps {
  redacted: boolean
}

export default styled.div`
  display: block;
  padding: 15px 30px;
`;

export const ChapterSt = styled(SubHeading)`
  color: ${colours.secondary};
  margin-bottom: 30px;
`;

export const ParagraphSt = styled(Text)<IParagraphStProps>`
  color: ${colours.secondary};
  margin-bottom: 30px;
  transition: 500ms filter linear;

  ${(props) => props.redacted && css`
    filter: blur(6px);
  `};
`;
