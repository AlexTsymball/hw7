import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import Link from 'components/Link';
import Typography from 'components/Typography';
import useAccessValidate from 'hooks/useAccessValidate';
import Button from "../../../components/Button";
import * as PAGES from "../../../constants/pages";
import {useIntl} from "react-intl";

const getClasses = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const Initial = ({
                     authorities,
                 }) => {
    const {formatMessage} = useIntl();
    const classes = getClasses();
    const {
        availableItems,
    } = useSelector(({reducer}) => reducer);
    const canSeeList = useAccessValidate({
        ownedAuthorities: authorities,
        neededAuthorities: ['МО00ЖНО_ВОТ_ЭТУ_ШТУКУ'],
    });

    return (
        <div className={classes.container}>
            <Link
                to={(location => ({
                        ...location,
                        pathname: `/${PAGES.BOOKS}`,
                        search: `${location.search}`,
                    }))}
            >
                <Button
                    fullWidth
                    variant="outlined"
                >
                    <Typography variant="button">
                        {formatMessage({id: 'bookList'})}
                    </Typography>
                </Button>
            </Link>
            {canSeeList && availableItems.map((item, index) => (
                <Link
                    href={index % 2 === 0
                        ? `https://www.google.com.ua/search?q=${item}&hl=ru`
                        : undefined}
                    to={index % 2 !== 0
                        ? (location => ({
                            ...location,
                            pathname: `/${item}`,
                            search: `${location.search}&newProp=42`,
                        }))
                        : undefined}
                >
                    <Typography>
                        {item}
                    </Typography>
                </Link>
            ))}
            {!canSeeList && (
                <Typography>
                    Не могу ничего показать :(
                </Typography>
            )}
        </div>
    )
};

export default Initial;
