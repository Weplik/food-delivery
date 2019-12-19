import axios from 'axios';

export const authService = { signIn, info };

async function signIn(values) {
  const requestOptions = {
    method: 'POST',
    url: '/api/auth/signIn',
    data: { ...values },
  };

  const { data } = await axios(requestOptions);

  localStorage.setItem('accessToken', data.accessToken);

  return data.user;
}

async function info() {
  const requestOptions = {
    method: 'GET',
    url: '/api/auth/info',
  };

  const { data } = await axios(requestOptions);

  return data;
}
