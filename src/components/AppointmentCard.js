import React from 'react';
import faker from 'faker';
import './AppointmentCard.css';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter,
    makeStyles,
    Button
} from '@material-ui/core';
import { palette } from '@mui/system';


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        width: 60,
        height: 60,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    },
    payment: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
}));

let USERS = [], STATUSES = ['Active', 'Pending', 'Blocked'];
let PAYMENT_STATUS = ['Paid', 'Unpaid']
for (let i = 0; i < 7; i++) {
    USERS[i] = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        jobTitle: faker.name.jobTitle(),
        company: faker.company.companyName(),
        joinDate: faker.date.past().toLocaleDateString('en-US'),
        payment: PAYMENT_STATUS[Math.floor(Math.random() * PAYMENT_STATUS.length)],
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
    }
}

function AppointmentCard() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}>Patient Info</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Appointment Date</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Payment Status</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                        <TableCell className={classes.tableHeaderCell}>View</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell>
                                <Grid container>
                                    <Grid item lg={2}>
                                        <Avatar alt={row.name} src='.' className={classes.avatar} />
                                    </Grid>
                                    <Grid item lg={10}>
                                        <Typography className={classes.name}>{row.name}</Typography>
                                        <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                                        <Typography color="textSecondary" variant="body2">{row.phone}</Typography>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>{row.joinDate}</TableCell>
                            <TableCell>
                                <Typography
                                    className={classes.payment}
                                    style={{
                                        backgroundColor:
                                            ((row.payment === 'Paid' && 'green') ||
                                                (row.payment === 'Unpaid' && 'red'))
                                    }}
                                >{row.payment}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    className={classes.status}
                                    style={{
                                        backgroundColor:
                                            ((row.status === 'Active' && 'green') ||
                                                (row.status === 'Pending' && 'blue') ||
                                                (row.status === 'Blocked' && 'orange'))
                                    }}
                                >{row.status}</Typography>
                            </TableCell>

                            <TableCell>
                                <Typography>
                                    <Button component={Link} to="/about" variant="outlined" color="primary" cursor="pointer">
                                        View
                                    </Button>
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={USERS.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default AppointmentCard;