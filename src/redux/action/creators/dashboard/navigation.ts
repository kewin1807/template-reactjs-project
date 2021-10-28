import { EAsideNavMenusMode } from '@layouts/two-column/aside-nav';
import * as ActionTypes from '@redux/action/types';

export function setAsideNavMode(asideMode: EAsideNavMenusMode) {
  return {
    type: ActionTypes.SET_ASIDE_NAV_MODE,
    payload: { asideMode }
  };
}

export function addCancelRequest(request: A) {
  return {
    type: ActionTypes.ADD_CANCEL_REQUEST,
    payload: request
  };
}

// export default setAsideNavMode;
