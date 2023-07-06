import { Skeleton } from '@mui/material';
import React from 'react'

interface Props {}

const LoadingArticles = ({count = 4} ) => {
    const skeletons = Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} variant="rectangular" width={"80vw"} height={"50vh"} />
      ));
    
      return (
        <>
          <div className="flex gap-5 flex-wrap items-start flex-col justify-center md:flex-row">
            {skeletons}
          </div>
        </>
      );
    };

export default LoadingArticles