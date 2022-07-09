import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function ExpertCardSkeleton() {
    return (
        <SkeletonTheme baseColor="#bfbeba" highlightColor="#8f8d82">
            <>
                <div className="flex justify-center top-1/3 mt-4">
                    <div className="row p-4 mb-2 border-2 rounded-2xl bg-white shadow-lg w-full lg:w-1/2">
                        <Skeleton height={100} width={100} />
                        <p className='mx-6 mt-6'>
                        <Skeleton height={15} width={150} count={3} />
                        </p>

                        <div className="flex flex-col w-full">
                            <div className="flex flex-row justify-between">
                                <p className='mt-2'>
                                    <Skeleton height={15} width={200} count={1} /></p>
                            </div>
                        </div>
                    </div>

                </div>


            </>
        </SkeletonTheme>


    );
}
