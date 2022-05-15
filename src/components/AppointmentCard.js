import React,{useState,useEffect,useContext, useRef} from 'react';
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
import { connect } from 'react-redux';
import { errorMessage } from '../actions/notifyPopUp';
// import { getDoctorAppointments } from '../actions/docAppointments';
import propTypes from 'prop-types';
import {capitalizeFirstLetter} from '../utils'
import { WebSocketService } from '../websocket';


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '15px 7px',
        maxWidth: 1010
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

const AppointmentCard=(props)=> {
    const ws = useContext(WebSocketService);
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [appointmentList,setAppointmentList]=useState([])
    const [filteredList,setFilteredList]=useState([])
    const filterState = useRef('all')


    useEffect(()=>{
        ws.connectWsBookedAppointments()
        ws.sendMessage('get_booked_appointments',{})
        // getDoctorAppointments()
    },[])

    useEffect(()=>{
            setAppointmentList(props.docAppointmentsList)
            setFilteredList(props.docAppointmentsList)
    },[props.docAppointmentsList])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filterAll=()=>{
        setFilteredList(appointmentList)
    }

    const filterToday=()=>{
        const tempList=appointmentList.filter(elem=>{
            return elem.appointment_date==new Date().toISOString().slice(0, 10)
        })
        setFilteredList(tempList)
    }

    const filterPending=()=>{
        const todayDate=new Date()
        const tempList=appointmentList.filter(elem=>{
            const appointmentDate = new Date(elem.appointment_date)
            let parts = elem.appointment_time.match(/(\d+)[:](\d+)[:](\d+)/);
            appointmentDate.setHours(parseInt(parts[1], 10)+2,0,0)
            console.log(todayDate,"today date")
            console.log(appointmentDate,"set date")
            return appointmentDate>=todayDate
        })
        setFilteredList(tempList)
        
    }

    return (
        <div className='each__appointment'>
                <div className='appointment'>
                    <div className='appt__details'>
                        <h4>Patient Appointment</h4>
                        <div className='appt__btns'>
                            <button onClick={filterAll} className='btn__upcoming' >All</button>
                            <button onClick={filterToday} className='btn__today' >Today</button>
                            <button onClick={filterPending} className='btn__today' >Pending</button>
                        </div>
                    </div>
                    
                
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
                    {filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <Grid container>
                                    <Grid item lg={2}>
                                        <Avatar alt={capitalizeFirstLetter(row.patient_first_name)} src='.' className={classes.avatar} />
                                    </Grid>
                                    <Grid item lg={10}>
                                        <Typography className={classes.name}>{capitalizeFirstLetter(row.patient_first_name)+' '+capitalizeFirstLetter(row.patient_last_name)}</Typography>
                                        <Typography color="textSecondary" variant="body2">{row.patient_email}</Typography>
                                        <Typography color="textSecondary" variant="body2">{row.patient_phone_no?row.patient_phone_no:""}</Typography>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>{row.appointment_date}</TableCell>
                            <TableCell>
                                <Typography
                                    className={classes.payment}
                                    style={{
                                        backgroundColor:
                                            ((row.payment === 'Paid' && 'green') ||
                                                (row.payment === 'Unpaid' && 'red'))
                                    }}
                                >Paid</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    className={classes.status}
                                    style={{
                                        backgroundColor:
                                            ((row.status === 'Active' && 'green') ||
                                                (row.status === 'Pending' && 'blue'))
                                    }}
                                >Active</Typography>
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
                        count={props.docAppointmentsList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Table>
        </TableContainer>
        </div>
            </div>
    );
}


AppointmentCard.prototype = {
    // getDoctorAppointments: propTypes.func.isRequired,
    errorMessage: propTypes.func.isRequired,
}

const mapStateToProps = state => ({
    docAppointmentsList: state.docAppointments.docAppointments,
    user:state.auth.user,
});

export default connect(mapStateToProps, {errorMessage })(AppointmentCard)
