import axios from "axios";
import { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { Container } from "react-bootstrap";
import { API_URL } from "../../../config";
import styles from "./Advertisements.module.scss";
import SingleAds from "../SingleAds/SingleAds";

const Advertisements = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
    setLoading(true);
    try {
      const {data: response} = await axios.get(`${API_URL}/ads`);
      setAds(response);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  }

  fetchData();
}, []);


  return (
    <div>
      <div className={styles.searchContainer}>
        <form type="submit">
          <input
            type="text"
            name="search"
            className={styles.search}
            placeholder="Search"
          />
        </form>
      </div>
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
      <Container className="d-flex flex-row flex-wrap gap-3 justify-content-around align-content-center mb-5 my-5">
        {ads.map((ad) => (
          <SingleAds key={ad.id} {...ad} />
        ))}
      </Container>
    </div>
  );
};
export default Advertisements;
