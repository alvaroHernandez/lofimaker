/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useRef, useState} from 'react';
import Button from '../Button/Button';
import SimpleForm from '../SimpleForm/SimpleForm';
import MusicGrid from '../MusicGrid/MusicGrid';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';
import {useAsync} from '../../hooks/useAsync';
import Track from '../Track/Track';
import MusicEffectsContainer from '../../MusicEffectsContainer/MusicEffectsContainer';
import {Player} from 'tone';
import Spinner from '../Spinner/Spinner';

const MusicSelector = ({soundClient}) => {
  const soundCloudClient = useRef(soundClient);
  const {data, error, run, isLoading, isError, isSuccess} = useAsync();

  const [player, setPlayer] = useState();
  const [currentSongTitle, setCurrentSongTitle] = useState();
  const [currentSongDuration, setCurrentSongDuration] = useState();

  function search({query}) {
    run(soundCloudClient.current.search(query));
  }

  function playIt() {
    if (player !== undefined) {
      player.start();
    }
  }

  function stop() {
    if (player !== undefined) {
      player.stop();
    }
  }

  function clickHandler({id, title, duration, streamUrl}) {
    setCurrentSongTitle(title);
    setCurrentSongDuration(duration);
    soundCloudClient.current.stream(streamUrl).then(response => {
      console.log('response');
      console.log(response);
      console.log('response');
      const player = new Player(response, () => {
        setPlayer(player);
      }).toDestination();
      player.autostart = false;
    });
  }

  return (
    <div>
      <BoxWithCenteredContent>
        {currentSongTitle ? (
          <div css={{display: 'flex', alignItems: 'center'}}>
            <span css={{marginRight: '1em'}}>{currentSongTitle}</span>
            {player ? (
              <div>
                <Button
                  css={{margin: '0 1em'}}
                  variant={'secondary'}
                  onClick={playIt}
                >
                  Play
                </Button>
                <Button variant={'secondary'} onClick={stop}>
                  Stop
                </Button>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        ) : (
          'Search and select a song...'
        )}
      </BoxWithCenteredContent>

      <SimpleForm
        inputText={'Song Name'}
        buttonText={'Search'}
        onSubmit={search}
        inputName={'query'}
        isLoading={isLoading}
      />

      {isError ? (
        <div>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isSuccess && <MusicGrid clickHandler={clickHandler} tracks={data} />}

      {currentSongTitle && (
        <div>
          <Track songName={currentSongTitle} duration={currentSongDuration} />
          <MusicEffectsContainer player={player} />
        </div>
      )}
    </div>
  );
};

export default MusicSelector;
