import { createContext } from 'react';
import { useReducer } from 'react';
import { LogonReducer } from '../reducers/logonReducer';
import { getStateFromLocalStorage } from '../utils/localStorageUtils';

const initialState = getStateFromLocalStorage('appState') || {
  isLogon: false,
  userId: '',
  userName: '',
};

export const AppContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LogonReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
