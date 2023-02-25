import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { BallTriangle } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";

import { IMGS_URL } from "../../../config";
import { getAdById } from "../../../redux/adsRedux";
import { getUser } from "../../../redux/usersRedux";
import { dateToString } from "../../../utils/dateToString";
import styles from "./MainSingleAds.module.scss";

const MainSingleAds = () => {
  const { adId } = useParams();
  const user = useSelector(getUser);
  const adData = useSelector((state) => getAdById(state, adId));

  if (!adData) return <Navigate to="/" />;
  return (
    <Container>
      <Card bg={"light"} className="my-5 justify-content-center">
        <Row className="column">
          <Col className="col-12 col-md-5 align-self-center mr-5">
            <Card.Img
              crossOrigin="anonymous"
              src={IMGS_URL + adData.image}
              style={{ height: "100%" }}
            />
          </Col>
          <Col className="col-12 col-md-7">
            
              <Card.Text className=" mt-5">
                <h3><b>{adData.title}</b></h3>
              </Card.Text>
              {/* <Image
                className='rounded-circle mb-3'
                style={{ resizeMode: 'cover', maxHeight: 60, maxWidth: 60 }}
                crossOrigin='anonymous'
                src={IMGS_URL + adData.user.avatar}
              /> */}
              {/* <Card.Text className='mb-0'>
                <span className='fw-bold'>User: </span>
                {adData.user.login}
              </Card.Text> */}
              {/* <Card.Text>
                <span className='fw-bold'>Tel: </span>
                {adData.user.telephone}
              </Card.Text> */}
              <Card.Text className="mb-0">
                <span className="fw-bold">Published: </span>
                {dateToString(new Date(adData.data))}
              </Card.Text>
              <Card.Text>
                <span className="fw-bold">Location: </span>
                {adData.location}
              </Card.Text>
              <Card.Text className="my-3">
                <span className="fw-bold">Price: </span>
                {adData.price}$
              </Card.Text>
              <Card.Text className="my-3">
                <span className="fw-bold">Description: </span>
                <br />
                {adData.description}
              </Card.Text>

              <div className="mt-3 d-flex justify-content-end align-items-start">
                <Link to={`/ads/edit/${adId}`}>
                  <Button className="m-2" variant="outline-info">
                    Edit
                  </Button>
                </Link>
                {/* <DeleteAd id={adData._id} /> */}
              </div>
           
          </Col>
        </Row>
      </Card>
    </Container>
  );
};
export default MainSingleAds;
