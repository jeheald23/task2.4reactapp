import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './main-view.scss';
import { apiUrl } from '../../constants.js';

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${apiUrl}/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${apiUrl}/images`);
      setUploadedImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const uploadImage = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result.split(',')[1];
      try {
        const response = await fetch(`${apiUrl}/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image: base64data,
            filename: file.name,
            mimetype: file.type
          })
        });

        const data = await response.json();
        console.log('Uploaded Image URL:', data.imageUrl);

        // Fetch images again to update the list
        fetchImages();
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    const file = fileInputRef.current.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchImages();
  }, [uploadedImages]);

  return (
    <div className="main-view">
      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-card">
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <div className="movie-details">
              <h2>{movie.title}</h2>
              <p>Directed by: {movie.director.name}</p>
            </div>
          </div>
        ))}
      </div>
      <h2>Upload Image</h2>
      <div className="uploaded-images-container">
        {uploadedImages.map((image, index) => (
          <div key={index} className="uploaded-image-card">
            <img src={image} alt="Uploaded" />
          </div>
        ))}
      </div>
      <form onSubmit={handleImageUpload}>
        <input type="file" name="image" accept="image/*" ref={fileInputRef} required />
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
};

export default MainView;

