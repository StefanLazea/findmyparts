import * as React from 'react'
import io from 'socket.io-client'

const GlobalContext = React.createContext();
const BACKEND_ENDPOINT = process.env.REACT_APP_BACK_END_URL;

const initialState = {
    count: 0,
    userId: localStorage.getItem('userId') || 0, // TODO: save as cookie not as this
    socket: io(BACKEND_ENDPOINT)
}
const ACTIONS = {
    ADD_USER_ID: 'addUserId',
}

//todo add a actions.js file into a global-context directory
export const addUserId = (userId) => ({
    type: ACTIONS.ADD_USER_ID,
    userId
})

function storeReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.ADD_USER_ID: {
            localStorage.setItem('userId', action.userId);
            return {
                ...state,
                userId: action.userId,
            };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function GlobalContextProvide({ children }) {
    const [state, dispatch] = React.useReducer(storeReducer, initialState)
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    initialState.socket.on("connect", data => {
        console.log('Socket is connected')
        console.log(data);
    });
    const value = { state, dispatch }
    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

//custom hook
function useGlobalContext() {
    const context = React.useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobalContext must be used with a Provider")
    }
    return context;
}

export { GlobalContextProvide, useGlobalContext }