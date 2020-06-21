/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useState} from "react";
import SimpleForm from "../SimpleForm/SimpleForm";

const ImageLoader = () => {

    const [imageUrl,setImageUrl] = useState();
    const [isLoading,setIsLoading] = useState(false);
    const [loadState,setLoadState] = useState('');

    function loadImage({url}){
        if(imageUrl !== url){
            setIsLoading(true);
            setImageUrl(url);
        }
    }

    function loadingImage(){
        setIsLoading(true);
    }

    function imageLoaded(){
        setLoadState('loaded');
        setIsLoading(false);
    }

    function imageNotLoaded(){
        console.log('error')

        setLoadState('error');
        setIsLoading(false);
    }

    return (
        <div>
            <div css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1em'
            }}>
                {loadState === 'error' && 'Error Loading Image, try with another URL' }
                <img style={loadState !== 'loaded' ? { display: 'none' } :  {}}
                     onLoadStart={loadingImage}
                     onLoad={imageLoaded}
                     onError={imageNotLoaded}
                     onErrorCapture={imageLoaded}

                     width={'100%'}
                     src={imageUrl}
                     alt={'custom user loaded'}/>
            </div>
            <SimpleForm onSubmit={loadImage} buttonText={'Load Image'} inputText={'load image url'} inputName={'url'} isLoading={isLoading}/>
        </div>)
};

export default ImageLoader;
