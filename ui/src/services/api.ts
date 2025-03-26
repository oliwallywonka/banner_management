import axios from 'axios'

const headers = {
  'Access-Control-Allow-Origin': '*',
}

export const baseURL = (
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_APP_URL_PROD
    : import.meta.env.VITE_APP_URL_DEV
) as string

const instance = axios.create({
  baseURL,
  headers,
})

export default instance
