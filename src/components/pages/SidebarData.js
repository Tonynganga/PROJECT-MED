import React from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CommentIcon from '@material-ui/icons/Comment';

export const SidebarData = [

    {
        title: "DashBoard",
        icon: <DashboardIcon/>,
        link:"/patienthomepage"
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
        link:"/changepass"
    },
    {
        title: "Blog",
        icon: <CommentIcon/>,
        link: "/newblog"
    },
    {
        title: "LogOut",
        icon: <ExitToAppIcon/>,
        link:"/logout"
    }
]

