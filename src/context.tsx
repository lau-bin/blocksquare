import React, { useState, createContext, PropsWithChildren } from 'react';
import rootReducer, { actions } from './state.js';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
});

export const ContextProvider = (props: PropsWithChildren) => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
};