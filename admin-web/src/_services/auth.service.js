import axios from 'axios';

export const authService = { signIn };

async function signIn(values) {
  const requestOptions = {
    method: 'POST',
    url: '/api/auth/signIn',
    data: { ...values },
  };

  const { data } = await axios(requestOptions);

  return data;
}
