import * as ActionTypes from '@redux/action/types';

// eslint-disable-next-line import/prefer-default-export
export const fetchWeather = (callback?: () => void) => ({
  type: ActionTypes.FETCH_WEATHER,
  payload: {},
  callback
});

// export default fetchWeather;
