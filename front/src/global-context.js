import * as React from 'react'

const CountContext = React.createContext()

function countReducer(state, action) {
    switch (action.type) {
        case 'increment': {
            console.log("here")
            return { count: state.count + 1 }
        }
        case 'decrement': {
            return { count: state.count - 1 }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function GlobalContextProvide({ children }) {
    const [state, dispatch] = React.useReducer(countReducer, { count: 0 })
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