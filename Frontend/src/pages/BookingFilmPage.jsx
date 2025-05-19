import React from "react";
import DateMovieComponent from "../components/DateMovieComponent/DateMovieComponent";
import { useLocation } from "react-router-dom";
const BookingFilmPage = () => {
  const location = useLocation();
  const { movie, theater } = location.state || {};
console.log('movii nha',movie);
  return (
    <div className='mt-[80px]'>
      <DateMovieComponent movie={movie} theater={theater} />
    </div>
  );
};

export default BookingFilmPage;
