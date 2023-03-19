import {
    AnyAction,
    CombinedState,
    combineReducers,
    configureStore,
    Store,
} from '@reduxjs/toolkit';
import {createRouterMiddleware, initialRouterState} from 'connected-next-router';
import {AppProps} from 'next/app';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import {createLogger} from 'redux-logger';

import {BaseState, reducers} from '__reducers';

import {initialize, store as globalStore} from './storeService';
import {CommonStore} from './types';

export const rootReducer = combineReducers(reducers);

const reducer = (state: CombinedState<BaseState>, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState: CommonStore = {
            ...state,
            ...action.payload,
        };

        if (window && state?.router) {
            nextState.router = state.router;
        }

        return nextState;
    }

    return rootReducer(state, action);
};

export const useConfiguredStore = (appProps: Omit<AppProps, 'Component'>) => {
    const wrapper = createWrapper<Store<BaseState>>(() => {
        const asPath = appProps?.router?.asPath;

        let preloadedState: Partial<BaseState>;

        if (asPath) {
            preloadedState = {
                router: initialRouterState(asPath),
            };
        }

        return configureStore({
            reducer,
            preloadedState,
            middleware: [
                createRouterMiddleware(),
                createLogger({collapsed: true}),
            ],
        });
    });

    const {store, props} = wrapper.useWrappedStore(appProps);

    !globalStore && initialize(store);

    return {store, props};
};
