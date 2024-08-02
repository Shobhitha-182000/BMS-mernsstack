import React, { useState } from 'react';
import axios from 'axios';

const ShareViaEmail = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('/api/upload', formData);
      const uploadedImageUrl = response.data.imageUrl; // Assuming the server returns the URL of the uploaded image
      setImageUrl(uploadedImageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const shareViaEmail = () => {
    if (imageUrl) {
      const subject = encodeURIComponent('Check out this image!');
      const body = encodeURIComponent(`Here's an image you might like: ${imageUrl}`);
      const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
      window.open(mailtoUrl, '_blank');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <button onClick={shareViaEmail}>Share via Email</button>}
    </div>
  );
};

export default ShareViaEmail;
