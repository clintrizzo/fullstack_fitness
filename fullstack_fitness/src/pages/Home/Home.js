import React, { useEffect, useState } from 'react';

const Home = () => {
  // Use state to manage user data
  const [userData, setUserData] = useState({ userId: '', username: '' });

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUserData = localStorage.getItem('userData');

    try {
      // Parse the stored JSON data
      const parsedUserData = JSON.parse(storedUserData);

      // Update state with user data
      setUserData(parsedUserData || { userId: '', username: '' });
    } catch (error) {
      console.error('Error parsing user data:', error);
      setUserData({ userId: '', username: '' });
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <>
      {userData.userId ? (
        <h1>{`Hello User ${userData.userId} ${userData.username}`}</h1>
      ) : (
        <h1>User ID not available.</h1>
      )}
    </>
  );
};

export default Home;


