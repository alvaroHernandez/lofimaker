/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useState} from 'react'
import SimpleForm from '../SimpleForm/SimpleForm'
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@reach/tabs'
import '@reach/tabs/styles.css'
import GifSearcher from '../GifSearcher/GifSearcher'
import {useAsync} from '../../hooks/useAsync'
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent'
import AutoFitGrid from '../AutoFitGrid/AutoFitGrid'
import Button from '../Button/Button'

// const FullWidthFigure = styled.figure`
//   wid
// `

const classes = ['normal', 'toaster', 'reyes', 'nashville']

const ImageLoader = ({updateFinalImage, setGlobalFilter}) => {
  const {data, run, isLoading, isError, isSuccess} = useAsync()
  const [imageUrl, setImageUrl] = useState()
  const [currentClass, setCurrentClass] = useState('')

  function loadImageFromUrl(url) {
    return new Promise(function (resolve, reject) {
      const image = new Image()
      image.addEventListener('load', () => resolve(url))
      image.addEventListener('error', () => reject('Error loading image'))
      image.src = url
    })
  }

  function loadImage({url}) {
    if (imageUrl !== url) {
      setImageUrl(url)
      run(loadImageFromUrl(url))
    }
  }

  function renderImage() {
    if (isError) {
      return <span>Error Loading Image, try with another URL</span>
    } else if (isSuccess) {
      updateFinalImage(data)
      return (
        <figure css={{width: '50%'}} className={currentClass}>
          <img width={'100%'} src={data} alt={'custom user loaded'} />
        </figure>
      )
    } else {
      return <span>First, load an Image choosing an option below</span>
    }
  }

  function applyFilter(filter) {
    setCurrentClass(filter)
    setGlobalFilter(filter)
  }

  return (
    <div>
      <div>
        <BoxWithCenteredContent>{renderImage()}</BoxWithCenteredContent>
        <AutoFitGrid>
          {classes.map(filter => (
            <Button variant={'secondary'} onClick={() => applyFilter(filter)}>
              {filter}
            </Button>
          ))}
        </AutoFitGrid>
      </div>
      <Tabs>
        <TabList>
          <Tab>Search a Gif</Tab>
          <Tab>Load Image from URL</Tab>
        </TabList>
        <TabPanels css={{padding: '1em'}}>
          <TabPanel>
            <GifSearcher clickHandler={loadImage} />
          </TabPanel>
          <TabPanel>
            <SimpleForm
              onSubmit={loadImage}
              buttonText={'Load Image'}
              inputText={'load image url'}
              inputName={'url'}
              isLoading={isLoading}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default ImageLoader
