/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useEffect, useState} from 'react';
import Button from "../Button/Button";
import SimpleForm from "../SimpleForm/SimpleForm";
import MusicGrid from "../MusicGrid/MusicGrid";
import Box from "../BoxWithCenteredText/Box";

const MusicSelector = () => {

    const [soundCloudClient,setSoundCloudClient] = useState();
    const [currentSong,setCurrentSong] = useState();
    const [currentSongTitle,setCurrentSongTitle] = useState('Search and select a song...');
    const [tracks,setTracks] = useState([]);

    useEffect(()=>{
        const SC =require('soundcloud');
        setSoundCloudClient(SC);

        SC.initialize({
            client_id: process.env.REACT_APP_SOUND_CLOUD_CLIENT_ID,
        });
    },[]);

    function search({query}) {
        // SC.resolve(inputField.value).then(streamTrack);
        soundCloudClient.get('/tracks', {
            q: query
        }).then(function (tracks) {
            setTracks(tracks);
        });
    }

    function playIt(){
        if(currentSong!==undefined){
            currentSong.play();
        }
    }

    function stop() {
        if(currentSong!==undefined) {
            currentSong.pause();
        }
    }

    function clickHandler({id,title}) {
        setCurrentSongTitle(title);
        soundCloudClient.stream(`/tracks/${id}`).then((player) =>{
            setCurrentSong(player);
        });
    }

    return (
        <div>
            <Box>{currentSongTitle}</Box>
            <SimpleForm inputText={'Song Name'} buttonText={'Search'} onSubmit={search} inputName={'query'}/>
            <MusicGrid clickHandler={clickHandler} tracks={tracks}/>
            <Button css={{marginRight: '1em'}} variant={'secondary'} onClick={playIt}>Play</Button>
            <Button variant={'secondary'} onClick={stop}>Stop</Button>
        </div>
    );
};

export default MusicSelector;
