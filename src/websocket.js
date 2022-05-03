import React, { createContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { notify } from 'reapop'
import {
    ADD_BLOG, ADD_BLOG_FAILED,
    ADD_COMMENTS, ADD_COMMENTS_FAILED,
    ADD_COMMENTS_FOR_COMMENTS, ADD_COMMENTS_FOR_COMMENTS_FAILED,
    CLEAR_COMMENTS, DELETE_BLOG,
    DELETE_BLOG_FAILED, DELETE_COMMENTS,
    DELETE_COMMENTS_FAILED, DELETE_COMMENT_FOR_COMMENT,
    DELETE_COMMENT_FOR_COMMENT_FAILED, GET_BLOGS,
    GET_BLOGS_FAILED, GET_COMMENTS,
    GET_COMMENTS_FAILED, GET_COMMENTS_FOR_COMMENTS,
    GET_COMMENTS_FOR_COMMENTS_FAILED, UPDATE_BLOG,
    UPDATE_BLOG_FAILED, UPDATE_COMMENTS,
    UPDATE_COMMENTS_FAILED, UPDATE_COMMENT_FOR_COMMENT,
    UPDATE_COMMENT_FOR_COMMENT_FAILED
} from './actions/types';
import { useDispatch } from 'react-redux'
const WebSocketService = createContext(null)


export { WebSocketService }

export default ({ children }) => {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();
    let limitRecursion = 0
    const socketRef = useRef()
    const currentUrl = useRef()
    let ws

    const connect = (url) => {
        currentUrl.current = url
        const path = `ws://127.0.0.1:8000/${url}?token=${token}`;
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

            console.log("WebSocket closed let's reopen");
            if (limitRecursion <= 5)
                connect(url)
            limitRecursion += 1
        };
        return socket
    }

    const connectWsComments = () => {
        if (socketRef.current && socketRef.current.readyState === 1)
            if (currentUrl.current != "comments/") {
                // socketRef.current.close()
                socketRef.current = connect("comments/")
            }
            else return
        socketRef.current = connect("comments/")
    }

    const connectWsBlog = () => {

        if (socketRef.current && socketRef.current.readyState === 1)
            if (currentUrl.current != "blogs/") {
                // socketRef.current.close()
                socketRef.current = connect("blogs/")
            }
            else return
        socketRef.current = connect("blogs/")



    }
    // useEffect(() => {
    //     socketRef.current = connect()
    // }, [])

    // const instance = null;
    // const callbacks = {};

    // const getInstance = () => {
    //     if (!WebSocketService.instance) {
    //         WebSocketService.instance = new WebSocketService();
    //     }
    //     return WebSocketService.instance;
    // }

    // const constructor = () => {
    //     this.socketRef = null;
    // }
    // const sendMessage = (data) => {
    //     console.log(data)
    //     try {
    //         socketRef.send(JSON.stringify({
    //             'command': type,
    //             'data': data,
    //         }));
    //     }
    //     catch (err) {
    //         console.log(err.message);
    //     }
    // }

    /** 
     * TODO handle backend errors 
     * **/
    const socketNewMessage = (data) => {
        const parsedData = JSON.parse(data);
        // const command = parsedData.command;
        console.log(parsedData)
        if (parsedData.type === 'get_blogs')
            dispatch({ type: GET_BLOGS, payload: parsedData.data })
        else if (parsedData.type === 'update_blog')
            dispatch({ type: UPDATE_BLOG, payload: parsedData.data });
        else if (parsedData.type === 'delete_blog')
            dispatch({ type: DELETE_BLOG, payload: parsedData.id });
        else if (parsedData.type === 'update_for_added_blog')
            dispatch({ type: ADD_BLOG, payload: parsedData.data });
        else if (parsedData.type === 'get_comments')
            dispatch({ type: GET_COMMENTS, payload: { 0: parsedData.data } });
        else if (parsedData.type === 'add_comment') {
            dispatch({ type: ADD_COMMENTS, payload: parsedData.data });
            dispatch(notify("Added Comment successfuly", "success"));
        }
        else if (parsedData.type === 'update_comment') {
            dispatch({ type: UPDATE_COMMENTS, payload: parsedData.data });
            dispatch(notify("updated Comment successfuly", "success"));
        }
        else if (parsedData.type === 'delete_comment') {
            dispatch({ type: DELETE_COMMENTS, payload: parsedData.id });
            dispatch(notify("deleted Comment successfuly", "success"));
        }
        else if (parsedData.type === 'get_comments_for_comments')
            dispatch({ type: GET_COMMENTS_FOR_COMMENTS, payload: { [parsedData.room_id]: parsedData.data } });
        else if (parsedData.type === 'add_comment_for_comment') {
            dispatch({ type: ADD_COMMENTS_FOR_COMMENTS, payload: { key: parsedData.room_id, data: parsedData.data } });
            dispatch(notify("Added Comment successfuly", "success"));
        }
        else if (parsedData.type === 'update_comment_for_comment') {
            dispatch({ type: UPDATE_COMMENT_FOR_COMMENT, payload: { key: parsedData.room_id, data: parsedData.data } });
            dispatch(notify("Update Comment successfuly", "success"));
        }
        else if (parsedData.type === 'delete_comment_for_comment') {
            dispatch({ type: DELETE_COMMENT_FOR_COMMENT, payload: { key: parsedData.room_id, id: parsedData.id } });
            dispatch(notify("deleted Comment successfuly", "success"));
        }

        // if (Object.keys(this.callbacks).length === 0) {
        //     return;
        // }
        // if (command === 'messages') {
        //     // this.callbacks[command](parsedData.messages);
        // }
        // if (command === 'new_message') {
        //     // this.callbacks[command](parsedData.message);
        // }
    }

    const initChatUser = (username) => {
        this.sendMessage({ command: 'init_chat', username: username });
    }

    const fetchMessages = (username) => {
        this.sendMessage({ command: 'fetch_messages', username: username });
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
    }



    //   state() {
    //     return this.socketRef.readyState;
    //   }

    //    waitForSocketConnection(callback){
    //     const socket = this.socketRef;
    //     const recursion = this.waitForSocketConnection;
    //     setTimeout(
    //       function () {
    //         if (socket.readyState === 1) {
    //           console.log("Connection is made")
    //           if(callback != null){
    //             callback();
    //           }
    //           return;

    //         } else {
    //           console.log("wait for connection...")
    //           recursion(callback);
    //         }
    //       }, 1); // wait 5 milisecond for the connection...
    return (
        <WebSocketService.Provider value={ws}>

            {children}

        </WebSocketService.Provider>

    )
}


// const WebSocketInstance = WebSocketService.getInstance();

// export default WebSocketInstance;
