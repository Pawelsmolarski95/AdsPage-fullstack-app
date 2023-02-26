import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMGS_URL } from "../../../config";
import styles from "./Ad.module.scss";

const Ad = ({ title, infoSeller, _id, price, location, image }) => {
  return (
    <div>
      <Card style={{ width: "24rem", height: "39rem" }}>
        <img src={IMGS_URL + image} className={styles.imgCard} alt="" />
        <div className={styles.card}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.description}>
            <p><b>Location:</b> {location}</p>
            <p><b>Price:</b> {price}$</p>
            <p><b>Seller:</b> {infoSeller}</p>
          </div>
          <div>
          <Link to={'/ad/'+ _id}>
             <button type="button" className={styles.btn}>Read more</button>
          </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Ad;
