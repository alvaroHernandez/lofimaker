/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';

const MusicGrid = ({tracks, clickHandler}) => {
  console.log(tracks);
  return (
    <ul
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gridGap: '10px',
        gridAutoFlow: 'dense',
        listStyle: 'none',
        margin: '1em auto',
        padding: '0',
      }}
    >
      {tracks.map(track => (
        <li
          id={track.id}
          onClick={() =>
            clickHandler({
              id: track.id,
              title: track.title,
              duration: track.duration,
              streamUrl: track.stream_url,
            })
          }
        >
          <div
            css={{
              display: 'block',
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          >
            {track.artwork_url === null ? (
              <div
                css={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: 'gray',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  lineHeight: '100px',
                }}
              >
                No Cover
              </div>
            ) : (
              <img
                css={{
                  width: '100px',
                  display: 'block',
                }}
                src={track.artwork_url}
              />
            )}
            <span
              css={{
                fontSize: '12px',
              }}
            >
              {track.title}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MusicGrid;
