import {client} from './baseClient';

async function save(loFiData) {
  return client(`${process.env.REACT_APP_BACKEND_URL}lofi/`, {
    data: loFiData,
  });
}

async function getAll() {
  return client(`${process.env.REACT_APP_BACKEND_URL}lofi`);
}

export {
  getAll,
  save,
};
