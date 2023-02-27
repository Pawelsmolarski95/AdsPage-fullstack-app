import Home from './components/pages/Home/Home';
import AdPage from './components/pages/AdPage/AdPage';
import EditAdInfo from './components/pages/EditAdInfo/EditAdInfo';
import AddAd from './components/pages/AddAd/AddAd';
import AdRemove from './components/pages/AdRemove/AdRemove';
import Search from './components/pages/Search/Search';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Logout from './components/pages/Logout/Logout';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import NotFound from './components/pages/NotFound/NotFound';
import Header from './components/views/Header';
import Footer from './components/views/Footer/Footer';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchData } from './redux/adsRedux';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchData()), [dispatch]);

  return (
    <main>
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ad/:adId' element={<AdPage />} />
          <Route path='/ad/edit/:adId' element={<EditAdInfo />} />
          <Route path='/ad/add' element={<AddAd />} />
          <Route path='/ad/remove/:adId' element={<AdRemove />} />
          <Route path='/search/:searchPhrase' element={<Search />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </main>
  );
};

export default App;
