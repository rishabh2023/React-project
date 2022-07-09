import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css' 

export default function ProfileSkeleton() {
  return( 
    <SkeletonTheme baseColor="#bfbeba" highlightColor="#8f8d82">
        <>
        <p className='mx-4 mt-3'>
            <Skeleton  count={4} />
        </p>  
         
        </>
  </SkeletonTheme>
  );
}
