import {client} from "./baseClient";

function searchGif(query) {
    return client(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=25&offset=0&rating=G&lang=en&q=${query}`)
}

export { searchGif }
