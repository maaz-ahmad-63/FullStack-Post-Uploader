import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageUrl', image);
    formData.append('content', content);
    const res = await fetch('http://localhost:3000/upload-post', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      navigate('/view');
    }
  };

  return (
    <div className="upload-page">
      <h2>Upload Image & Content</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        <textarea
          placeholder="Enter content..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadPage;
