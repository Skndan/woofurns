import { useState, useEffect } from 'react';
import Image from 'next/image';
import apiClient from '@/lib/api/api-client';


interface NetworkImageProps {
  src: string;
  hash?: string;
  alt: string;
}

const NetworkImage = ({ src, hash, alt }: NetworkImageProps) => {
  const [imageUrl, setImageUrl] = useState<string>("/fallback.png");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await apiClient.get(`/v1/static${src}`, {
           responseType: 'blob'
        });
        const blob = await response.data;
        const objectUrl = URL.createObjectURL(blob);
        console.log(objectUrl);
        setImageUrl(objectUrl);
      } catch (error) {
        console.error('Error loading image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [src]);

  return (
    <>
      {loading ? (
        <div className="bg-gray-200 rounded-lg animate-pulse w-full h-full"></div> // Placeholder
      ) : (
        <Image
          src={error ? "/fallback.png" : imageUrl}
          alt={alt} 
          className="rounded-md"
          width={56}
          height={56}
          onError={() => setError(true)} // Handle broken image
        />
      )}
    </>
  );
};

export default NetworkImage;
