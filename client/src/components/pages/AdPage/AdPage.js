import styles from './AdPage.module.scss';
import { getAdById } from '../../../redux/adsRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IMAGES_URL } from '../../../config';
import { getUser } from '../../../redux/usersRedux';
import { removeAd } from '../../../redux/adsRedux';
import ModalDelete from '../../features/ModalDelete/ModalDelete';

const AdPage = () => {
  const dispatch = useDispatch();
  const { adId } = useParams();
  const adData = useSelector((state) => getAdById(state, adId));
  const user = useSelector(getUser);
  console.log(user);
  // const formatDate = adData.date.slice(0, 10).replace(/-/g, '/') || '';

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(removeAd(adId));
    handleClose();
  };

  if (showModal)
    return (
      <ModalDelete
        showModal={showModal}
        handleClose={handleClose}
        handleRemove={handleRemove}
      />
    );
  if (!adData) return <Navigate to='/' />;

  return (
    <div>
      <Row className='d-flex justify-content-center mt-5'>
        <Col xs='12' lg='5'>
          <Card className={styles.card_wrapper}>
            <Card.Img variant='top' src={IMAGES_URL + adData.image} />

            <Card.Body>
              <Card.Title className='mb-3'>Price: {adData.price}$</Card.Title>
              <Card.Subtitle className='mb-3'>
                <b>Title: {adData.title}</b>
              </Card.Subtitle>
              <Card.Text className='mb-3'>
                <b>Localization: {adData.location}</b>
              </Card.Text>
              <Card.Text>{adData.description}</Card.Text>
              {/* <Card.Text>Published: {formatDate}</Card.Text> */}
              <Card.Text>Author: {adData.infoSeller}</Card.Text>
              <Card.Text>Phone number: {adData.phone}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        { user && (
          <Col xs='12' lg='4'>
            <Link to={'/ad/edit/' + adId}>
              <Button variant='outline-info' className='m-2'>
                Edit
              </Button>
            </Link>
            <Button variant='outline-danger' onClick={handleShow}>
              Delete
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default AdPage;
