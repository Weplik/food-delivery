import axios from 'axios';

export const usersService = {
  getList,
  disable,
  enable,
  getActiveRoles,
  create,
  update,
};

async function getList(params) {
  const requestOptions = {
    method: 'GET',
    url: '/api/users',
    params,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function disable(username) {
  const requestOptions = {
    method: 'PUT',
    url: `/api/users/${username}/disable`,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function enable(username) {
  const requestOptions = {
    method: 'PUT',
    url: `/api/users/${username}/enable`,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function getActiveRoles() {
  const requestOptions = {
    method: 'GET',
    url: '/api/roles/active',
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function create(value) {
  const requestOptions = {
    method: 'POST',
    url: '/api/users/',
    data: value,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function update(value) {
  const requestOptions = {
    method: 'PUT',
    url: `/api/users/${value.username}`,
    data: value,
  };

  const { data } = await axios(requestOptions);

  return data;
}
