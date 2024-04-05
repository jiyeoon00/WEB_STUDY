import { useEffect, useState } from 'react';
import { getStateFromLocalStorage } from '../utils/localStorageUtils';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function AlbumList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const updateSelectedAlbumFromLocationState = () => {
    if (location.state) {
      setSelectedAlbum({ ...location.state });
    }
  };

  const fetchAlbums = async (userId, signal) => {
    const url = `https://jsonplaceholder.typicode.com/albums?userId=${userId}`;
    try {
      const response = await axios.get(url, { signal });
      setAlbums(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error('앨범을 불러오는 중 오류가 발생했습니다:', error);
      }
    }
  };

  useEffect(() => {
    updateSelectedAlbumFromLocationState();

    const storedState = getStateFromLocalStorage('appState');
    const userId = storedState.userId;

    const controller = new AbortController();
    fetchAlbums(userId, controller.signal);

    return () => controller.abort();
  }, []);

  const handleAlbumClick = (album) => {
    setSelectedAlbum({ ...album });
  };

  const handleDetailViewClick = () => {
    navigate('/photo/list', { state: selectedAlbum });
  };

  const getAlbumItemStyle = (album) => ({
    textAlign: 'left',
    backgroundColor: selectedAlbum?.id === album.id ? 'lightgray' : 'white',
    border:
      selectedAlbum?.id === album.id
        ? '2px solid gray'
        : '1px solid transparent',
  });

  return (
    <div className="container mt-3" style={{ marginTop: '50px' }}>
      <span>앨범목록</span>
      <button
        type="button"
        className="btn btn-primary"
        disabled={!selectedAlbum}
        onClick={handleDetailViewClick}
      >
        앨범 상세보기
      </button>
      <ul className="list-group list-group-flush">
        {albums.map((album, index) => {
          return (
            <li
              key={album.id + album.title}
              className="list-group-item"
              style={getAlbumItemStyle(album)}
              onClick={() => {
                handleAlbumClick(album);
              }}
            >
              {index + 1}. {album.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AlbumList;
