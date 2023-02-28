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
import { format } from 'date-fns';

const AdPage = () => {
  const dispatch = useDispatch();
  const { adId } = useParams();
  const adData = useSelector((state) => getAdById(state, adId));
  const user = useSelector(getUser);
  const formatDate = format(new Date(),"MMMM do, yyyy H:mma")

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
        <Col xs='12' lg='7' >
          <Card className={styles.card_wrapper}>
            <Card.Img  styles={{ height: '20rem'}} variant='top' src={IMAGES_URL + adData.image} />

            <Card.Body>
              <Card.Title className='mb-3'>Price: <span className={styles.price}>{adData.price}$</span> </Card.Title>
              <Card.Subtitle className='mb-3'>
                <b>Title: <span className={styles.title}>{adData.title}</span> </b>
              </Card.Subtitle>
              <Card.Text className='mb-3'>
                <b>Location: {adData.location}</b>
              </Card.Text>
              <Card.Text>{adData.description}</Card.Text>
              <Card.Text>Published: {formatDate}</Card.Text>
              <Card.Text>Author: {adData.infoSeller}</Card.Text>
              <Card.Text>Phone: {adData.phone}</Card.Text>
            </Card.Body>
             {user && (
          <Col xs='12' lg='12' className='text-center mb-3'>
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
          </Card>
         
        </Col>
        
      </Row>
    </div>
  );
};

export default AdPage;
