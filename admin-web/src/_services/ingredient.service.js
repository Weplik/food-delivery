import axios from 'axios';

export const ingredientsService = { getList, disable, enable, create, update };

async function getList(params) {
  const requestOptions = {
    method: 'GET',
    url: '/api/ingredients',
    params,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function disable(id) {
  const requestOptions = {
    method: 'PUT',
    url: `/api/ingredients/${id}/disable`,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function enable(id) {
  const requestOptions = {
    method: 'PUT',
    url: `/api/ingredients/${id}/enable`,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function create(value) {
  const requestOptions = {
    method: 'POST',
    url: '/api/ingredients/',
    data: value,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function update(value) {
  const requestOptions = {
    method: 'PUT',
    url: `/api/ingredients/${value.id}`,
    data: value,
  };

  const { data } = await axios(requestOptions);

  return data;
}
