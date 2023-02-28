import styles from './CardBox.module.scss';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { IMAGES_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const CardBox = ({ title, price, location, image, _id, user }) => {
  const loggedUser = useSelector(getUser);

  return (
    <Card className={styles.card_wrapper}>
      <Card.Img
        variant='top'
        src={IMAGES_URL + image}
        className={styles.card_image}
      />
      <Card.Body>
        <div className={styles.body}>
          <Card.Title className='d-flex align-items-baseline '>Price: <span className={styles.span}><b> {price}$</b></span> </Card.Title>
          <Card.Subtitle className='my-3'>
            <b>{title}</b>
          </Card.Subtitle>
          <Card.Text className='mb-3'>
            <b>Location: {location}</b>
          </Card.Text>
        </div>
        <Row>
          <Col>
            <Link to={'/ad/' + _id}>
              <Button className={styles.button} variant='primary'>
                Read more
              </Button>
            </Link>
          </Col>
          {loggedUser !== null && loggedUser.login === user && (
            <Col>
              <p>It's yours Ad</p>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CardBox;
