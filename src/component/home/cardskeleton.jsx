import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CardSkeleton() {
  return (

    
 
     
      <SkeletonTheme baseColor="#bfbeba" highlightColor="#8f8d82">
         <>
           
            <div className="lg:w-1/4 md:w-1/2 p-3 border-gray-300  bg-gray-100 text-center border-r-20 rounded-2xl h-auto w-full ml-10 mr-10  mt-6 mb-10">
                <a className="block  rounded">
                <Skeleton circle= {true} height={160} width={160}/>
                <div className='mx-2 mt-4'>
                <Skeleton count={2} width={150}/>
                </div>
                <div className='mx-2 mt-4'>
                <Skeleton count={2}/>
                </div>
                <div className='mx-2 mt-4'>
                <Skeleton count={1} width={90}/>
                </div>
                </a>
                </div>
             </>

            </SkeletonTheme>

    

 
  );
}
