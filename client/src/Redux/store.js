import { createStore , applyMiddleware, compose} from 'redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk'

const enhancer = [applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // : f => f]
]

const store = createStore(
    rootReducer,
    compose(...enhancer) //repasar compose, thunk, useparams.
  );

export default store;