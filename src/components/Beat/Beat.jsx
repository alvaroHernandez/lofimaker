import styled from '@emotion/styled/macro';
import React, {useState} from 'react';
import {alternative, light, lighter} from '../../styles/colors';

const StyledBeat = styled.div`
  background-color: ${props =>
  props.isHighlighted ? alternative : props.isOn ? light : lighter};
  width: 30px;
  height: 30px;
  margin-right: ${props => props.addMoreMargin ? '14px' : 'inherit'};
`;

const Beat = ({trackName, beatIndex, clickHandler, isHighlighted, addMoreMargin}) => {
  const [isOn, setIsOn] = useState(false);
  function toggle(trackName, beatIndex) {
    clickHandler(trackName, beatIndex);
    setIsOn(!isOn);
  }
  return (
    <StyledBeat
      addMoreMargin={addMoreMargin}
      isHighlighted={isHighlighted}
      isOn={isOn}
      onClick={() => toggle(trackName, beatIndex)}
    />
  );
};

export default Beat;
