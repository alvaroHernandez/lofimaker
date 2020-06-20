import React, {useEffect, useState} from "react";
import styled from "styled-components";
import kick from '../../assets/sounds/kick1.aif.mp3';
import hihat from '../../assets/sounds/cl_hihat.aif.mp3';
import snare from '../../assets/sounds/snare.aif.mp3';

const separation = '0.5em';
const totalMeasures = 16;

const StyledBeatsCreator = styled.div`
    background-color: #61dafb;
    display: grid;
    grid-gap: ${separation};
    grid-template-columns: 1fr 10fr;
    grid-template-rows: 1fr;
    grid-template-areas: "trackInstrument trackBeats";
`;

const TrackInstrument = styled.div`
    background-color: #282c34;
    display: grid;
    grid-gap: ${separation};
    grid-area: trackInstrument;
`;

const TrackBeats = styled.div`
    background-color: red;
    display: grid;
    grid-gap: ${separation};
    grid-area: trackBeats;
    grid-template-columns: repeat(${totalMeasures},  1fr);
`;

const StyledBeat = styled.div`
    border: 1px solid blue;
    background-color: ${props => props.isOn ? 'green' : 'yellow'};
    width: 30px;
    height: 30px;
`;

const Beat = ({ trackName, beatIndex, clickHandler}) => {
    const [isOn,setIsOn] = useState(false);
    function toggle(trackName,beatIndex)  {
        clickHandler(trackName,beatIndex);
        setIsOn(!isOn);
    }
    return <StyledBeat isOn={isOn} onClick={() => toggle(trackName, beatIndex)}/>;
};

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
            setPlayer(clearInterval(player))
        }
    }
    function play() {
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
                {currentBeat}
                <TrackInstrument onClick={play}/>
                <div onClick={stop}>
                    Stop
                </div>
                <TrackBeats>
                    {Object.keys(tracks).map((track) => renderBeats(track,totalMeasures))}
                </TrackBeats>
            </StyledBeatsCreator>
    );
};

export default BeatsCreator;
