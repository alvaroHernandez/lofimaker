/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useState} from "react";
import UrlForm from "../UrlForm/UrlForm";
import {dark, lighter} from "../../styles/colors";
import Spinner from "../Spinner/Spinner";

const ImageLoader = () => {

    const [imageUrl,setImageUrl] = useState();
    const [loadState,setLoadState] = useState('');

    function loadImage({url}){
        setLoadState('loading');
        setImageUrl(url);
    }

    function loadingImage(){
        setLoadState(true);
    }

    function imageLoaded(){
        setLoadState('loaded');
    }

    function imageNotLoaded(){
        setLoadState('error');
    }

    return (
        <div>
            <div css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1em'
            }}>
                {loadState === 'loading' && <Spinner/> }
                {loadState === 'error' && 'Error Loading Image, try with another URL' }
                <img style={loadState !== 'loaded' ? { display: 'none' } :  {}}
                     onLoadStart={loadingImage}
                     onLoad={imageLoaded}
                     onError={imageNotLoaded}
                     width={'100%'}
                     src={imageUrl}
                     alt={'custom user loaded'}/>
            </div>
            <UrlForm onSubmit={loadImage} buttonText={'Load Image'}/>
        </div>)
};

export default ImageLoader;
