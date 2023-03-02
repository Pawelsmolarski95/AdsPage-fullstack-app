import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { deleteAd } from "../../../redux/adsRedux";

const AdRemove = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const options = {
      method: "DELETE",
      credentials: "include",
    };
    fetch(`${API_URL}/ads/${id}`, options)
      .then(() => {
        dispatch(deleteAd(id));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return null;
};

export default AdRemove;
