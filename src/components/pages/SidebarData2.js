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
        link:"/home"
    },
    {
        title: "Appointments",
        icon: <EventAvailableIcon/>,
        link:"/patienthomepage"
    },
    {
        title: "My Patients",
        icon: <PersonIcon/>,
        link:"/patienthomepage"
    },
    {
        title: "Profile Settings",
        icon: <PersonAddIcon/>,
        link:"/patienthomepage"
    },
    {
        title: "Change Password",
        icon: <LockIcon/>,
        link:"/patienthomepage"
    },
    {
        title: "LogOut",
        icon: <ExitToAppIcon/>,
        link:"/patienthomepage"
    }
]

