import axios from 'axios';

type Methods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface Props {
  method: Methods;
  data?: any;
  url: string;
  baseUrl?: string;
  headers?: any;
}

const axiosMethods = {
  GET: axios.get,
  POST: axios.post,
  PATCH: axios.patch,
  PUT: axios.put,
  DELETE: axios.delete,
};

export const Api = async ({
  method,
  data,
  url,
  baseUrl = process.env.REACT_APP_API_BASE,
  headers = {},
}: Props) => {
  try {
    const response = await axiosMethods[method](url, {
      url,
      data,
      baseURL: baseUrl,
      headers: {
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        ...headers,
      },
    });

    return response?.data;
  } catch (err: any) {
    const message =
      err?.response?.data?.error || err?.response?.data?.message || err.message;
    console.error('[NETWORK]', err);

    throw new Error(message);
  }
};
