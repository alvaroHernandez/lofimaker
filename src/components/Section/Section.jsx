/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import {darker} from '../../styles/colors'

const Section = props => {
  return (
    <div
      {...props}
      css={{
        marginTop: '1em',
        backgroundColor: darker,
        padding: '1em',
      }}
    />
  )
}

export default Section
