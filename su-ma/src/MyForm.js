// MyForm.js
import React, { useState } from 'react';
import { database, storage, ref, push } from './firebase';
import { uploadBytes, getDownloadURL, ref as sRef } from 'firebase/storage';

const MyForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', photo: null });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setPhoto(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handlePhotoUpload = async () => {
    if (photo) {
      const storageRef = sRef(storage, 'photos/' + photo.name);

      try {
        // Upload photo
        await uploadBytes(storageRef, photo);

        // Get photo URL
        const photoURL = await getDownloadURL(storageRef);

        // Update formData with photoURL
        setFormData((prevData) => ({ ...prevData, photo: photoURL }));

        // Log success message and photo URL
        console.log('Photo upload successful:', photoURL);
      } catch (error) {
        // Log error message
        console.error('Error uploading photo:', error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload photo first
    await handlePhotoUpload();

    // Push data to Firebase database
    const dataRef = ref(database, 'data');
    push(dataRef, formData);

    // Clear form
    setFormData({ name: '', email: '', photo: null });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Photo:
        <input type="file" name="photo" onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
