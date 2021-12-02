import React from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const SidebarData = [

    {
        title: "DashBoard",
        icon: <DashboardIcon/>,
        link:"/"
    },
    {
        title: "HealthCard",
        icon: <BookmarkIcon/>,
        link:"/patienthomepage"
    },
    {
        title: "Profile Settings",
        icon: <PersonAddIcon/>,
        link:"/patientprofile"
    },
    {
        title: "Change Password",
        icon: <LockIcon/>,
        link:"/patientchangepass"
    },
    {
        title: "LogOut",
        icon: <ExitToAppIcon/>,
        link:"/logout"
    }
]

