import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddAds = ({ action, actionText, ...props }) => {
    const [title, setTitle] = useState(props.title || '');
    const [description, setDescription] = useState(props.description || '');
    const [publishedDate, setPublishedDate] = useState(props.date || new Date());

    const [image, setImage] = useState(props.image || '');
    const [price, setPrice] = useState(props.price || '');
    const [location, setLocation] = useState(props.location || '');
    const [dateError, setDateError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [imageError, setImageError] = useState(false);
  
    const user = useSelector(getUser);
  
    const {
      register,
      handleSubmit: validate,
      formState: { errors },
    } = useForm();
  
    const handleSubmit = () => {
      setDescriptionError(!description);
      setDateError(!publishedDate);
      setImageError(!image);
  
      const fd = new FormData();
      fd.append('title', title);
      fd.append('description', description);
      fd.append('date', publishedDate);
      fd.append('image', image);
      fd.append('price', price);
      fd.append('location', location);
      fd.append('user', user.id);
  
      if (description && publishedDate && image) {
        action(fd);
        setTitle('');
        setDescription('');
        setPublishedDate('');
        setImage('');
        setPrice('');
        setLocation('');
      }
    };
  
    return (
      <Form
        onSubmit={validate(handleSubmit)}
        className='col-md-8 mx-auto my-4'
        encType='multipart/form-data'
      >
        <Form.Group className='mb-4 col-md-6' controlId='formAdTitle'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            {...register('title', {
              required: true,
              minLength: 10,
              maxLength: 50,
            })}
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter Title'
          />
          {errors.title && (
            <small className='d-block form-text text-danger mt-2'>
              This field is required. Must be between 10 and 50 characters.
            </small>
          )}
        </Form.Group>
  
        <Form.Group className='mb-4 col-md-6' controlId='formAdDate'>
          <Form.Label>Published</Form.Label>
          <DatePicker
            selected={new Date(publishedDate)}
            onChange={(date) => setPublishedDate(date)}
            placeholder='Enter Publish Date'
            dateFormat='dd-MM-yyyy'
          />
          {dateError && (
            <small className='d-block form-text text-danger mt-2'>
              Date can't be empty.
            </small>
          )}
        </Form.Group>
  
        <Form.Group className='mb-4 col-md-6' controlId='formAdLocation'>
          <Form.Label>Location</Form.Label>
          <Form.Control
            {...register('location', { required: true })}
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='Enter Location'
          />
          {errors.location && (
            <small className='d-block form-text text-danger mt-2'>
              This field is required.
            </small>
          )}
        </Form.Group>
  
        <Form.Group className='mb-4 col-md-6' controlId='formAdPrice'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            {...register('price', { required: true, min: 0, max: 99999999 })}
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Enter Price'
          />
          {errors.price && (
            <small className='d-block form-text text-danger mt-2'>
              This field is required. Cannot be lower than 0.
            </small>
          )}
        </Form.Group>
  
        <Form.Group className='mb-4 col-md-6' controlId='formAdImage'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type='file'
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image && (
            <small className='d-block form-text text-secondary mt-2'>
              Uploaded file: {image.name || image}
            </small>
          )}
          {imageError && (
            <small className='d-block form-text text-danger mt-2'>
              This field is required.
            </small>
          )}
        </Form.Group>
  
        <Form.Group className='mb-4' controlId='formAdDescription'>
          <Form.Label>Description</Form.Label>
          <ReactQuill
            theme='snow'
            value={description}
            onChange={setDescription}
            placeholder='Enter Description'
            preserveWhitespace={true}
          />
          {descriptionError && (
            <small className='d-block form-text text-danger mt-2'>
              This field is required. Must contain between 20 and 1 000
              characters.
            </small>
          )}
        </Form.Group>
  
        <Button variant='primary' type='submit'>
          {actionText}
        </Button>
        <br></br>
        <br></br>
        <br></br>
      </Form>
    );
  };
  

export default AddAds;