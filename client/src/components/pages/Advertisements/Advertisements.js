import { useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import { Alert, Container } from "react-bootstrap";
import styles from "./Advertisements.module.scss";
import SingleAds from "../SingleAds/SingleAds";
import { useDispatch, useSelector } from "react-redux";
import { getAllAds, getRequest, loadAdsRequest } from "../../../redux/adsRedux";

const Advertisements = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  if (request.pending)
    return (
      <div className={styles.spinner}>
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
      </div>
    );
  else if (request.error) return <Alert color="warning">{request.error}</Alert>;
  else if (request.success)
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

        <Container className="d-flex flex-row flex-wrap gap-3 justify-content-around align-content-center mb-5 my-5">
          {ads.map((ad) => (
            <SingleAds key={ad.id} {...ad} />
          ))}
        </Container>
      </div>
    );
};
export default Advertisements;
