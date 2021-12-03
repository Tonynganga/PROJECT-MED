import React from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import PersonIcon from '@material-ui/icons/Person';

export const SidebarData2 = [

    {
        title: "DashBoard",
        icon: <DashboardIcon/>,
        link:"/doctorhomepage"
    },
    {
        title: "Appointments",
        icon: <EventAvailableIcon/>,
        link:"/doctorappointments"
    },
    {
        title: "My Patients",
        icon: <PersonIcon/>,
        link:"/doctorpatients"
    },
    {
        title: "Profile Settings",
        icon: <PersonAddIcon/>,
        link:"/doctorprofile"
    },
    {
        title: "Change Password",
        icon: <LockIcon/>,
        link:"/doctorchangepass"
    },
    {
        title: "LogOut",
        icon: <ExitToAppIcon/>,
        link:"/logout"
    }
]

