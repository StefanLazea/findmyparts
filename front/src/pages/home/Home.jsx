import React, { useEffect } from 'react';
import './Home.scss'
import { useGlobalContext } from "../../global-context"

export const Home = (props) => {
    const { state: { count }, dispatch
    } = useGlobalContext();
    useEffect(() => {
        console.log({ count });

    }, [count])
    return (
        <div className="home-page">
            Hello, Stefan
            <button onClick={() => dispatch({ type: "increment" })} >Click</button>

        </div>
    );
}

