import axios from 'axios';

export const productService = {
  getList,
  disable,
  enable,
  create,
  update,
  getActiveIngredients,
};

async function getList(params) {
  const requestOptions = {
    method: 'GET',
    url: '/api/products',
    params,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function disable(id) {
  const requestOptions = {
    method: 'PUT',
    url: `/api/products/${id}/disable`,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function enable(id) {
  const requestOptions = {
    method: 'PUT',
    url: `/api/products/${id}/enable`,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function create(value) {
  const requestOptions = {
    method: 'POST',
    url: '/api/products/',
    data: value,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function update(value) {
  const requestOptions = {
    method: 'PUT',
    url: `/api/products/${value.id}`,
    data: value,
  };

  const { data } = await axios(requestOptions);

  return data;
}

async function getActiveIngredients() {
  const requestOptions = {
    method: 'GET',
    url: '/api/ingredients/active',
  };

  const { data } = await axios(requestOptions);

  return data;
}
