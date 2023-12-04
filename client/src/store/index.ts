import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { 
    jobsReducer,
    profileReducer
} from '../reducers';
const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        profile: profileReducer
    },
    middleware: [thunk]
})

export default store;