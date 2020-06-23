console.log(process.env.REACT_APP_GIPHY_API_KEY);
function client(query, customConfig = {}) {
    const config = {
        method: 'GET',
        ...customConfig,
    };

    return window
        .fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=25&offset=0&rating=G&lang=en&q=${query}`, config)
        .then(async response => {
            const data = await response.json();
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}

export {client}
