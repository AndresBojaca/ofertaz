import React, { useState, useEffect } from 'react';
import axios from 'axios';

const gradients = [
  'linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)',
  'linear-gradient(135deg, #FF7F94 0%, #623AA2 100%)',
  'linear-gradient(135deg, #B8F1FF 0%, #F06F74 100%)',
  'linear-gradient(135deg, #FFD242 0%, #FF52E5 100%)',
  'linear-gradient(135deg, #F0FF00 0%, #58CFFB 100%)',
  'linear-gradient(135deg, #EECF13 0%, #B210FF 100%)',
  'linear-gradient(135deg, #52E5E7 0%, #130CB7 100%)',
  'linear-gradient(135deg, #92FFC0 0%, #002661 100%)',
  'linear-gradient(135deg, #EEAD92 0%, #6018DC 100%)',
  'linear-gradient(135deg, #EE9AE5 0%, #5961F9 100%)',
  'linear-gradient(135deg, #FFFC71 0%, #2376DD 100%)',
  'linear-gradient(135deg, #FDD819 0%, #E80505 100%)'
];

const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
};

const ProfilePicture = ({ url, name }: any) => {
  const [isValidUrl, setIsValidUrl] = useState(true);

  useEffect(() => {
    const validateUrl = async () => {
      if (!url) {
        setIsValidUrl(false);
        return;
      }
      try {
        const response = await axios.get(url);
        if (response.status !== 200) {
          setIsValidUrl(false);
        }
      } catch (error) {
        setIsValidUrl(false);
      }
    };

    validateUrl();
  }, [url]);

  const getInitials = (name: any) => {
    return name
      ? name
        .split(' ')
        .map((word:any) => word[0])
        .join('')
        .toUpperCase()
      : '';
  };

  return isValidUrl && url ? (
    <img src={url} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
  ) : (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: getRandomGradient(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '25px',
        color: 'white',
      }}
    >
      {getInitials(name)}
    </div>
  );
};

export default ProfilePicture;
