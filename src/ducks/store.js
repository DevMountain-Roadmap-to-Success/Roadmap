import reducer from './reducer';
import { createStore} from 'redux';

const store = createStore(
    reducer,
    /* preloadedState, */
    /*This is letting us use the chrome extension redux dev tools*/ window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;