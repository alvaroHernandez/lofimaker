/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useState} from 'react'
import {Layout, Column} from '../Layout/Column'
import BeatsCreator from '../BeatsCreator/BeatsCreator'
import '@reach/dialog/styles.css'
import ImageLoader from '../ImageLoader/ImageLoader'
import {dark, light} from '../../styles/colors'
import '@reach/tabs/styles.css'
import MusicSelector from '../MusicSelector/MusicSelector'
import Section from '../Section/Section'
import Header from '../Header/Header'
import Button from '../Button/Button'
import FinalImageModal from '../FinalImageModal/FinalImageModal'
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent'
import AutoFitGrid from '../AutoFitGrid/AutoFitGrid'

const LoFiMaker = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [finalImage, setFinalImage] = useState()
  const [finalImageFilter, setFinalImageFilter] = useState()
  const [tracks, setTracks] = useState([])

  const updateFinalImage = imageSrc => {
    setFinalImage(imageSrc)
  }

  const addTrack = type => {
    switch (type) {
      case 'sound':
        setTracks([
          ...tracks,
          <Section>
            <MusicSelector />
          </Section>,
        ])
        break
      case 'drum':
        setTracks([
          ...tracks,
          <Section>
            <BeatsCreator />
          </Section>,
        ])
        break
    }
  }

  return (
    <Layout color={'white'} backgroundColor={light}>
      <Column backgroundColor={dark} spanSmall={10} spanMedium={12}>
        <Header />
        <Section>
          <ImageLoader
            setGlobalFilter={setFinalImageFilter}
            updateFinalImage={updateFinalImage}
          />
        </Section>
        <Section>
          <BoxWithCenteredContent>
            Now add as many tracks as you want!
          </BoxWithCenteredContent>
          <AutoFitGrid>
            <Button variant={'secondary'} onClick={() => addTrack('sound')}>
              Sound
            </Button>
            <Button variant={'secondary'} onClick={() => addTrack('melody')}>
              Melody
            </Button>
            <Button variant={'secondary'} onClick={() => addTrack('drum')}>
              Drum
            </Button>
            <Button variant={'secondary'} onClick={() => addTrack('bass')}>
              Bass
            </Button>
          </AutoFitGrid>
        </Section>
        {tracks}
        <FinalImageModal
          imageFilter={finalImageFilter}
          setIsDialogOpen={setIsDialogOpen}
          isDialogOpen={isDialogOpen}
          image={finalImage}
        />
        {finalImage && (
          <Section>
            <Button
              css={{
                width: '100%',
              }}
              variant={'secondary'}
              onClick={() => setIsDialogOpen(true)}
            >
              {"I'm Ready!"}
            </Button>
          </Section>
        )}
      </Column>
    </Layout>
  )
}

export default LoFiMaker
