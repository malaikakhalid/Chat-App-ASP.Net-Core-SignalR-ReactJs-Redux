import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer/reducer'
import rootreducer from './reducer/rootReducer'


const store = createStore(rootreducer, applyMiddleware(thunk))

export default store;