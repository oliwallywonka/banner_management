import axios from 'axios';

const headers = {
  'Access-Control-Allow-Origin': '*',
};

const instance = axios.create({
  baseURL:
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_APP_URL_PROD
      : import.meta.env.VITE_APP_URL_DEV,
  headers,
});

export default instance;