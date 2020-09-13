import styled from '@emotion/styled/macro';
import {alternative, dark, light} from '../../styles/colors';

const buttonVariants = {
  primary: {
    color: 'white',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #ff5e62, #ff9966)',
    '&:disabled': {
      background: 'linear-gradient(to right,#adabab,#908d8e)',
      opacity: 1,
    },
},
  secondary: {
    background: 0,
    border: '1px solid white',
    color: 'white',
  },
  tertiary: {
    background: alternative,
    color: light,
    fontWeight: 'bold',
  },
};

const BaseButton = styled.button(
  {
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
    '&:disabled': {
      opacity: 0.5,
    },
  },
  ({variant = 'primary'}) => buttonVariants[variant],
);

const Button = styled(BaseButton)({
  padding: '10px 10px',
});

export const IconButton = styled(BaseButton)({
  fontSize: '1.2em',
  padding: '0.2em',
});

export default Button;
