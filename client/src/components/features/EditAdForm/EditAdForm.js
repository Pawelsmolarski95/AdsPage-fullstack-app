import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdForm from '../AdForm/AdForm';
import { editAd, getAdById } from '../../../redux/adsRedux';
import { Navigate } from 'react-router-dom';

export const EditAdForm = () => {
  const dispatch = useDispatch();
  const { adId } = useParams();
  const adData = useSelector((state) => getAdById(state, adId));
  let navigate = useNavigate();

  const handleSubmit = (ad) => {
    dispatch(editAd({ ...ad, adId }));
    navigate('/');
  };

  if (!adData) return <Navigate to='/' />;
  return (
    <AdForm
      action={handleSubmit}
      actionText='Edit advertisement'
      price={adData.price}
      title={adData.title}
      localization={adData.localization}
      description={adData.description}
      date={adData.date}
      image={adData.image}
      phone={adData.phone}
    />
  );
};
