import styled from '@emotion/styled/macro'
import React, {useEffect, useState} from "react";
import kick from '../../assets/sounds/kick1.aif.mp3';
import hihat from '../../assets/sounds/cl_hihat.aif.mp3';
import snare from '../../assets/sounds/snare.aif.mp3';
import Beat from "../Beat/Beat";
import Button from "../Button/Button";

const separation = '0.5em';
const totalMeasures = 16;

const tracks = {
    "kick": {
        "sound": kick,
    },
    "snare": {
        "sound": snare,
    },
    "hihat": {
        "sound": hihat
    }
};

const StyledBeatsCreator = styled.div`
    display: grid;
    grid-gap: ${separation};
    grid-template-columns: 1fr 10fr;
    grid-template-rows: 2fr 1fr;
    grid-template-areas: "trackInstrument trackBeats" "trackControls trackControls";
    overflow: scroll;
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
    display: grid;
    grid-gap: ${separation};
    grid-area: trackControls;
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
        for(let i = 0; i < 16; i++){
            setBeats(beats => [...beats,{}]);
        }
    },[]);

    function stop() {
        if (player != undefined) {
            clearInterval(player);
            setPlayer();
            setCurrentBeat(0);
        }
    }
    function play() {
        if (player != undefined) {
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
            <StyledBeatsCreator>
                <TrackInstrumentsContainer>
                    {Object.keys(tracks).map((track) => <TrackInstrument>
                        {track}
                    </TrackInstrument>)}
                </TrackInstrumentsContainer>
                <TrackBeats>
                    {Object.keys(tracks).map((track) => renderBeats(track,totalMeasures))}
                </TrackBeats>
                <TrackControls>
                    <TrackControl>
                        {currentBeat}
                    </TrackControl>
                    <TrackControl>
                        <Button onClick={play}>Play</Button>
                    </TrackControl>
                    <TrackControl>
                        <Button onClick={stop}>Stop</Button>
                    </TrackControl>
                </TrackControls>
            </StyledBeatsCreator>
    );
};

export default BeatsCreator;
