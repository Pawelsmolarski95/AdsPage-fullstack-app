import { Button, Card, Col, Row } from "react-bootstrap";
import { AiFillPhone } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { ImPriceTag } from "react-icons/im";
import { Link } from "react-router-dom";
import { IMAGES_URL } from "../../../config";
import styles from "./Ad.module.scss";

const Ad = ({ title, _id, image, price, phone, location }) => {
  return (
    <Card className={styles.wrapper}>
      <Card.Img
        variant="top"
        src={IMAGES_URL + image}
        className={styles.card_image}
        style={{ height: "20rem", objectFit: "cover" }}
      />
      <Card.Body className="text-white">
        <div className={styles.body}>
          <Card.Title className="text-center">
            <b>
              <h4 className={styles.title}>{title}</h4>
            </b>
          </Card.Title>
          <Card.Subtitle className="my-3">
            <ImPriceTag /> Price:{" "}
            <span className={styles.span}>
              <b> {price}$</b>
            </span>{" "}
          </Card.Subtitle>
          <Card.Text className="mb-3">
            <GoLocation />
            <b> Location: {location}</b>
          </Card.Text>
          <Card.Text className="mb-3">
            <AiFillPhone />
            <b> Phone: {phone}</b>
          </Card.Text>
        </div>
        <Row>
          <Col className="text-center">
            <Link to={"/ad/" + _id}>
              <Button className={styles.button} variant="primary">
                Read more
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Ad;
