import {client} from './baseClient';

function searchGif(query) {
  return client(`${process.env.REACT_APP_BACKEND_URL}gif/search?q=${query}`);
}

export {searchGif};
