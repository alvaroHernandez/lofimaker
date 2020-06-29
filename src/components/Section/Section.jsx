/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import {darker} from '../../styles/colors'

const Section = ({children}) => {
  return (
    <div
      css={{
        marginTop: '1em',
        backgroundColor: darker,
        padding: '1em',
      }}
    >
      {children}
    </div>
  )
}

export default Section
