import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { ACTION_TYPES } from '../reducers/logonReducer';
import axios from 'axios';

function Logon() {
  const [userId, setUserId] = useState('');
  const [isValid, setIsValid] = useState(false);

  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const onChange = (event) => {
    const value = event.target.value;
    setUserId(value);
    setIsValid(/^[1-9]$|^10$/.test(value));
  };

  const fetchUserDetails = async (userId, signal) => {
    try {
      const url = `https://jsonplaceholder.typicode.com/users?id=${userId}`;
      const response = await axios.get(url, { signal });
      if (response.data.length > 0) {
        return response.data[0];
      } else {
        throw new Error('사용자를 찾을 수 없습니다.');
      }
    } catch (error) {
      alert('로그인 과정에서 문제가 발생했습니다.');
    }
  };

  const logon = async () => {
    if (!isValid) {
      alert('1에서 10사이의 숫자만 입력가능합니다.');
      return;
    }

    const controller = new AbortController();
    const userDetails = await fetchUserDetails(userId, controller.signal);
    if (userDetails) {
      dispatch({
        type: ACTION_TYPES.LOGON,
        payload: {
          userId: userId,
          userName: userDetails.name,
          isLogin: true,
        },
      });
      navigate('/album/list');
    }
    return () => controller.abort();
  };

  return (
    <>
      <input
        type="text"
        id="userId"
        placeholder="ID를 입력하세요"
        onChange={onChange}
        value={userId}
      />
      <button type="button" onClick={logon}>
        Sign In
      </button>
      {!isValid && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          User ID는 1~10번만 가능합니다.
        </p>
      )}
    </>
  );
}

export default Logon;
