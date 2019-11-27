import axios from 'axios';

export const usersService = { getList };

async function getList(params) {
  const requestOptions = {
    method: 'GET',
    url: '/api/users',
    params,
  };

  const { data } = await axios(requestOptions);

  return data;
}
