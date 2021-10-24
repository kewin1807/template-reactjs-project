import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducers from '@redux/reducers';

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
  //   sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
