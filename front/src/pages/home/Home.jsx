import React, { useEffect } from 'react';
import './Home.scss'
import { addUserId, useGlobalContext } from "../../global-context"
import socketIOClient from "socket.io-client";
const ENDPOINT = 'http://localhost:3005'
export const Home = (props) => {
    const socket = socketIOClient(ENDPOINT);
    useEffect(() => {
        console.log('aici')
        socket.on("connect", data => {
            console.log('here')
            console.log(data);
        });
        const handler = (part) => {
            console.log('client side am primit', part)
        }
        socket.on('newPartInStock', handler)
        return () => socket.off("newPartInStock", handler);
    }, [])

    const { state: { userId }, dispatch } = useGlobalContext();
    useEffect(() => {
        console.log({ userId });
    }, [userId])

    return (
        <div className="home-page">
            Hello, Stefan
            <button onClick={() => {
                socket.emit("savePart", { code: '123' });


            }} >Click</button>

        </div>
    );
}

