import * as React from 'react'

const CountContext = React.createContext()

const initialState = {
    count: 0,
    userId: 0
}
const ACTIONS = {
    ADD_USER_ID: 'addUserId',
}
export const addUserId = (userId) => ({
    type: ACTIONS.ADD_USER_ID,
    userId
})

function storeReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.ADD_USER_ID: {
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
    const value = { state, dispatch }
    return <CountContext.Provider value={value}>{children}</CountContext.Provider>
}

//custom hook
function useGlobalContext() {
    const context = React.useContext(CountContext);
    if (context === undefined) {
        throw new Error("useGlobalContext must be used with a Provider")
    }
    return context;
}

export { GlobalContextProvide, useGlobalContext }