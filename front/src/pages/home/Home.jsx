import React, { useEffect } from 'react';
import './Home.scss'
import { addUserId, useGlobalContext } from "../../global-context"
export const Home = (props) => {
    const { state: { socket, userId } } = useGlobalContext();

    useEffect(() => {
        console.log('aici')
        const handler = (parts) => {
            console.log('client side am primit', parts)
        }
        socket.on('partsListUpdate', handler)
        return () => socket.off("partsListUpdate", handler);
    }, [])

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

