/** ******************************************************************
 *
 *  PROPRIETARY and CONFIDENTIAL
 *
 *  This file is licensed from, and is a trade secret of:
 *
 *                   AvePoint, Inc.
 *                   525 Washington Blvd, Suite 1400
 *                   Jersey City, NJ 07310
 *                   United States of America
 *                   Telephone: +1-201-793-1111
 *                   WWW: www.avepoint.com
 *
 *  Refer to your License Agreement for restrictions on use,
 *  duplication, or disclosure.
 *
 *  RESTRICTED RIGHTS LEGEND
 *
 *  Use, duplication, or disclosure by the Government is
 *  subject to restrictions as set forth in subdivision
 *  (c)(1)(ii) of the Rights in Technical Data and Computer
 *  Software clause at DFARS 252.227-7013 (Oct. 1988) and
 *  FAR 52.227-19 (C) (June 1987).
 *
 *  Copyright © 2021 AvePoint® Inc. All Rights Reserved.
 *
 *  Unpublished - All rights reserved under the copyright laws of the United States.
 */
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { AccessDenied, Error404, Error500, PasswordAuthorization } from '@pages';

export const useIsLayoutBasic = () => {
  const LayoutBasicPath = ['/404', '/500', '/logout', '/access-denied', '/password'];
  return useRouteMatch(LayoutBasicPath);
};

export const RouteBasic = () => (
  <Switch>
    <Route exact path="/access-denied">
      <AccessDenied />
    </Route>
    <Route exact path="/404">
      <Error404 />
    </Route>
    <Route exact path="/500">
      <Error500 />
    </Route>
    <Route exact path="/password/:projectType/:projectID/:mappingID">
      <PasswordAuthorization />
    </Route>
  </Switch>
);
