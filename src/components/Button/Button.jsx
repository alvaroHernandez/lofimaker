import styled from '@emotion/styled/macro';
import {alternative, dark, darker, light, lighter, ultraDark} from '../../styles/colors';

const buttonVariants = {
  primary: {
    background: light,
    color: 'white',
    fontWeight: 'bold',
    '&:disabled': {
      opacity: 0.5,
    },
  },
  secondary: {
    background: dark,
    color: 'white',
  },
  tertiary: {
    background: alternative,
    color: light,
    fontWeight: 'bold',
  },
  quaternary: {
    background: darker,
    color: 'white',
  },
};

const Button = styled.button(
  {
    padding: '10px 10px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
  },
  ({variant = 'primary'}) => buttonVariants[variant],
);

export default Button;
