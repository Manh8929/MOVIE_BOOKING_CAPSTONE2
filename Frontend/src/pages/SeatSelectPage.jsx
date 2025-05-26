import React from 'react';
import { useLocation } from 'react-router-dom';
import SeatComponent from '../components/SeatComponent/SeatComponent';

const SeatSelectPage = () => {
  const location = useLocation();
  const { showtime, movie, theater } = location.state || {};

  return (
    <div className='mt-[80px]'>
      <SeatComponent showtime={showtime} movie={movie} theater={theater} />
    </div>
  );
};

export default SeatSelectPage;

