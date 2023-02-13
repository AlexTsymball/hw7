import {
    getJson,
    postJson, putJson,
} from 'requests';
import config from '../../../config';


import {
    ERROR_RECEIVE_CREATE_BOOK,
    ERROR_RECEIVE_GET_BOOK,
    ERROR_RECEIVE_UPDATE_BOOK,
    RECEIVE_CREATE_BOOK,
    RECEIVE_GET_BOOK,
    RECEIVE_UPDATE_BOOK,
    REQUEST_CREATE_BOOK,
    REQUEST_GET_BOOK,
    REQUEST_UPDATE_BOOK,
    TO_INITIAL,
} from '../constants/actionTypes';

const errorReceiveCreateBook = (errMessage) => ({
    errMessage,
    type: ERROR_RECEIVE_CREATE_BOOK,
});

const createBook = (body) => {
    const {
        BASE_URL,
        USERS_SERVICE,
    } = config;

    return postJson({
        body: body.body,
        url: `${BASE_URL}${USERS_SERVICE}/create`,
    })
};

const receiveCreateBook = () => ({
    type: RECEIVE_CREATE_BOOK,
});

const requestCreateBook = () => ({
    type: REQUEST_CREATE_BOOK,
});

export const fetchCreateBook = (body) => (dispatch) => {
    dispatch(requestCreateBook());
    return createBook({
        body: body,
        dispatch,
    }).then(() => {
        dispatch(receiveCreateBook())
    }).catch((err) => {
        if(err.message === 'Failed to fetch'){
            dispatch(errorReceiveCreateBook('Problems with server'))
        }else{
            return err.json()
        }
    })
        .then((errMessage) => {
            if(errMessage){
                dispatch(errorReceiveCreateBook(errMessage.message))
            }
    })
    ;
};

const errorReceiveUpdateBook = () => ({
    type: ERROR_RECEIVE_UPDATE_BOOK,
});

const updateBook = ({param, body}) => {
    const {
        BASE_URL,
        USERS_SERVICE,
    } = config;
    return putJson({
        body: body,
        url: `${BASE_URL}${USERS_SERVICE}/` + param,
    })
};

const receiveUpdateBook = () => ({
    type: RECEIVE_UPDATE_BOOK,
});

const requestUpdateBook = () => ({
    type: REQUEST_UPDATE_BOOK,
});

export const fetchUpdateBook = (param, body) => (dispatch) => {
    dispatch(requestUpdateBook());
    return updateBook({
        param: param,
        body: body,
        dispatch,
    }).then(() => {
        dispatch(receiveUpdateBook())
    })
        .catch(() => {
            dispatch(errorReceiveUpdateBook())
        });
};


const errorReceiveGetBook = () => ({
    type: ERROR_RECEIVE_GET_BOOK,
});

const getBook = (param) => {
    const {
        BASE_URL,
        USERS_SERVICE,
    } = config;

    return getJson({
        url: `${BASE_URL}${USERS_SERVICE}/` + param.param,
    })
};

const receiveGetBook = (book) => ({
    book,
    type: RECEIVE_GET_BOOK,
});

const requestGetBook = () => ({
    type: REQUEST_GET_BOOK,
});

export const fetchGetBook = (param) => (dispatch) => {
    dispatch(requestGetBook());
    return getBook({
        param: param,
        dispatch,
    }).then((book) => {
        dispatch(receiveGetBook(book))
    })
        .catch(() => {
            dispatch(errorReceiveGetBook())
        });
};


const requestToInitial = () => ({
    type: TO_INITIAL,
});

export const toInitial = () => (dispatch) => {
    dispatch(requestToInitial());
};
