import React from 'react';
import {Tab, useTabsContext} from '@reach/tabs';
import {dark, darker} from '../../styles/colors';

function CustomTab({index, ...props}) {
  const {selectedIndex} = useTabsContext();
  return (
    <Tab
      style={{
        backgroundColor: `${selectedIndex === index ? '#FE5B5C' : '#FE4A5C'}`,
        outline: 0,
      }}
      {...props}
    />
  );
}

export default CustomTab;
