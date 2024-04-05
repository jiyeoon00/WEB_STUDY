import { saveStateToLocalStorage } from '../utils/localStorageUtils';

const ACTION_TYPES = {
  LOGON: 'LOGON',
  LOGOUT: 'LOGOUT',
};

const updateStateAndLocalStorage = (newState) => {
  saveStateToLocalStorage('appState', newState);
  return newState;
};

function LogonReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.LOGON:
      return updateStateAndLocalStorage({
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName,
        isLogon: true,
      });

    case ACTION_TYPES.LOGOUT:
      return updateStateAndLocalStorage({
        ...state,
        userId: '',
        userName: '',
        isLogon: false,
      });

    default:
      throw new Error('알수없는 액션입니다.');
  }
}

export { ACTION_TYPES, LogonReducer };
