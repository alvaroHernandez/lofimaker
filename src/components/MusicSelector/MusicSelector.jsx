/* eslint-disable react/prop-types */
/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import SimpleForm from '../SimpleForm/SimpleForm';
import MusicGrid from '../MusicGrid/MusicGrid';
import {useAsync} from '../../hooks/useAsync';
import {Player} from 'tone';

const MusicSelector = ({
  setPlayer,
  soundClient,
  setCurrentSong,
}) => {
  const {data, error, run, isLoading, isError, isSuccess} = useAsync();

  function search({query}) {
    run(soundClient.search(query));
  }

  function clickHandler({id, title, duration, streamUrl}) {
    setCurrentSong({title, duration});
    soundClient.stream(streamUrl).then(response => {
      const player = new Player(response, () => {
        setPlayer(player);
      }).toDestination();
      player.autostart = false;
    });
  }

  return (
    <div>
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
    </div>
  );
};

export default MusicSelector;
