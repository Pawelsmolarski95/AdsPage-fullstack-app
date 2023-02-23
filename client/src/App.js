import { Routes, Route } from "react-router-dom";
import MainSingleAds from "./components/features/MainSingleAds/MainSingleAds";

import MainLayout from "./components/layouts/MainLayout/MainLayout";
import AddAds from "./components/pages/AddAds/AddAds";
import Advertisements from "./components/pages/Advertisements/Advertisements";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";


const App = () => {
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
