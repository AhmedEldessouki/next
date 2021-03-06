import React from 'react'

type UserContextType = {
  users: string | null
  dispatch: React.Dispatch<any>
} | null

const UserContext = React.createContext<UserContextType>(null)
UserContext.displayName = 'User Context'

const initialState = null

const reducer = (prevState: string, nextState: string) => {
  return nextState
}

function UserProvider({children}) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{users: state, dispatch}}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  const value = React.useContext(UserContext)
  if (!value) {
    throw new Error('useUser Needs to be used inside UserProvider')
  }
  const {users, dispatch} = value
  return {users, dispatch}
}

export {UserProvider, useUser}
