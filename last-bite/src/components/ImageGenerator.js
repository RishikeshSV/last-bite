import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PexelsImageFetcher = ({ keyword }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      setError('');

      try {
        console.log("ingre >>>", keyword);
        
        const response = await axios.get('https://api.pexels.com/v1/search', {
          headers: {
            Authorization: 'WpFwtd66zxUk5uPup1WYnAlIsqeDytZZaaqfbMflgfbckpzoB4ImSJwR', // Replace with your Pexels API key
          },
          params: {
            query: keyword,
            per_page: 1, // Fetch only one image
          },
        });

        if (response.data.photos && response.data.photos.length > 0) {
          setImageUrl(response.data.photos[0].src.medium);
        } else {
          setError('No images found.');
        }
      } catch (err) {
        setError('Error fetching image.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchImage();
    }
  }, [keyword]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && <img src={imageUrl} alt={keyword} style={{ width: '200px', height: '200px', borderRadius: '50%', marginTop: '10px'}} />}
    </div>
  );
};

export default PexelsImageFetcher;
