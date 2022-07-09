import React, { Suspense } from 'react';
import Openner from './openner.jsx';
const Navbar = React.lazy(() => import('./navbar.jsx'));
const Card = React.lazy(() => import('./cards.jsx'));
const Banner = React.lazy(() => import('./banner.jsx'));
const Footer = React.lazy(() => import('./footer.jsx'));


const Home = () => {


    return (
        <>
            <Suspense fallback={<Openner/>}>


                <Navbar key={1} />
                <Banner key={2} />
                <Card key={3} />
                <Footer key={4} />
            </Suspense>
        </>

    )

}
export default Home;