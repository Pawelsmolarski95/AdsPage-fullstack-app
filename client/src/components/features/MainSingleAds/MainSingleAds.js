import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { BallTriangle } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { API_URL, IMGS_URL } from "../../../config";
import styles from "./MainSingleAds.module.scss";

const MainSingleAds = () => {
  const [ad, setAd] = useState([]);
  const [loading, setLoading] = useState(true);
  const { adId } = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
    setLoading(true);
    try {
      const {data: response} = await axios.get(`${API_URL}/ads/${ adId }`);
      console.log(response);
      setAd(response);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  }
  fetchData();
}, []);


  
  return (
    <div>
      <div className={styles.spinner}>
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
      {/* <Card style={{ width: "24rem", height: "39rem" }}>
        <img src={IMGS_URL + ad.image} className={styles.imgCard} alt="" />
        <div className={styles.card}>
          <h1 className={styles.title}>{ad.title}</h1>
          <div className={styles.description}>
            <p>
              <b>Location:</b> {ad.location}
            </p>
            <p>
              <b>Price:</b> {ad.price}$
            </p>
            <p>
              <b>Seller:</b> {ad.infoSeller}
            </p>
          </div>
          <div></div>
        </div>
      </Card> */}
    </div>
  );
};

export default MainSingleAds;
