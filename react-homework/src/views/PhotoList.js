import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageList from '../components/ImageList';

function PhotoList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, title } = location.state;
  const [photos, setPhotos] = useState([]);

  const handleBack = () => navigate('/album/list', { state: location.state });

  const fetchPhotos = async (albumId, signal) => {
    try {
      const url = `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`;
      const response = await axios.get(url, { signal });
      setPhotos(response.data);
    } catch (error) {
      console.error('사진을 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchPhotos(id, controller.signal);

    return () => controller.abort();
  }, []);

  return (
    <>
      <h1>{title} </h1>
      <ImageList images={photos} />
      <button type="button" style={{ margin: '10px' }} onClick={handleBack}>
        뒤로
      </button>
    </>
  );
}

export default PhotoList;
