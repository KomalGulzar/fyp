import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  useReducer  from './user/userSlice.js'
import { persistReducer, persistStore } from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({user: useReducer})

const persistConfig ={
    key : 'root',
    storage,
    version: 1,

}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware(
        {
            serializableCheck: false,
          }
    )
  
})

export const persistor = persistStore(store)



// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; 
// import rootReducer from './reducers';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);
