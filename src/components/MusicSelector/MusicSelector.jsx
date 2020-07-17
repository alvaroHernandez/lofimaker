/* eslint-disable react/prop-types */
/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import SimpleForm from '../SimpleForm/SimpleForm';
import MusicGrid from '../MusicGrid/MusicGrid';
import {useAsync} from '../../hooks/useAsync';

const MusicSelector = ({soundClient, selectionHandler}) => {
  const {data, error, run, isLoading, isError, isSuccess} = useAsync();

  function search({query}) {
    run(soundClient.search(query));
  }

  function handleClick({id, title, duration, streamUrl}) {
    selectionHandler(() =>
      soundClient.stream(streamUrl).then(url => {
        return {title, duration, url};
      }),
    );
  }

  return (
    <div>
      <SimpleForm
        buttonText={'Search'}
        onSubmit={search}
        inputName={'query'}
        isLoading={isLoading}
        placeholder={'Search here...'}
        buttonVariant={'primary'}
      />

      {isError ? (
        <div>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isSuccess && <MusicGrid clickHandler={handleClick} tracks={data} />}
    </div>
  );
};

export default MusicSelector;
