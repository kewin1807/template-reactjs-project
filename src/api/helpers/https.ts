import axios, { Canceler } from 'axios';
import qs from 'query-string';

import { addCancelRequest } from '@redux/action/creators';

import { reduxStore } from '../../pages/app';

const cancelStatusCode: number = 700;

const ALLOW_SEND_METHOD = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

axios.interceptors.request.use(
  config => {
    config.cancelToken = new axios.CancelToken((e: Canceler) => {
      reduxStore.dispatch(
        addCancelRequest({
          cancel: e,
          url: location.host + config.url
        })
      );
    });
    return config;
  },
  error => Promise.reject(error)
);

export default function request(
  url: string,
  requestInitOptions?: A,
  customizeToken?: string,
  isBlob?: boolean
) {
  const BASE_ASSETPREFIX = 'https://jsonplaceholder.typicode.com';
  let requestInitOptionsMethod = 'GET';
  if (!(!requestInitOptions || (requestInitOptions && !requestInitOptions.method))) {
    requestInitOptionsMethod = requestInitOptions.method!.toUpperCase();
  }

  requestInitOptions = {
    ...requestInitOptions,
    method: requestInitOptionsMethod
  };
  let isAllowSend: boolean = false;
  if (requestInitOptions && requestInitOptionsMethod) {
    isAllowSend = ALLOW_SEND_METHOD.includes(requestInitOptionsMethod);
  }

  if (!isAllowSend) {
    return Promise.resolve({ data: { error: '405 Method Not Allowed' } });
  }

  let httpURL = `${BASE_ASSETPREFIX}${url}`;
  if (url.indexOf('//') > -1) {
    httpURL = url;
  }
  let Authorization = '';
  if (localStorage.getItem('token') || customizeToken) {
    const token = localStorage.getItem('token') || customizeToken;
    Authorization = `Bearer ${token}`;
  }

  // const languageHeader: string = getLanguageHeader(Context.user?.Language);

  const newHeaders: { [key: string]: string } = {
    'Access-Control-Allow-Origin': '*',
    Authorization,
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json,text/plain,*/*'
    // 'X-CLOUD-FLY-LANGUAGE': languageHeader
  };
  if (!Authorization) {
    delete newHeaders.Authorization;
  }

  if (requestInitOptionsMethod === 'GET' && requestInitOptions.body) {
    const parseBody = JSON.parse(requestInitOptions.body as string);
    httpURL += Object.keys(parseBody).length ? `?${qs.stringify(parseBody)}` : '';
    delete requestInitOptions.body;
  }

  requestInitOptions.headers = newHeaders;

  requestInitOptions.mode = 'cors'; // no-cors, cors, *same-origin
  requestInitOptions.credentials = 'same-origin'; // cookies
  requestInitOptions.cache = 'default'; // *default, no-cache, reload, force-cache, only-if-cached
  // options.redirect= "follow"; // manual, *follow, error
  // options.referrer= "no-referrer"; // no-referrer, *client
  // requestInitOptions.timeout = 60000;
  if (isBlob) {
    requestInitOptions.responseType = 'blob';
  }
  return axios(httpURL, {
    ...requestInitOptions,
    data: requestInitOptions.body || {}
  })
    .then(response => {
      if (isBlob) {
        return new Blob([response.data]);
      }
      return response.data;
    })
    .catch(e => {
      let error = 'fetch error';
      let response = { ...e.response };
      if (e.response) {
        if (e.response.status) {
          error = e.response.status;
        }

        if (e.response.status === 401) {
          // reduxStore.dispatch(setSessionTimeOut(true));
          return false;
        }
      } else if (axios.isCancel(e)) {
        response = {
          data: {
            statusCode: cancelStatusCode,
            message: [error]
          }
        };
      } else {
        response = {
          data: {
            statusCode: 404,
            message: [error]
          }
        };
      }
      return (
        response.data || [
          {
            code: error,
            description: 'EXCEPTION'
          }
        ]
      );
    });
}
