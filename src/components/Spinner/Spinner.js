import {FaSpinner} from 'react-icons/fa';
import styled from '@emotion/styled/macro';
import {keyframes} from '@emotion/core';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(FaSpinner)({
  animation: `${rotate} 1s ease infinite`,
});

export default Spinner;
