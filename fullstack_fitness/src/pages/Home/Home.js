import React from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  // Use location.state to get the user data
  const { state } = useLocation();
  const user = state?.user;

  return (
    <h1>{`Hello ${user?.firstname} ${user?.lastname}`}</h1>
  );
};

export default Home;
