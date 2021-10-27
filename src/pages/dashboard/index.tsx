import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWeather } from '@redux/action/creators';
import { TStateType } from '@redux/reducers';
import { TDashboardState } from '@redux/reducers/dashboard/dashboard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardState: TDashboardState = useSelector((state: TStateType) => state.dashboard);
  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);
  if (dashboardState.users && dashboardState.users.length) {
    return (
      <div>
        {dashboardState.users.map(item => (
          <p key={item.id}>{item.name}</p>
        ))}
      </div>
    );
  }
  return <p>aaaaaaaaaa</p>;
};

export default Dashboard;
