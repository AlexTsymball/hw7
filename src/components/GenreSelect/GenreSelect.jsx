import React from 'react';

import Select from 'components/SelectGenre';
import FormControl from 'components/FormControl';
import InputLabel from 'components/InputLabel';
import MenuItem from 'components/MenuItem';
import {useIntl} from "react-intl";



function GenreSelect(props) {
    const {
        disabled,
        genre,
        onChange
    } = props;

    const {formatMessage} = useIntl();


    return (
        <>
            <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-label">
                    {formatMessage({
                        id: 'genre',
                    })}
                </InputLabel>
                <Select
                    disabled={disabled}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={genre}
                    onChange={onChange}

                >
                    <MenuItem value={1}>romance</MenuItem>
                    <MenuItem value={2}>historical</MenuItem>
                    <MenuItem value={3}>detective</MenuItem>
                    <MenuItem value={4}>fantasy</MenuItem>
                    <MenuItem value={5}>novel</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}


export default GenreSelect;
