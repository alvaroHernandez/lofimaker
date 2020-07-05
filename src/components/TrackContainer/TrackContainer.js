/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useState} from 'react';
import Track from '../Track/Track';
import Button from '../Button/Button';
import MusicTrack from '../MusicTrack/MusicTrack';
import BeatsCreator from '../BeatsCreator/BeatsCreator';

// eslint-disable-next-line react/prop-types
const TrackContainer = ({id, type}) => {
  const [currentSong, setCurrentSong] = useState();
  const [showTrackSettings, setShowTrackSettings] = useState(true);

  function toggleShowTrackSettings() {
    setShowTrackSettings(!showTrackSettings);
  }

  function trackFactory(type) {
    switch (type) {
      case 'sound':
      case 'effect':
        return (
          <MusicTrack
            trackId={id}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            type={type}
          />
        );
      case 'drum':
        return <BeatsCreator trackId={id} />;
      default:
        return null;
    }
  }

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
        <div>
          <Track
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
