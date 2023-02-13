import {
    ERROR_RECEIVE_UPDATE_BOOK,
    REQUEST_UPDATE_BOOK,
    RECEIVE_UPDATE_BOOK,
    ERROR_RECEIVE_CREATE_BOOK,
    REQUEST_CREATE_BOOK,
    RECEIVE_CREATE_BOOK,
    ERROR_RECEIVE_GET_BOOK,
    REQUEST_GET_BOOK,
    RECEIVE_GET_BOOK,
    TO_INITIAL,
} from '../constants/actionTypes';

const initialState = {
    isLoadingGetBook: false,
    isErrorGetBook: false,

    isLoadingUpdateBook: false,
    isSuccessUpdateBook: false,
    isErrorUpdateBook: false,

    isLoadingCreateBook: false,
    isSuccessCreateBook: false,
    isErrorCreateBook: false,

    errorMessageCreateBook: null,
    book: {},
};

export default (state = initialState, action) => {
    switch (action.type) {

        case ERROR_RECEIVE_GET_BOOK: {
            return {
                ...state,
                isLoadingGetBook: false,
                isErrorGetBook: true
            };
        }
        case REQUEST_GET_BOOK: {
            return {
                ...state,
                isLoadingGetBook: true,
            };
        }
        case RECEIVE_GET_BOOK: {
            const {
                book,
            } = action;

            return {
                ...state,
                book: book,
                isLoadingGetBook: false,
                isErrorGetBook: false
            };
        }

        case ERROR_RECEIVE_UPDATE_BOOK: {
            return {
                ...state,
                isLoadingUpdateBook: false,
                isErrorUpdateBook: true
            };
        }
        case REQUEST_UPDATE_BOOK: {
            return {
                ...state,
                errorMessageCreateBook: null,
                isLoadingUpdateBook: true,
            };
        }
        case RECEIVE_UPDATE_BOOK: {
            return {
                ...state,
                isSuccessUpdateBook: true,
                isErrorUpdateBook: false
            };
        }
        case ERROR_RECEIVE_CREATE_BOOK: {
            const {
                errMessage,
            } = action;

            return {
                ...state,
                errorMessageCreateBook: errMessage,
                isLoadingCreateBook: false,
                isErrorCreateBook: true
            };
        }
        case REQUEST_CREATE_BOOK: {
            return {
                ...state,
                isLoadingCreateBook: true,
                errorMessageCreateBook: null,

            };
        }
        case RECEIVE_CREATE_BOOK: {
            return {
                ...state,
                isSuccessCreateBook: true,
                isErrorCreateBook: false
            };
        }
        case TO_INITIAL: {
            return {
                ...initialState,
            };
        }

        default:
            return state;
    }
}




