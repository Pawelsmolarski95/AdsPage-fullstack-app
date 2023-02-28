import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdForm from '../AdForm/AdForm';
import { addAd } from '../../../redux/adsRedux';
import { API_URL } from '../../../config';
import { fetchData } from '../../../redux/adsRedux';

const AddAdForm = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = (ad) => {
    dispatch(addAd(ad));
    const formData = new FormData();
    formData.append('title', ad.title);
    formData.append('description', ad.description);
    formData.append('price', ad.price);
    formData.append('image', ad.image);
    formData.append('location', ad.location);
    formData.append('date', ad.date);
    formData.append('user', ad.user);
    formData.append('phone', ad.phone);
    const options = {
      method: 'POST',
      body: formData,
    };
    fetch(`${API_URL}/ads`, options);
    dispatch(fetchData());
    navigate('/');
  };

  return <AdForm action={handleSubmit} actionText='Add new advertisement' />;
};

export default AddAdForm;
