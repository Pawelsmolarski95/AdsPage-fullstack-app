import { BallTriangle } from "react-loader-spinner";
import {  Container } from "react-bootstrap";
import styles from "./Advertisements.module.scss";
import {  useSelector } from "react-redux";
import { getAllAds } from "../../../redux/adsRedux";
import Ad from "../../common/Ad/Ad";

const Advertisements = () => {
  const ads = useSelector(getAllAds);

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
      {/* <div className={styles.spinner}>
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
      </div> */}
      <Container className="d-flex flex-row flex-wrap gap-3 justify-content-around align-content-center mb-5 my-5">
        {ads.map((ad) => (
          <Ad key={ad.id} {...ad} />
        ))}
      </Container>
    </div>
  );
};
export default Advertisements;
