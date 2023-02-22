import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layouts/MainLayout/MainLayout";
import AddAds from "./components/pages/AddAds/AddAds";
import Advertisements from "./components/pages/Advertisements/Advertisements";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import SingleAds from "./components/pages/SingleAds/SingleAds";

const App = () => {
  return (
    <div>
      <MainLayout>
        <Routes>
          <Route path="/api/ads" element={<Advertisements />} />
          <Route path="/api/:id" element={<SingleAds />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddAds />} />
        </Routes>
      </MainLayout>
    </div>
  );
};

export default App;
