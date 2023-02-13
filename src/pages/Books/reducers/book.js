import {
    ERROR_RECEIVE_BOOKS,
    REQUEST_BOOKS,
    RECEIVE_BOOKS,
    ERROR_RECEIVE_DELETE_BOOK,
    RECEIVE_DELETE_BOOK,
    REQUEST_DELETE_BOOK,

} from '../constants/actionTypes';

const initialState = {
    isLoadingGetAllBook: false,
    isErrorGetAllBook: false,

    isLoadingDeleteBook: false,
    isErrorDeleteBook: false,

    books: [],
};

export default (state = initialState, action) => {

    switch (action.type) {
        case ERROR_RECEIVE_BOOKS: {
            return {
                ...state,
                isLoadingGetAllBook: false,
                isErrorGetAllBook: true
            };
        }
        case REQUEST_BOOKS: {
            return {
                ...state,
                isLoadingGetAllBook: true,
            };
        }
        case RECEIVE_BOOKS: {
            const {
                books,
            } = action;

            return {
                ...state,
                books: books,
                isLoadingGetAllBook: false,
                isErrorGetAllBook: false
            };
        }
        case ERROR_RECEIVE_DELETE_BOOK: {
            return {
                ...state,
                isLoadingDeleteBook: false,
                isErrorDeleteBook: true
            };
        }
        case REQUEST_DELETE_BOOK: {
            return {
                ...state,
                isLoadingDeleteBook: true,
            };
        }
        case RECEIVE_DELETE_BOOK: {
            return {
                ...state,
                isErrorDeleteBook: false
            };
        }

        default:
            return state;
    }
}




