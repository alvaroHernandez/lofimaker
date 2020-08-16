import styled from '@emotion/styled/macro';
import {alternative, dark, darker, light} from '../../styles/colors';

const buttonVariants = {
  primary: {
    background: light,
    color: 'white',
    fontWeight: 'bold',
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
    '&:disabled': {
      opacity: 0.5,
    },
  },
  ({variant = 'primary'}) => buttonVariants[variant],
);

export default Button;
