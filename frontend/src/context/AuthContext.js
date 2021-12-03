import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducers";

const newUser = JSON.parse(localStorage.getItem('profile'))
const INITIAL_STATE = {
  user: newUser,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const Auth = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
      }}
    >
        {children}
    </AuthContext.Provider>
  );
};
