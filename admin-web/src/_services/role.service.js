import axios from 'axios';

export const rolesService = { getList };

async function getList(params) {
  const requestOptions = {
    method: 'GET',
    url: '/api/roles',
    params,
  };

  const { data } = await axios(requestOptions);

  return data;
}
