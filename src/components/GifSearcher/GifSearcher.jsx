import React from 'react';
import SimpleForm from '../SimpleForm/SimpleForm';
import {searchGif} from '../../clients/searchGif';
import {dark} from '../../styles/colors';
import {useAsync} from '../../hooks/useAsync';
import GifGrid from '../GifGrid/GifGrid';
import {GoSearch} from 'react-icons/go';

const GifSearcher = ({clickHandler}) => {
  const {data, error, run, isLoading, isError, isSuccess} = useAsync();
  const [query, setQuery] = React.useState();
  const [queried, setQueried] = React.useState(false);

  React.useEffect(() => {
    if (!queried) {
      return;
    }
    run(searchGif(encodeURIComponent(query)));
  }, [query, queried, run]);

  function handleSearchSubmit({search}) {
    setQueried(true);
    setQuery(search);
  }

  return (
    <div>
      <SimpleForm
        placeholder={'search a gif here...'}
        onSubmit={handleSearchSubmit}
        buttonText={<GoSearch />}
        inputName={'search'}
        isLoading={isLoading}
      />

      {isError ? (
        <div css={{color: dark}}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isSuccess && <GifGrid clickHandler={clickHandler} gifs={data.data} />}
    </div>
  );
};

export default GifSearcher;
