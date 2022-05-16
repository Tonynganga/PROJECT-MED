import React, { createContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { notify } from 'reapop'
import {
    ADD_BLOG,
    ADD_COMMENTS,
    ADD_COMMENTS_FOR_COMMENTS,
    GET_DOC_APPOITMENTS,
    GET_PATIENT_DETAILS_FOR_DOC,
    DELETE_BLOG,
    DELETE_COMMENTS,
    DELETE_COMMENT_FOR_COMMENT,
    GET_BLOGS,
    GET_COMMENTS,
    GET_COMMENTS_FOR_COMMENTS,
    UPDATE_BLOG,
    UPDATE_COMMENTS,
    UPDATE_COMMENT_FOR_COMMENT,
    RESET_DATA

} from './actions/types';
import { useDispatch } from 'react-redux'
import { WS_API_PATH } from './utils'
const WebSocketService = createContext(null)


export { WebSocketService }

export default ({ children }) => {
    const token = useSelector(state => state.auth.token)
    // const [newConnection,setNewConnection]=useState(false)
    let newConnection = false
    const dispatch = useDispatch();
    let limitRecursion = 0
    const socketRef = useRef()
    const currentUrl = useRef()
    let ws

    const connect = (url) => {
        currentUrl.current = url
        const path = `${WS_API_PATH}${url}?token=${token}`;
        const socket = new WebSocket(path);
        socket.onopen = () => {
            console.log('WebSocket open');
        };
        socket.onmessage = e => {
            socketNewMessage(e.data);
        };

        socket.onerror = e => {
            console.log(e.message);
        };
        socket.onclose = () => {
            recoverLostConnection()
            // console.log("WebSocket closed let's reopen");
            // if (limitRecursion <= 5)
            //     connect(url)
            // limitRecursion += 1
        };
        return socket
    }

    const recoverLostConnection = () => {
        let prevUrl = currentUrl.current
        setTimeout(
            function () {
                if (socketRef.current && socketRef.current.readyState !== 1) {
                    if (prevUrl === currentUrl.current) { 
                        connect(currentUrl.current) 
                        console.log('hello world')
                    }else
                        console.log('hello')
                }
            }, 100); // wait 100 milisecond to recover connection

    }

    const connectWsComments = () => {
        if (socketRef.current && socketRef.current.readyState === 1)
            if (currentUrl.current != "comments/") {
                socketRef.current.close()
                socketRef.current = connect("comments/")
                return
            }
            else return
        socketRef.current = connect("comments/")
    }

    const connectWsBlog = () => {

        if (socketRef.current && socketRef.current.readyState === 1)
            if (currentUrl.current != "blogs/") {
                socketRef.current.close()
                socketRef.current = connect("blogs/")
                return
            }
            else return
        socketRef.current = connect("blogs/")
    }

    const connectWsBookedAppointments = () => {

        if (socketRef.current && socketRef.current.readyState === 1)
            if (currentUrl.current != "booked_appointments/") {
                socketRef.current.close()
                socketRef.current = connect("booked_appointments/")
                return
            }
            else return
        socketRef.current = connect("booked_appointments/")
    }

    const connectWsMyPatientsDetails = () => {

        if (socketRef.current && socketRef.current.readyState === 1)
            if (currentUrl.current != "my_patient_details/") {
                socketRef.current.close()
                socketRef.current = connect("my_patient_details/")
                return
            }
            else return
        socketRef.current = connect("my_patient_details/")
    }

    const handleBlogWs = (parsedData) => {
        switch (parsedData.type) {
            case 'get_blogs':
                dispatch({ type: GET_BLOGS, payload: parsedData.data })
                break
            case 'update_blog':
                dispatch({ type: UPDATE_BLOG, payload: parsedData.data });
                break
            case 'delete_blog':
                dispatch({ type: DELETE_BLOG, payload: parsedData.id });
                break
            case 'update_for_added_blog':
                dispatch({ type: ADD_BLOG, payload: parsedData.data });
                break
            default:
                break;
        }
    }

    const handleBookedAppointmentsWs = (parsedData) => {
        switch (parsedData.type) {
            case 'get_booked_appointments':
                dispatch({ type: GET_DOC_APPOITMENTS, payload: parsedData.data });
                break
        }
    }

    const handleMyPatientDetailsWs = (parsedData) => {
        switch (parsedData.type) {
            case 'get_my_patients_details':
                dispatch({ type: GET_PATIENT_DETAILS_FOR_DOC, payload: parsedData.data });
                break
        }
    }

    const handleCommentWs = (parsedData) => {
        switch (parsedData.type) {
            case 'get_comments':
                dispatch({ type: GET_COMMENTS, payload: { 0: parsedData.data } });
                break
            case 'add_comment':
                dispatch({ type: ADD_COMMENTS, payload: parsedData.data });
                // dispatch(notify("Added Comment successfuly", "success"));
                break
            case 'update_comment':
                dispatch({ type: UPDATE_COMMENTS, payload: parsedData.data });
                // dispatch(notify("updated Comment successfuly", "success"));
                break
            case 'delete_comment':
                dispatch({ type: DELETE_COMMENTS, payload: parsedData.id });
                // dispatch(notify("deleted Comment successfuly", "success"));
                break
            case 'get_comments_for_comments':
                dispatch({ type: GET_COMMENTS_FOR_COMMENTS, payload: { [parsedData.room_id]: parsedData.data } });
                break
            case 'add_comment_for_comment':
                dispatch({ type: ADD_COMMENTS_FOR_COMMENTS, payload: { key: parsedData.room_id, data: parsedData.data } });
                // dispatch(notify("Added Comment successfuly", "success"));
                break
            case 'update_comment_for_comment':
                dispatch({ type: UPDATE_COMMENT_FOR_COMMENT, payload: { key: parsedData.room_id, data: parsedData.data } });
                // dispatch(notify("Update Comment successfuly", "success"));
                break
            case 'delete_comment_for_comment':
                dispatch({ type: DELETE_COMMENT_FOR_COMMENT, payload: { key: parsedData.room_id, id: parsedData.id } });
                // dispatch(notify("deleted Comment successfuly", "success"));
                break
            default:
                break;
        }

    }

    /** 
     * TODO handle backend errors 
     * **/
    const socketNewMessage = (data) => {
        const parsedData = JSON.parse(data);
        if (currentUrl.current === "blogs/")
            handleBlogWs(parsedData)
        else if (currentUrl.current === "comments/")
            handleCommentWs(parsedData)
        else if (currentUrl.current === "booked_appointments/")
            handleBookedAppointmentsWs(parsedData)
        else if (currentUrl.current === "my_patient_details/")
            handleMyPatientDetailsWs(parsedData)
        // console.log(parsedData)
    }



    const sendMessage = (type, data, roomId) => {
        waitForSocketConnection(() => {
            const sendData = {
                "command": type,
                "data": data,
            }
            if (roomId != null)
                sendData["room_id"] = roomId

            try {
                socketRef.current.send(JSON.stringify(sendData));
            }
            catch (err) {
                console.log(err.message);
            }
        }
        )
    }

    const closeWsConnection = () => {
        if(socketRef.current)
        {socketRef.current.close()
        dispatch({ type: RESET_DATA });}

    }





    const waitForSocketConnection = (callback) => {
        const socket = socketRef.current;
        const recursion = waitForSocketConnection;
        setTimeout(
            function () {
                if (socket && socket.readyState === 1) {
                    console.log("Connection is made")
                    if (callback != null) {
                        callback();
                    }
                    return;

                } else {
                    console.log("wait for connection...")
                    // socketRef=connect()
                    recursion(callback);
                }
            }, 1000); // wait 5 milisecond for the connection...
    }

    ws = {
        sendMessage,
        connectWsComments,
        connectWsBlog,
        connectWsBookedAppointments,
        connectWsMyPatientsDetails,
        closeWsConnection,
    }


    return (
        <WebSocketService.Provider value={ws}>

            {children}

        </WebSocketService.Provider>

    )
}


// const WebSocketInstance = WebSocketService.getInstance();

// export default WebSocketInstance;
