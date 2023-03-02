import { useState } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getAdById } from "../../../redux/adsRedux";
import { Link } from "react-router-dom";
import { IMAGES_URL } from "../../../config";
import { getUser } from "../../../redux/usersRedux";
import styles from "./AdPage.module.scss";
import { ImPriceTag } from 'react-icons/im';
import { GoLocation} from 'react-icons/go';
import { AiFillPhone} from 'react-icons/ai';
import { BsFillCalendarDateFill, BsFillPersonFill} from 'react-icons/bs';


const AdPage = () => {
  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));
  const user = useSelector(getUser);
  const [show, setShow] = useState(false);

  const formatDate = (adData.data).slice(0, 10).replace(/-/g, "/");
  
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  if (!adData) return <Navigate to="/" />;
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This operation will completely remove this ad from the app. Are you
          sure you want to do that?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" to={`/ad/remove/${id}`} as={Link}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="justify-content-end mt-4">
        <Col md={6} className="d-flex justify-content-end">
          {user && (
            <span>
              <Link to={"/ad/edit/" + id}>
                <Button
                  className="btn-secondary px-3"
                  size="sd"
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Edit
                </Button>
              </Link>
              <Button className="btn-danger px-3" size="sd" onClick={handleShow}>
                Delete
              </Button>
            </span>
          )}
        </Col>
      </Row>
      <div>
        <Row className="d-flex justify-content-center m1-5">
          <Col xs="12" lg="7">
            <div className={styles.card}>
              <Card.Img
                style={{ height: "30rem", objectFit: "cover" }}
                variant="top"
                src={IMAGES_URL + adData.image}
              />
              <Card.Body>
                <Card.Title className="my-3 text-center">
                  <b>
                    <span className={styles.title}>{adData.title}</span>{" "}
                  </b>
                </Card.Title>
                <Card.Subtitle className="mb-3">
                <ImPriceTag/> <b> Price:</b> <span className={styles.price}>{adData.price}$</span>{" "}
                </Card.Subtitle>
                <Card.Text className="mb-3">
                  <GoLocation/><b> Location:</b> {adData.location}
                </Card.Text>
                <Card.Text>{adData.description}</Card.Text>
                <Card.Text><BsFillCalendarDateFill/><b> Published:</b> {formatDate}</Card.Text>
                <Card.Text><BsFillPersonFill/><b> Author:</b> {adData.infoSeller}</Card.Text>
                <Card.Text><AiFillPhone /><b> Phone:</b> {adData.phone}</Card.Text>
              </Card.Body>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdPage;
