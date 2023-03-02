import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../config";
import { getAdById } from "../../../redux/adsRedux";
import AdForm from "../AdForm/AdForm";

const AdEdit = () => {
  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));
  const navigate = useNavigate();

  const handleSubmit = (ad) => {
    const fd = new FormData();
    fd.append("title", ad.title);
    fd.append("description", ad.description);
    fd.append("price", ad.price);
    fd.append("photo", ad.photo);
    fd.append("location", ad.location);
    fd.append("publicationDate", ad.publicationDate);
    fd.append("seller", ad.seller);

    const options = {
      method: "PUT",
      body: fd,
      credentials: "include",
    };
    fetch(`${API_URL}/api/ads/${id}`, options)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <h2>Edit Ad</h2>
        <AdForm
          action={handleSubmit}
          actionText="Edit ad"
          title={adData.title}
          description={adData.description}
          publicationDate={adData.publicationDate}
          photo={adData.photo}
          price={adData.price}
          location={adData.location}
          seller={adData.seller}
          id={id}
        />
      </Col>
    </Row>
  );
};

export default AdEdit;
