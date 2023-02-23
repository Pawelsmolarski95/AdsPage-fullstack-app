import axios from "axios";
import { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { API_URL } from "../../../config";

const Advertisements = () => {
  const [ads, setAds] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/ads`).then((res) => {
      setAds(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {loading ? (
        <BallTriangle
          height={140}
          width={140}
          radius={5}
          color="#0d6efd"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      ) : null}
    </div>
  );
};
export default Advertisements;
