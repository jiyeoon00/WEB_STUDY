import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AlbumList from './views/AlbumList';
import PhotoList from './views/PhotoList';
import Logon from './views/Logon';
import { AppProvider } from './contexts/AppContext';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Logon />}></Route>
            <Route path="/album/list" element={<AlbumList />}></Route>
            <Route path="/photo/list" element={<PhotoList />}></Route>
          </Route>
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
