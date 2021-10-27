import { AnyAction } from 'redux';

import { TEntry } from '@API/types';

import * as ActionTypes from '../../action/types';

export type TDashboardState = {
  hello: string;
  users: TEntry[];
};

const initialState: TDashboardState = {
  hello: 'Hi',
  users: []
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SET_DASHBOARD_GREETINGS:
      return {
        ...state,
        hello: action.payload.hello
      };
    case ActionTypes.RESOLVE_WEATHER:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
};
