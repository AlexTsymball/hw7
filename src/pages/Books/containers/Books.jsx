import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Typography from 'components/Typography';
import {fetchGetBookList} from "../action/book";
import Button from "components/Button";
import * as PAGES from "constants/pages";

import {useIntl} from "react-intl";
import Book from "components/Book";
import Link from "components/Link";


const getClasses = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',

    },
    loadingContainer: {
        alignItems: 'center',
        display: 'flex',
        height: '128px',
        justifyContent: 'center'
    },
}));

function Books() {
    const dispatch = useDispatch();

    let {
        isLoadingGetAllBook,
        books,
    } = useSelector(({book}) => book);

    useEffect(() => {
        dispatch(fetchGetBookList())
    }, []);

    const {formatMessage} = useIntl();


    const classes = getClasses();

    return (
        <>
            <div className={classes.container}>
                <Link
                    to={(location => ({
                        ...location,
                        pathname: `/${PAGES.CREATE_BOOK}`,
                        search: `${location.search}`,
                    }))}
                >
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        <Typography variant="button">
                            {formatMessage({id: 'createBook'})}
                        </Typography>

                    </Button>
                </Link>
                {isLoadingGetAllBook && (
                    <div className={classes.loadingContainer}>
                        <Typography>
                            Loading...
                        </Typography>
                    </div>
                )}

                {!isLoadingGetAllBook &&
                (
                    (books.length !== 0 && books.map((item) => (
                        <Book bookId={item.id}
                              name={item.name}
                              author={item.author}
                              genre={item.genre}
                        />
                    ))) ||
                    (!books.length && (
                            <Typography>
                                There are no books :(
                            </Typography>
                        )
                    )
                )}

            </div>
        </>
    )
}


export default Books;
