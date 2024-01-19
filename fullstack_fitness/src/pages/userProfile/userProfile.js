import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({ userId: '', firstname: '', lastname: '' });

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');

    try {
      const parsedUserData = JSON.parse(storedUserData);

      setUserData(parsedUserData || { userId: '', firstname: '', lastname: '' });
    } catch (error) {
      console.error('Error parsing user data:', error);
      setUserData({ userId: '', username: '' });
    }
  }, []);

  return (
    <>
      {userData.userId ? (
        <h1>{`Hello ${userData.firstname} ${userData.lastname} welcome to your profile`}</h1>
      ) : (
        <h1>User ID not available.</h1>
      )}
    </>
  );
};

export default Profile;


