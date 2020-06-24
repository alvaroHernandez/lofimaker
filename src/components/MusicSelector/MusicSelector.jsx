/** @jsx jsx */
import {jsx} from '@emotion/core'
import React, { useRef, useState} from 'react';
import Button from "../Button/Button";
import SimpleForm from "../SimpleForm/SimpleForm";
import MusicGrid from "../MusicGrid/MusicGrid";
import Box from "../BoxWithCenteredText/Box";
import SoundCloudClient from "../../clients/SoundCloudClient";
import {useAsync} from "../../hooks/useAsync";

const MusicSelector = () => {

    const soundCloudClient = useRef(new SoundCloudClient());
    const {data, error, run, isLoading, isError, isSuccess} = useAsync();

    const [currentSong,setCurrentSong] = useState();
    const [currentSongTitle,setCurrentSongTitle] = useState();

    function search({query}) {
        run(soundCloudClient.current.search(query));
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
        soundCloudClient.current.stream(`/tracks/${id}`).then((player) =>{
            setCurrentSong(player);
        });
    }

    return (
        <div>
            <Box>
                {currentSongTitle ?
                <div>
                    {currentSongTitle}
                    <Button css={{margin: '0 1em'}} variant={'secondary'} onClick={playIt}>Play</Button>
                    <Button variant={'secondary'} onClick={stop}>Stop</Button>
                </div>
                    : 'Search and select a song...'
                }
            </Box>
            <SimpleForm inputText={'Song Name'} buttonText={'Search'} onSubmit={search} inputName={'query'} isLoading={isLoading}/>

            {isError ? (
                <div>
                    <p>There was an error:</p>
                    <pre>{error.message}</pre>
                </div>
            ) : null
            }

            {isSuccess &&
                <MusicGrid clickHandler={clickHandler} tracks={data}/>
            }
        </div>
    );
};

export default MusicSelector;
