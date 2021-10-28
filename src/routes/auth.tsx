import React from 'react';
// import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useErrorBoundary } from 'use-error-boundary';

import { Dashboard } from '@pages';

export default function RouteWithAuth() {
  const { ErrorBoundary } = useErrorBoundary();
  const location = useLocation();
  // const dispatch = useDispatch();

  const ErrorMessage = (props: A) => (
    <div style={{ padding: '24px 32px' }}>
      <p>An error has been catched: {props.message}</p>
      <p>please refresh page</p>
    </div>
  );
  return (
    <ErrorBoundary
      key={location.pathname}
      renderError={error => <ErrorMessage message={error.error.message} />}
    >
      <Switch>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        {/* <Route path="/project/:projectID/mappings/" exact>
          <ProjectMappings />
        </Route>
        <Route path="/project/:platformType/:projectID/automaps" exact>
          <PageProjectAutoMaps />
        </Route>
        <Route path="/project/:platformType/:projectID/mappings/:mappingID/detail" exact>
          <ProjectMappingDetail />
        </Route>
        <Route path="/project/:platformType/:projectID/importmappings/:mappingID?" exact>
          <PageProjectImportMappings />
        </Route>
        <Route path="/project/edit" exact>
          <ProjectEditType />
        </Route>
        <Route path="/project/all-list" exact>
          <ProjectAllList />
        </Route>
        <Route path="/settings/tag" exact>
          <SettingsTag />
        </Route>
        <Route path="/settings/migration/:type" exact>
          <SettingsMigration />
        </Route>
        <Route path="/settings/email" exact>
          <SettingsEmail />
        </Route>
        <Route path="/settings/connection" exact>
          <SettingsConnection />
        </Route>
         */}
        <Route path="/" exact>
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </ErrorBoundary>
  );
}
