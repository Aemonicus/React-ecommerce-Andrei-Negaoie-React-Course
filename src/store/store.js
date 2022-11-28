import { compose, legacy_createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import { loggerMiddleware } from "./middleware/logger";
// import logger from "redux-logger"

// import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";


const persistConfig = {
  key: "root",
  storage,
  whitelist: [ "cart" ]
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [ process.env.NODE_ENV === "development" && loggerMiddleware, sagaMiddleware ].filter(Boolean);
// const middleWares = [ process.env.NODE_ENV === "development" && loggerMiddleware, thunk ].filter(Boolean);

const composeEnhancer = process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)