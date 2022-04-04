import React from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import PersonIcon from '@material-ui/icons/Person';
import CommentIcon from '@material-ui/icons/Comment';

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
        link:"/my_patients"
    },
    {
        title: "Profile Settings",
        icon: <PersonAddIcon/>,
        link:"/doctorprofile"
    },
    {
        title: "Blog",
        icon: <CommentIcon/>,
        link: "/bloghome"
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

