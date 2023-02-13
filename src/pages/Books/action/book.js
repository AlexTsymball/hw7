import {
    deleteJson,
    getJson,
} from 'requests';
import config from '../../../config';


import {
    ERROR_RECEIVE_BOOKS,
    ERROR_RECEIVE_DELETE_BOOK,
    RECEIVE_BOOKS,
    RECEIVE_DELETE_BOOK,
    REQUEST_BOOKS,
    REQUEST_DELETE_BOOK,
} from '../constants/actionTypes';

const errorReceiveBooks = () => ({
    type: ERROR_RECEIVE_BOOKS,
});

const getBooks = () => {
    const {
        BASE_URL,
        USERS_SERVICE,
    } = config;

    return getJson({
        url: `${BASE_URL}${USERS_SERVICE}`,
    })
};

const receiveBooks = (books) => ({
    books,
    type: RECEIVE_BOOKS,
});

const requestBooks = () => ({
    type: REQUEST_BOOKS,
});

export const fetchGetBookList = () => (dispatch) => {
    dispatch(requestBooks());
    return getBooks({
        dispatch,
    }).then((books) => dispatch(receiveBooks(books)))
        .catch(() => dispatch(errorReceiveBooks()));
};


const errorReceiveDeleteBook = () => ({
    type: ERROR_RECEIVE_DELETE_BOOK,
});

const deleteBook = (param) => {
    const {
        BASE_URL,
        USERS_SERVICE,
    } = config;

    return deleteJson({
        url: `${BASE_URL}${USERS_SERVICE}/delete/` + param.param,
    })
};

const receiveDeleteBook = () => ({
    type: RECEIVE_DELETE_BOOK,
});

const requestDeleteBook = () => ({
    type: REQUEST_DELETE_BOOK,
});

export const fetchDeleteBook = (param) => (dispatch) => {
    dispatch(requestDeleteBook());
    return deleteBook({
        param: param,
        dispatch,
    }).then(() => {
        dispatch(receiveDeleteBook())
    })
        .catch(() => {
            dispatch(errorReceiveDeleteBook())
        });
};




