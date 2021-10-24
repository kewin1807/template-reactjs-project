import { combineReducers } from 'redux';

import dashboardReducer, { TDashboardState } from './dashboard/dashboard';
import navigationReducer, { TNavigationState } from './dashboard/navigation';

export default combineReducers<TStateType>({
  dashboard: dashboardReducer,
  navigation: navigationReducer
});

export type TStateType = {
  dashboard: TDashboardState;
  navigation: TNavigationState;
};
