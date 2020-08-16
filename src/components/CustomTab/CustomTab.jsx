import React from 'react';
import {Tab, useTabsContext} from '@reach/tabs';
import {dark, darker} from '../../styles/colors';

function CustomTab({index, ...props}) {
  const {selectedIndex} = useTabsContext();
  return (
    <Tab
      style={{
        backgroundColor: `${selectedIndex === index ? dark : darker}`,
      }}
      {...props}
    />
  );
}

export default CustomTab;
