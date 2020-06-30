/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useRef, useState} from 'react'
import Button from '../Button/Button'
import SimpleForm from '../SimpleForm/SimpleForm'
import MusicGrid from '../MusicGrid/MusicGrid'
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent'
import SoundCloudClient from '../../clients/SoundCloudClient'
import {useAsync} from '../../hooks/useAsync'
import Track from '../Track/Track'
import {Distortion, Player, Reverb} from 'tone'
import Tone from '../../Tone/Tone'
var reverb = new Reverb().toDestination()
var distortion = new Distortion().toDestination()

const MusicSelector = () => {
  const soundCloudClient = useRef(new SoundCloudClient())
  const {data, error, run, isLoading, isError, isSuccess} = useAsync()

  const [player, setPlayer] = useState()
  const [currentSongUrl, setCurrentSongUrl] = useState()
  const [currentSongTitle, setCurrentSongTitle] = useState()
  const [currentSongDuration, setCurrentSongDuration] = useState()

  function search({query}) {
    run(soundCloudClient.current.search(query))
  }

  function playIt() {
    if (currentSongUrl !== undefined) {
      const player = new Player(currentSongUrl).toDestination()
      player.autostart = true
      setPlayer(player)
    }
  }

  function stop() {
    if (currentSongUrl !== undefined) {
      player.stop()
    }
  }

  function clickHandler({id, title, duration, streamUrl}) {
    setCurrentSongTitle(title)
    setCurrentSongDuration(duration)
    soundCloudClient.current.stream(streamUrl).then(response => {
      setCurrentSongUrl(response)
    })
  }

  return (
    <div>
      <BoxWithCenteredContent>
        {currentSongTitle ? (
          <div>
            {currentSongTitle}
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
          <Tone
            player={player}
            name={'reverb'}
            effect={reverb}
            property={'decay'}
            from={0.001}
            to={10}
            step={0.1}
          />
          <Tone
            player={player}
            name={'distortion'}
            effect={distortion}
            property={'distortion'}
            from={0.001}
            to={3}
            step={0.01}
          />
          <Tone
            player={player}
            name={'speed'}
            effect={player}
            property={'playbackRate'}
            form={0.1}
            to={1}
            step={0.01}
          />
        </div>
      )}
    </div>
  )
}

export default MusicSelector
