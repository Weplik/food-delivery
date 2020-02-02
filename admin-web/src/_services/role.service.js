import axios from 'axios';

export const rolesService = { getList, disable, enable, create, update };

async function getList(params) {
  const requestOptions = {
    method: 'GET',
    url: '/api/roles',
    params,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function disable(id) {
  const requestOptions = {
    method: 'PUT',
    url: `/api/roles/${id}/disable`,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function enable(id) {
  const requestOptions = {
    method: 'PUT',
    url: `/api/roles/${id}/enable`,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function create(value) {
  const requestOptions = {
    method: 'POST',
    url: '/api/roles/',
    data: value,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function update(value) {
  const requestOptions = {
    method: 'PUT',
    url: `/api/roles/${value.id}`,
    data: value,
  };

  const { data } = await axios(requestOptions);

  return data;
}
