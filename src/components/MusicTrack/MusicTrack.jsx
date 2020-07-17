/* eslint-disable react/prop-types */
/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import MusicSelector from '../MusicSelector/MusicSelector';
import SoundCloudClient from '../../clients/SoundCloudClient';
import FreeSoundClient from '../../clients/FreeSoundClient';
import {usePlayers} from '../../contexts/PlayersContext';
import {GrainPlayer} from 'tone';
import {MusicTrackPlayer} from '../../contexts/TrackPlayer';
import MusicEffectsContainer from '../../MusicEffectsContainer/MusicEffectsContainer';
import Spinner from '../Spinner/Spinner';

function soundClientFactory(type) {
  if (type === 'Sound') {
    return new SoundCloudClient();
  } else if (type === 'Effect') {
    return new FreeSoundClient();
  }
}

const MusicTrack = ({trackId, currentSong, setCurrentSong, type}) => {
  const soundClient = useRef(soundClientFactory(type));

  const {getPlayer, addPlayer, stopAll} = usePlayers();
  const [currentPlayer, setCurrentPlayer] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setCurrentPlayer(getPlayer(trackId));
  }, [getPlayer, trackId]);

  async function handleSelection(promise) {
    setIsLoading(true);
    const {title, duration, url} = await promise();
    stopAll();
    if (currentPlayer !== undefined) {
      currentPlayer.dispose();
      await setCurrentPlayer();
    }

    setCurrentSong({title, duration});
    const player = new MusicTrackPlayer(
      new GrainPlayer(url, () => {
        addPlayer(trackId, player);
        setIsLoading(false);
        setCurrentPlayer(player);
        player.sync().start();
      }),
      trackId,
    );
  }
  const musicSelector = useMemo(
    () => (
      <MusicSelector
        soundClient={soundClient.current}
        selectionHandler={handleSelection}
      />
    ),

    [handleSelection],
  );

  const musicEffectContainer = useMemo(
    () => <MusicEffectsContainer player={currentPlayer?.player} />,
    [currentPlayer],
  );

  return (
    <React.Fragment>
      {currentSong && (
        <div>
          {!isLoading ? (
            <div>{musicEffectContainer}</div>
          ) : (
            <div
              css={{
                padding: '1em',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '39px',
              }}
            >
              <Spinner />
            </div>
          )}
        </div>
      )}
      <div css={{marginTop: '1em'}}>{musicSelector}</div>
    </React.Fragment>
  );
};

export default MusicTrack;
