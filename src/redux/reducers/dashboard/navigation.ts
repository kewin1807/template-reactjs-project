import { AnyAction } from 'redux';

import { EAsideNavMenusMode } from '@layouts/types';
import * as ActionTypes from '@redux/action/types';

export type TNavigationState = {
  asideMode: EAsideNavMenusMode;
};

const initialState: TNavigationState = {
  asideMode: EAsideNavMenusMode.Show
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SET_ASIDE_NAV_MODE:
      return {
        ...state,
        asideMode: action.payload.asideMode
      };
    default:
      return state;
  }
};
