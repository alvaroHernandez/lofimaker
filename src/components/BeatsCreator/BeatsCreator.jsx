import styled from '@emotion/styled/macro'
import React, {useEffect, useState} from "react";
import Beat from "../Beat/Beat";
import Button from "../Button/Button";
import Box from "../BoxWithCenteredText/Box";
import {tracks} from "../../assets/sounds/tracks";

const separation = '0.5em';
const totalMeasures = 20;

const BeatsCreatorGrid = styled.div`
    display: grid;
    grid-gap: ${separation};
    grid-template-columns: 1fr 10fr;
    grid-template-areas: "trackInstrument trackBeats";
`;

const TrackInstrumentsContainer = styled.div`
    display: grid;
    grid-gap: ${separation};
    grid-area: trackInstrument;
`;

const TrackInstrument = styled.div`
    align-items: center;
    display: flex;
`;

const TrackBeats = styled.div`
    display: grid;
    grid-gap: ${separation};
    grid-area: trackBeats;
    grid-template-columns: repeat(${totalMeasures},  1fr);
`;

const TrackControls = styled.div`
    margin-top: 1em;
    display: grid;
    grid-gap: ${separation};
    grid-template-columns: 60px 60px 60px;
`;

const TrackControl = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BeatsCreator = () => {
    const [currentBeat,setCurrentBeat] = useState(0);
    const [beats,setBeats] = useState([]);
    const [player, setPlayer] = useState();

    useEffect(()=>{
        for(let i = 0; i < totalMeasures; i++){
            setBeats(beats => [...beats,{}]);
        }
    },[]);

    function stop() {
        if (player !== undefined) {
            clearInterval(player);
            setPlayer();
            setCurrentBeat(0);
        }
    }
    function play() {
        if (player !== undefined) {
            return;
        }
        let beat = 0;
        setPlayer(window.setInterval(function()
        {
            for (let [, value] of Object.entries(beats[beat])) {
                value.play();
            }

            beat += 1;
            if(beat === beats.length){
                beat=0;
            }
            setCurrentBeat(beat);
        }, 100));
    }

    const toggleBeat = (trackName,beatIndex) => {
        if (beats[beatIndex][trackName] === undefined){
            beats[beatIndex][trackName] = new Audio(tracks[trackName].sound);
        }else{
            delete beats[beatIndex][trackName]
        }
    };

    function renderBeats(trackName, totalMeasures) {
        const beatsSquares = [];
        for (let i = 0; i < totalMeasures; i++) {
            beatsSquares.push(<Beat key={`trackName-${i}`} trackName={trackName} beatIndex={i} clickHandler={toggleBeat}/>);
        }
        return beatsSquares;
    }

    return (
        <div>
            <Box>Make your own beat!</Box>
            <BeatsCreatorGrid>
                <TrackInstrumentsContainer>
                    {Object.keys(tracks).map((track) =>
                        <TrackInstrument id={{track}}>
                            {track}
                        </TrackInstrument>
                    )}
                </TrackInstrumentsContainer>
                <TrackBeats>
                    {Object.keys(tracks).map((track) => renderBeats(track,totalMeasures))}
                </TrackBeats>
            </BeatsCreatorGrid>
            <TrackControls>
                <TrackControl>
                    <Button variant={'secondary'} onClick={play}>Play</Button>
                </TrackControl>
                <TrackControl>
                    <Button variant={'secondary'} onClick={stop}>Stop</Button>
                </TrackControl>
                <TrackControl>
                    {currentBeat}
                </TrackControl>
            </TrackControls>
        </div>

    );
};

export default BeatsCreator;
