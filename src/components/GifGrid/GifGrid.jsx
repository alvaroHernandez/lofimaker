/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'

const GifGrid = ({gifs, clickHandler}) => {
  return (
    <ul
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gridGap: '10px',
        gridAutoFlow: 'dense',
        listStyle: 'none',
        margin: '1em auto',
        padding: '0',
      }}
    >
      {gifs.map(gif => (
        <li
          key={gif.id}
          onClick={() => clickHandler({url: gif.images.downsized_large.url})}
        >
          <img
            css={{
              display: 'block',
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
            src={gif.images.preview_gif.url}
          />
        </li>
      ))}
    </ul>
  )
}

export default GifGrid
