import styled, { css } from 'styled-components';
import query, { breakpoint } from '../media';

const Grid = styled.div`
  ${({ $debug }) => css`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 10px;
    padding: 0 30px;
    ${$debug &&
      css`
        background-color: #ff880066;
      `};

    ${query.sm} {
      margin: 0 auto;
      width: ${breakpoint.sm}px;
      padding: 0 50px;
      ${$debug &&
        css`
          background-color: #ff00cc66;
        `};
    }

    ${query.md} {
      width: ${breakpoint.md}px;
      padding: 0 120px;
      ${$debug &&
        css`
          background-color: #9acd3266;
        `};
    }

    ${query.lg} {
      width: ${breakpoint.lg}px;
      ${$debug &&
        css`
          background-color: #00bfff66;
        `};
    }
  `};
`;

export default Grid;
