import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { 
    jobsReducer,
    profileReducer,
    tweetsReducer,
    followingReducer,
    followersReducer,
    tokensReducer,
    reloadsReducer
} from '../reducers';
const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        profile: profileReducer,
        tweets: tweetsReducer,
        following: followingReducer,
        followers: followersReducer,
        tokens: tokensReducer,
        reloads: reloadsReducer
    },
    middleware: [thunk]
})

export default store;