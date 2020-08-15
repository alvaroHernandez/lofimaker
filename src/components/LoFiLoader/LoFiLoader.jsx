import React, {useCallback, useRef, useState} from 'react';
import {MusicTrackPlayer} from '../../contexts/TrackPlayer';
import {Distortion, EQ3, GrainPlayer, Reverb} from 'tone';
import Button from '../Button/Button';
import FinalImageContainer from '../FinalImageContainer/FinalImageContainer';
import {jsx} from '@emotion/core';
import {useAsync} from '../../hooks/useAsync';
import {usePlayers} from '../../contexts/PlayersContext';

const serializedLofi2 =
  '{"players":[{"trackId":"8011f13c-7f0a-4e5d-82ec-28fa40a43c37","title":"it\'s different - Pokemon Ü (ft. Broderick Jones)","duration":193167,"originalDuration":193167,"startTime":0,"url":"https://api.soundcloud.com/tracks/276085126/stream?client_id=b8f06bbb8e4e9e201f9e6e46001c3acb","effects":{"detune":0,"playbackRate":1,"volume":0,"decay":1.5,"distortion":0.4,"low":0,"mid":0,"high":0},"effectsToggles":{}}],"image":{"url":"https://media0.giphy.com/media/amrNGnZUeWhZC/giphy.gif?cid=d7cbe08a2tq0q4ivwbcu16s5w1jg392u6cdni58f2llbzlux&rid=giphy.gif","filter":"nashville"}}';

const serializedLofi3 =
  '{"players":[{"trackId":"4283c0b7-6704-4596-af2a-17a3db794e02","title":"Pokemon - Trainer Red Epic Remix","duration":327422,"originalDuration":327422,"startTime":0,"url":"https://api.soundcloud.com/tracks/98448840/stream?client_id=b8f06bbb8e4e9e201f9e6e46001c3acb","effects":{"detune":-595.2338981178563,"playbackRate":1,"volume":0,"decay":5.180569529430858,"distortion":0.4,"low":0,"mid":0,"high":0},"effectsToggles":{"Reverb":true}},{"trackId":"e9597f8c-962d-4703-b483-9a109b1a6506","title":"Do I Wanna Know?","duration":223655,"originalDuration":223655,"startTime":5.320665083135392,"url":"https://api.soundcloud.com/tracks/159459022/stream?client_id=b8f06bbb8e4e9e201f9e6e46001c3acb","effects":{"detune":0,"playbackRate":1.4959148645083982,"volume":0,"decay":1.5,"distortion":0.4,"low":0,"mid":0,"high":0},"effectsToggles":{}},{"trackId":"7ccd22a9-4cf4-40f7-8826-c411592d40e1","title":"Rain, Moderate, A.wav","duration":60101.799999999996,"originalDuration":60101.799999999996,"startTime":19.95249406175772,"url":"https://freesound.org/data/previews/401/401277_5121236-hq.mp3","effects":{"detune":0,"playbackRate":1,"volume":0,"decay":1.5,"distortion":0.4,"low":7.456450730389264,"mid":0,"high":0},"effectsToggles":{"EQ3":true}}],"image":{"url":"https://media2.giphy.com/media/MHeRWphHGxxmM/giphy.gif?cid=d7cbe08a9lyg9q43rsgpimmgjq34wj8cfe2b8to2ujuvmw0t&rid=giphy.gif","filter":"nashville"}}';

