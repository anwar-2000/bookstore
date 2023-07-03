import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const LoadingCards = () => {
  return <>
  <div className='flex flex-col items-center justify-center gap-9 '></div>
  <div className='flex gap-5 flex-wrap items-center flex-col justify-center md:flex-row'>
    <Skeleton variant="rectangular" width={200} height={220} />
    <Skeleton variant="rectangular" width={200} height={220}  />
    <Skeleton variant="rectangular" width={200} height={220}  />
    <Skeleton variant="rectangular" width={200} height={220} />
    </div>
    <div className='flex gap-5 flex-wrap items-center flex-col justify-center md:flex-row'>
    <Skeleton variant="rectangular" width={200} height={220} />
    <Skeleton variant="rectangular" width={200} height={220}  />
    <Skeleton variant="rectangular" width={200} height={220}  />
    <Skeleton variant="rectangular" width={200} height={220} />
    </div>
    </>
};

export default LoadingCards;