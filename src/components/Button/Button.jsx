import styled from '@emotion/styled/macro'
import {dark, darker} from '../../styles/colors'

const buttonVariants = {
  primary: {
    background: darker,
    color: 'white',
  },
  secondary: {
    background: dark,
    color: 'white',
  },
}

const Button = styled.button(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
  },
  ({variant = 'primary'}) => buttonVariants[variant],
)

export default Button
