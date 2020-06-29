/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useState} from 'react'
import SimpleForm from '../SimpleForm/SimpleForm'
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@reach/tabs'
import '@reach/tabs/styles.css'
import GifSearcher from '../GifSearcher/GifSearcher'
import {useAsync} from '../../hooks/useAsync'
import Box from '../BoxWithCenteredText/Box'

const ImageLoader = ({updateFinalImage}) => {
  const {data, run, isLoading, isError, isSuccess} = useAsync()
  const [imageUrl, setImageUrl] = useState()

  function loadImageFromUrl(url) {
    return new Promise(function (resolve, reject) {
      const image = new Image()
      image.addEventListener('load', () => resolve(url))
      image.addEventListener('error', () => reject('Error loading image'))
      image.src = url
    })
  }

  function loadImage({url}) {
    console.log(url)
    if (imageUrl !== url) {
      setImageUrl(url)
      run(loadImageFromUrl(url))
    }
  }

  function renderMessage() {
    if (isError) {
      return <span>Error Loading Image, try with another URL</span>
    } else if (isSuccess) {
      updateFinalImage(data)
      return <img width={'100%'} src={data} alt={'custom user loaded'} />
    } else {
      return <span>Load an Image choosing an option below</span>
    }
  }

  return (
    <div>
      <div>
        <Box>{renderMessage()}</Box>
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
