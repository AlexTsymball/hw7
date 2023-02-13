import React from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import withAuthorities from 'decorators/withAuthorities';
import reducerBook from './reducers/book';
import CreateEditBook from "./containers/CreateEditBook";

const rootReducer = combineReducers({
    book: reducerBook,
});
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);

export default withAuthorities(props => (
    <Provider store={store}>
        <CreateEditBook {...props} />
    </Provider>
));
