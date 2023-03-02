import { Button, Container, Row, Col, Form } from "react-bootstrap";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAllAds, loadAdsRequest } from "../../../redux/adsRedux";
import { useEffect, useState } from "react";
import { getUser } from "../../../redux/usersRedux";

import Ads from "../../features/Ads/Ads";

const HomePage = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);
  const user = useSelector(getUser);
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center mt-3">
        <Col className="d-flex ">
          <h2>Advertisements</h2>
        </Col>
        <Col className="d-flex ">
          {user && (
            <Link to={"ad/add"} style={{ textDecoration: "none" }}>
              <Button className="d-flex px-4  btn-success align-items-center">
                Add Ad
              </Button>
            </Link>
          )}
        </Col>
        <Col>
          <Form className="d-flex justify-content-center">
            <Form.Control
              type="search"
              style={{ width: "25rem" }}
              className="me-1"
              onChange={(e) => setSearchPhrase(e.target.value)}
            />
            <Button as={Link} to={"/search/" + searchPhrase}>
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      <Ads ads={ads} />
    </Container>
  );
};

export default HomePage;
