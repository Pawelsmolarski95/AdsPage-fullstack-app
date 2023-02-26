import { Routes, Route } from "react-router-dom";
import SingleAds from "./components/pages/SingleAds/SingleAds";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import Advertisements from "./components/pages/Advertisements/Advertisements";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import AddAd from "./components/features/AddAd/AddAd";

const App = () => {


  return (
    <div>
      <MainLayout>
        <Routes>
          <Route end path="/" element={<Advertisements />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddAd />} />
          <Route path="/ad/:adId" element={<SingleAds />} />
        </Routes>
      </MainLayout>
    </div>
  );
};

export default App;
