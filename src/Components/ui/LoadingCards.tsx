import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const LoadingCards = ({ count = 6 }) => {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <Skeleton key={i} variant="rectangular" width={260} height={220} />
  ));

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-9"></div>
      <div className="flex gap-5 flex-wrap items-center flex-col justify-center md:flex-row">
        {skeletons}
      </div>
    </>
  );
};

export default LoadingCards;