const serializedLofi =
  '{"players":[{"trackId":"c349cec0-c3f7-4d37-8cf6-dfb4e2bd227f","title":"Determination - Undertale Parody (Parody Of Irresistible - Fall Out Boy) (1)","duration":191155,"originalDuration":191155,"startTime":2.4376731301939056,"url":"https://api.soundcloud.com/tracks/284650298/stream?client_id=b8f06bbb8e4e9e201f9e6e46001c3acb","effects":{"detune":464.9666806762566,"playbackRate":1.2526556654692362,"volume":6.801002996424089,"decay":4.22195609480703,"distortion":0.9197551606586913,"low":4.4774343201801585,"mid":7.932759972942037,"high":5.29533323559124},"effectsToggles":{"EQ3":true,"Distortion":true,"Reverb":true}},{"trackId":"419b38f2-164a-42c5-966e-21675b0e5bc3","title":"Heavy Rain","duration":103468,"originalDuration":103468,"startTime":10.193905817174516,"url":"https://freesound.org/data/previews/243/243627_3509815-hq.mp3","effects":{"detune":-665.9312929934754,"playbackRate":1.5138502193303343,"volume":5.662391063814546,"decay":3.8180703276365713,"distortion":0.17548439150544373,"low":-6.09247851819285,"mid":-7.239848460945458,"high":-8.245754126473566},"effectsToggles":{}}],"image":{"url":"https://media1.giphy.com/media/U2nN0ridM4lXy/giphy.gif?cid=d7cbe08ayqmjschuxpnknhkbag4cbg6pg8hyhwm0pm1z9t3v&rid=giphy.gif","filter":"toaster"}}';
const deserializedLofi = JSON.parse(serializedLofi);

const onloadPlayer = (player) => {
  Object.entries(player.effectsToggles).forEach(([k,isOn]) => {
    if(k === 'Reverb' && isOn){
      const reverberation = new Reverb().toDestination();
      reverberation.decay = player.effects.decay;
      player.player.connect(reverberation);
    }
    if(k === 'Distortion' && isOn){
      const distortion = new Distortion().toDestination();
      distortion.distortion = player.effects.distortion;
      player.player.connect(distortion);
    }
    if(k === 'EQ3'&& isOn){
      const equalizer = new EQ3().toDestination();
      equalizer.low.value = player.effects.low;
      equalizer.mid.value = player.effects.mid;
      equalizer.high.value = player.effects.high;
      player.player.connect(equalizer);
    }
  });

  // const reverberation = new Reverb().toDestination();
  // const distortion = new Distortion().toDestination();
  // const equalizer = new EQ3().toDestination();
  //
  // reverberation.decay = player.effects.decay;
  // distortion.distortion = player.effects.distortion;
  // equalizer.low.value = player.effects.low;
  // equalizer.mid.value = player.effects.mid;
  // equalizer.high.value = player.effects.high;


  //disponse old players
  // if (oldPlayer !== undefined) {
  //   oldPlayer.dispose();
  // }
debugger
  player.sync(player.startTime).start();
  //increment loaded players to track if all are loaded
};

const loadPlayer = playerData => {
  debugger
  const player = new MusicTrackPlayer(
    new GrainPlayer({
      url: playerData.url,
      onerror: e => {
        // eslint-disable-next-line no-console
        console.log('error loading buffer for player ' + e);
      },
      onload: () => {
        player.onload();
      },
    }),
    playerData.trackId,
    playerData.title,
    playerData.duration,
    newPlayer => onloadPlayer(newPlayer),
    playerData.url,
    playerData.startTime,
    playerData.effects,
    playerData.effectsToggles
  );
  return player;
};

const LoFiLoader = () => {
  const {addPlayer, stopAll, playAll} = usePlayers();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {data: imageData, run, isLoading, isError, isSuccess} = useAsync();

  function loadLofi() {
    loadImage(deserializedLofi.image.url);
    deserializedLofi.players
      .map(loadPlayer)
      .forEach(player => addPlayer(player.trackId, player));
    setIsDialogOpen(true);
    stopAll();
    playAll();
  }

  function loadImageFromUrl(url) {
    return new Promise(function (resolve, reject) {
      const image = new Image();
      image.addEventListener('load', () => resolve(url));
      image.addEventListener('error', () => reject('Error loading image'));
      image.src = url;
    });
  }

  const loadImage = useCallback(
    url => {
      run(loadImageFromUrl(url));
    },
    [run],
  );

  return (
    <div>
      <Button onClick={loadLofi} />
      <FinalImageContainer
        finalImage={imageData}
        finalImageFilter={deserializedLofi.image.filter}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default LoFiLoader;
