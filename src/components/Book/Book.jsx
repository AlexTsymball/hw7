import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import List from "components/List";
import ListItem from "components/ListItem";
import ListItemIcon from "components/ListItemIcon";
import AutoStoriesIcon from "components/AutoStoriesIcon";
import ListItemText from "components/ListItemText";
import IconButton from "components/IconButton";
import DeleteIcon from "components/DeleteIcon";
import EditIcon from "components/EditIcon";
import {fetchDeleteBook} from "../../pages/Books/action/book";
import Box from "../Box";
import Link from "../Link";
import * as PAGES from "../../constants/pages";

const commonStyles = {
    backgroundColor: 'rgba(211,217,241,0.73)',
    width: '50rem',
};

function Book(props) {
    const {
        bookId,
        name,
        author,
        genre,
    } = props;

    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);


    return (
        <>
            {!isDeleted && <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>

                <Box sx={{...commonStyles, borderRadius: '16px'}}>
                    <ListItem
                        onMouseEnter={() => setActive(true)}
                        onMouseLeave={() => setActive(false)}>
                        <ListItemIcon>
                            <AutoStoriesIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary={name + ', ' + author}
                            secondary={genre.id + ', ' + genre.name}/>
                        {active &&
                        <ListItemIcon>
                            <IconButton onClick={() => {
                                setIsDeleted(true);
                                dispatch(fetchDeleteBook(bookId))
                            }}>
                                <DeleteIcon/>
                            </IconButton>
                            <Link
                                to={(location => ({
                                    ...location,
                                    pathname: `/${PAGES.CREATE_BOOK}/`+bookId,
                                    search: `${location.search}`,
                                }))}
                            >
                                <IconButton>
                                    <EditIcon/>
                                </IconButton>
                            </Link>
                        </ListItemIcon>}
                    </ListItem>
                </Box>
            </List>
            }
        </>
    );
}


export default Book;
