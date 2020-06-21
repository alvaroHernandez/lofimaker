import styled from '@emotion/styled/macro'
import React, {useState} from "react";
import {light, lighter} from "../../styles/colors";

const StyledBeat = styled.div`
    background-color: ${props => props.isOn ? light : lighter};
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

export default Beat;
