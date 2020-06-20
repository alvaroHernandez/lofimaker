import styled from "styled-components";

const Layout = styled.div`
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-column-gap: 1em;
      grid-row-gap: 1em;
`;

const Column = styled.div`
    grid-column: span ${props => props.span};
`;

export {
    Column,
    Layout
};
