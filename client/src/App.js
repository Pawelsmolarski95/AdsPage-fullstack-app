import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import MainSingleAds from "./components/features/MainSingleAds/MainSingleAds";

import MainLayout from "./components/layouts/MainLayout/MainLayout";
import AddAds from "./components/pages/AddAds/AddAds";
import Advertisements from "./components/pages/Advertisements/Advertisements";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import { checkLoginRequest } from "./redux/usersRedux";

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkLoginRequest());
  // }, [dispatch]);

  return (
    <div>
      <MainLayout>
        <Routes>
          <Route end path="/" element={<Advertisements />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddAds />} />
          <Route path="/ad/:adId" element={<MainSingleAds />} />
        </Routes>
      </MainLayout>
    </div>
  );
};

export default App;
