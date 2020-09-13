import styled from '@emotion/styled/macro';
import {light, lighter} from '../../styles/colors';

const ButtonContainer = styled.div({
  opacity: '0',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  '-ms-transform': 'translate(-50%, -50%)',
  'text-align': 'center',
});

const ImageGridElementButton = styled.button({
  border: 0,
  fontSize: '3em',
  background: '#fff0f000',
  color: light,
  '&:hover': {
    color: lighter,
  },
});

export {ButtonContainer, ImageGridElementButton};
