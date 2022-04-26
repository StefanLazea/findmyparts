import React, { useEffect } from 'react';
import './Home.scss'
import { addUserId, useGlobalContext } from "../../global-context"

export const Home = (props) => {
    const { state: { userId }, dispatch } = useGlobalContext();
    useEffect(() => {
        console.log({ userId });
    }, [userId])

    return (
        <div className="home-page">
            Hello, Stefan
            <button onClick={() => {
                dispatch(addUserId('8765'))

            }} >Click</button>

        </div>
    );
}

