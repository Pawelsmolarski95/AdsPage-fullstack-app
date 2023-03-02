import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findAdBySearchPhrase, getAllAds } from "../../../redux/adsRedux";
import Ads from "../Ads/Ads";

const Search = () => {
  const { searchPhrase } = useParams();
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);

  useEffect(() => {
    dispatch(findAdBySearchPhrase(searchPhrase));
  });

  return (
   
      <Row className="mb-5 d-flex justify-content-center">
        <Ads ads={ads} />
      </Row>
  
    
  );
};

export default Search;
