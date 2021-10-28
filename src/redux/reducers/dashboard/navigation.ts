import { Canceler } from 'axios';
import { AnyAction } from 'redux';

import { EAsideNavMenusMode } from '@layouts/types';
import * as ActionTypes from '@redux/action/types';

export type TNavigationState = {
  asideMode: EAsideNavMenusMode;
  cancelRequest: Array<{ cancel: Canceler; url: string }>;
};

const initialState: TNavigationState = {
  asideMode: EAsideNavMenusMode.Show,
  cancelRequest: []
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SET_ASIDE_NAV_MODE:
      return {
        ...state,
        asideMode: action.payload.asideMode
      };
    case ActionTypes.ADD_CANCEL_REQUEST:
      return {
        ...state,
        cancelRequest: [...state.cancelRequest, action.payload]
      };
    default:
      return state;
  }
};
