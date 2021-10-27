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
 import { applyMiddleware, compose, createStore } from 'redux';
 import createSagaMiddleware from 'redux-saga';

 import rootReducers from '@redux/reducers';
 import rootSaga from '@redux/sagas';
 
 const sagaMiddleware = createSagaMiddleware();
 
 const middleware = [sagaMiddleware];
 let composeEnhancers = compose;
 if (process.env.NODE_ENV === 'development') {
   const { createLogger } = require('redux-logger'); // eslint-disable-line global-require, import/no-extraneous-dependencies
   const invariant = require('redux-immutable-state-invariant').default; // eslint-disable-line global-require, import/no-extraneous-dependencies
   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
   middleware.push(invariant());
   middleware.push(createLogger({ collapsed: true }));
 }
 
 const configureStore = () => {
   const store = createStore(
     rootReducers,
     // preloadedState,
     composeEnhancers(applyMiddleware(...middleware))
   );
 
   // if (process.env.NODE_ENV === "development") {
   //   if (module.hot) {
   //     module.hot.accept('./reducers', () => {
   //       store.replaceReducer(rootReducers)
   //     })
   //   }
   // }
 
   // the run() function must be called after the store is created
   sagaMiddleware.run(rootSaga);
 
   return store;
 };
 
 export default configureStore;
 