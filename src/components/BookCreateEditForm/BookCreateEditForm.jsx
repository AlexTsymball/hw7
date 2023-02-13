import {makeStyles} from '@material-ui/core/styles';
import {useIntl} from 'react-intl';
import {
    useParams
} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux';
import Button from 'components/Button';
import React, {useState, useEffect} from 'react';
import TextField from 'components/TextField';
import Typography from 'components/Typography';

import {
    fetchUpdateBook,
    fetchCreateBook,
    fetchGetBook,
    toInitial,
} from '../../pages/CreateEditBook/action/book';
import GenreSelect from "../GenreSelect";
import * as PAGES from "../../constants/pages";
import useChangePage from "../../hooks/useChangePage";
import useLocationSearch from "../../hooks/useLocationSearch";
import Link from "../Link";

const getClasses = makeStyles(() => ({
    actionItem: {
        padding: '4px 0px',
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '-4px 0px',
        width: '100%',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    newLine: {
        whiteSpace: 'pre-wrap',
    },
    fullWidth: {
        width: '100%',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    inputField: {
        width: '100%',
    },
    loadingContainer: {
        alignItems: 'center',
        display: 'flex',
        height: '128px',
        justifyContent: 'center'
    },
    tabContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px',
    },
    paddingLeft: {
        paddingLeft: '8px',
    },
    paddingLeft3x: {
        paddingLeft: '24px',
    },
    paddingTop2x: {
        paddingTop: '16px',
    },
    paddingTop3x: {
        paddingTop: '24px',
    },
    paddingTop4x: {
        paddingTop: '32px',
    },
    paddingTop5x: {
        paddingTop: '40px',
    },
}));

const initialState = {
    name: '',
    author: '',
    genreId: '',
};

const BookCreateEditForm = () => {
    const {id} = useParams();
    const classes = getClasses();
    const dispatch = useDispatch();
    const changePage = useChangePage();
    const locationSearch = useLocationSearch();
    const {formatMessage} = useIntl();

    useEffect(() => {
        if (id) {
            dispatch(fetchGetBook(id))
        }

        return () => {
            dispatch(toInitial());
        }
    }, []);


    let {
        isSuccessUpdateBook,
        isSuccessCreateBook,
        isLoadingGetBook,
        isLoadingCreateBook,
        isLoadingUpdateBook,
        errorMessageCreateBook,
        book,
    } = useSelector(({book}) => book);

    const [state, setState] = useState(initialState);


    useEffect(() => {
        if (isSuccessUpdateBook || isSuccessCreateBook) {
            changePage({
                locationSearch: locationSearch.redirectLocationSearch
                    ? JSON.parse(locationSearch.redirectLocationSearch)
                    : locationSearch,
                path: locationSearch.redirectPathname || `/${PAGES.BOOKS}`,
            });
        }
    }, [isSuccessCreateBook, isSuccessUpdateBook]);


    const handleChangeGenre = (event) => {
        setState(prevState => ({
            ...prevState,
            genreId: event.target.value,
        }))
    };

    const handleClickSave = () => {
        id ?
            dispatch(fetchUpdateBook(id, {
                name: state.name || book.name,
                author: state.author || book.author,
                genreId: +state.genreId || +book.genreId,
            })) :
            dispatch(fetchCreateBook({
                name: state.name,
                author: state.author,
                genreId: +state.genreId,
            }))
    };


    return (
        <div className={classes.container}>
            {(isLoadingGetBook) && (
                <div className={classes.loadingContainer}>
                    <Typography>
                        Loading...
                    </Typography>
                </div>
            )}
            {!isLoadingGetBook && (
                <>
                    <div className={classes.tabContent}>
                        <div className={classes.inputField}>
                            <TextField
                                disabled={isLoadingCreateBook || isLoadingUpdateBook}
                                fullWidth
                                key="name"
                                label={formatMessage({
                                    id: 'bookName',
                                })}
                                onChange={({target}) => setState(prevState => ({
                                    ...prevState,
                                    name: target.value,
                                }))}
                                defaultValue={book.name}
                            />
                        </div>
                        <div className={classes.fullWidth}>
                            <div className={classes.paddingTop3x}>
                                <div className={classes.inputField}>
                                    <TextField
                                        disabled={isLoadingCreateBook || isLoadingUpdateBook}
                                        fullWidth
                                        key="author"
                                        label={formatMessage({
                                            id: 'author',
                                        })}
                                        onChange={({target}) => setState(prevState => ({
                                            ...prevState,
                                            author: target.value,
                                        }))}
                                        defaultValue={book.author}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.fullWidth}>
                            <div className={classes.paddingTop4x}>
                                <GenreSelect
                                    disabled={isLoadingCreateBook || isLoadingUpdateBook}
                                    genre={book?.genre?.id || ''}
                                    onChange={handleChangeGenre}/>
                            </div>
                        </div>
                        {errorMessageCreateBook &&
                        <div className={classes.fullWidth}>
                            <div className={classes.paddingTop4x}>
                                <Typography className={classes.newLine} color={"secondary"}>
                                    {errorMessageCreateBook}
                                </Typography>
                            </div>
                        </div>}
                        <div className={classes.fullWidth}>
                            <div className={classes.paddingTop5x}>
                                <div className={classes.actionsContainer}>
                                    <div className={classes.actionItem}>
                                        <Button
                                            fullWidth
                                            disabled={isLoadingCreateBook || isLoadingUpdateBook}
                                            onClick={handleClickSave}
                                            variant="outlined"
                                        >
                                            <Typography variant="button">
                                                {!(isLoadingCreateBook || isLoadingUpdateBook) ?
                                                    (id ?
                                                        formatMessage({id: 'update'}) :
                                                        formatMessage({id: 'create'}))
                                                    :
                                                    formatMessage({id: 'loading'})}

                                            </Typography>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            )
            }
            <div className={classes.tabContent}>
                <div className={classes.fullWidth}>
                    <Link
                        to={(location => ({
                            ...location,
                            pathname: `/${PAGES.BOOKS}`,
                            search: `${location.search}`,
                        }))}
                    >
                        <Button
                            fullWidth
                            variant="contained">
                            <Typography variant="button">
                                {formatMessage({id: 'cancel'})}
                            </Typography>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default BookCreateEditForm;
