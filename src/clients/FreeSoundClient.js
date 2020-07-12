class FreeSoundClient {
  search(query) {
    return fetch(
      `${process.env.REACT_APP_BACKEND_URL}sound/search?q=${query}`,
    ).then(async response => {
      if (response.ok) {
        return await response.json();
      }
    });
  }

  stream(trackUrl) {
    return Promise.resolve(trackUrl.replace('http:', 'https:'));
  }
}

export default FreeSoundClient;
