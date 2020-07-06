/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useRef, useState} from 'react';
import Track from '../Track/Track';
import Button from '../Button/Button';
import MusicTrack from '../MusicTrack/MusicTrack';
import BeatsCreator from '../BeatsCreator/BeatsCreator';
import {usePlayers} from '../../contexts/PlayersContext';
import {v4 as uuidv4} from 'uuid';
import {lofiDurationMinutes} from '../../configs/playerConfig';

// eslint-disable-next-line react/prop-types
const TrackContainer = ({type}) => {
  const [currentSong, setCurrentSong] = useState();
  const [showTrackSettings, setShowTrackSettings] = useState(true);
  const trackId = useRef(uuidv4());
  const {updatePlayerStartingOffset} = usePlayers();

  function toggleShowTrackSettings() {
    setShowTrackSettings(!showTrackSettings);
  }

  function trackFactory(type) {
    switch (type) {
      case 'Sound':
      case 'Effect':
        return (
          <MusicTrack
            trackId={trackId.current}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            type={type}
          />
        );
      case 'Drums':
        return <BeatsCreator setCurrentSong={setCurrentSong} />;
      default:
        return null;
    }
  }

  const onStopDrag = (e, ui) => {
    const currentTime =
      (ui.lastX * lofiDurationMinutes * 60) / ui.node.parentNode.clientWidth;
    updatePlayerStartingOffset(trackId.current, currentTime);
  };

  return (
    <div css={{marginTop: '1em'}}>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '100px auto',
          alignItems: 'center',
        }}
      >
        <div>
          <Button variant={'secondary'} onClick={toggleShowTrackSettings}>
            Settings
          </Button>
        </div>
        <div
          css={{
            border: '0.1px solid #f1f1f4;',
            position: 'relative',
            height: '38px',
          }}
        >
          <Track
            handleDragStop={onStopDrag}
            songName={currentSong ? currentSong.title : ' This track is empty'}
            duration={currentSong ? currentSong.duration : 0}
          />
        </div>
      </div>
      <div css={{display: showTrackSettings ? 'block' : 'none'}}>
        {trackFactory(type)}
      </div>
    </div>
  );
};

export default TrackContainer;
