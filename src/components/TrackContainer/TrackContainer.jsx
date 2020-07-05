/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useRef, useState} from 'react';
import Track from '../Track/Track';
import Button from '../Button/Button';
import MusicTrack from '../MusicTrack/MusicTrack';
import BeatsCreator from '../BeatsCreator/BeatsCreator';

// eslint-disable-next-line react/prop-types
const TrackContainer = ({type}) => {
  const [currentSong, setCurrentSong] = useState();
  const [player, setPlayer] = useState();
  const [showTrackSettings, setShowTrackSettings] = useState(true);
  const deltaPosition = useRef(0);

  function toggleShowTrackSettings() {
    setShowTrackSettings(!showTrackSettings);
  }

  function trackFactory(type) {
    switch (type) {
      case 'Sound':
      case 'Effect':
        return (
          <MusicTrack
            player={player}
            setPlayer={setPlayer}
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

  const handleDrag = (e, ui) => {
    deltaPosition.current = deltaPosition.current+ui.deltaX;
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
        <div css={{border: '0.1px solid #f1f1f4;', position: 'relative', height: '38px' }}>
          <Track
            handleDrag={handleDrag}
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
