import styled from '@emotion/styled/macro';

const ImageGrid = styled.ul(
  {
    display: 'grid',
    gridGap: '10px',
    gridAutoFlow: 'dense',
    listStyle: 'none',
    margin: '1em auto',
    padding: '0',
  },
  props => ({
    gridTemplateColumns: `repeat(auto-fill, minmax(${
      props.min ? props.min : '250px'
    }, 1fr))`,
  }),
);

export default ImageGrid;
