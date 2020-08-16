import styled from "@emotion/styled/macro";

const ImageGridItem = styled.li({
  position: 'relative',
  width: '100%',
  background: '#212529',
  '&:hover': {
    'img:nth-child(1)': {opacity: '0.3'},
    'div:nth-child(2)': {opacity: 1},
  },
});

export default ImageGridItem;
