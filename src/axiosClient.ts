import { useAuth } from '@/auth';
import axios, { AxiosError } from 'axios';

// export const API_DEFAULT_DEV = 'http://localhost:3000';
// export const API = import.meta.env.VITE_API ?? API_DEFAULT_DEV;
export const API = import.meta.env.VITE_API;

const axiosClient = axios.create({
  baseURL: API
});

axiosClient.interceptors.request.use(config => {
  const { token } = useAuth.getState();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config
}, error => {
  return Promise.reject(error)
})

axiosClient.interceptors.response.use(
(response) => {
    if (response.config.method === 'POST') {
      console.log(response);
    }

    return response;
  },
  async (error: AxiosError) => {
    if (error.response && error.response.data) {
      const data = error.response.data;

      type ResponseData = {
        message: string;
        [key: string]: unknown;
      };

      if (error.response.request.responseType === 'blob') {
        const blobData = data as Blob;
        const text = await new Response(blobData).text();
        const parsedData = JSON.parse(text);
        const message = parsedData.message;
        toast.error(message);
        return parsedData;
      } else {
        const responseData = data as ResponseData;
        const message = responseData.message ?? 'Server Error';
        toast.error(message);
        return responseData;
      }
    }

    return {
      success: false,
      message: 'Server Error',
      detailsError: error.response
    };
  }
);

export default axiosClient;