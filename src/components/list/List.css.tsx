import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { colours, fontSizes } from 'app/common/styles';

interface IListPropsSt {
  loading: number
}

export const ListSt = styled.ul<IListPropsSt>`
  font-size: ${fontSizes.subheading};
  filter: blur(6px);

  ${(props) => !props.loading && css`
    transition: 500ms filter linear;
    filter: blur(0px);
  `};
`;

export const ListItemSt = styled.li`
  display: flex;
`;

export const LinkSt = styled(Link)`
  padding: 40px 30px;
  color: ${colours.secondary};
`;

export default ListSt;
