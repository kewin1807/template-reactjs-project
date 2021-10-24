import { AnyAction } from 'redux';

import * as ActionTypes from '../../action/types';

export type TDashboardState = {
  hello: string;
};

const initialState: TDashboardState = {
  hello: 'Hi'
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SET_DASHBOARD_GREETINGS:
      return {
        ...state,
        hello: action.payload.hello
      };
    default:
      return state;
  }
};
