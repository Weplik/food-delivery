import axios from 'axios';

export const ingredientsService = { getList };

async function getList(params) {
  const requestOptions = {
    method: 'GET',
    url: '/api/ingredients',
    params,
  };

  const { data } = await axios(requestOptions);

  return data;
}
