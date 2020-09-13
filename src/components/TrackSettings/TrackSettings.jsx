import React from 'react';
import MusicTrack from '../MusicTrack/MusicTrack';
import ToneBeatsCreator from '../BeatsCreator/ToneBeatsCreator';

const TrackSettings = ({type, trackId, containerRef, updateCurrentPlayer}) => {
  switch (type) {
    case 'Sound':
    case 'Effect':
      return (
        <MusicTrack
          refToScroll={containerRef}
          trackId={trackId}
          updateCurrentPlayer={updateCurrentPlayer}
          type={type}
        />
      );
    case 'Drums':
      return (
        <ToneBeatsCreator
          trackId={trackId}
          updateCurrentPlayer={updateCurrentPlayer}
        />
      );
    default:
      return null;
  }
};

export default TrackSettings;
