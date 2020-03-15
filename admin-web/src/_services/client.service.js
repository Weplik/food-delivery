import axios from 'axios';

export const clientsService = { getList };

async function getList(params) {
  const requestOptions = {
    method: 'GET',
    url: '/api/clients',
    params,
  };

  const { data } = await axios(requestOptions);

  return data;
}
