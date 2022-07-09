import React from 'react';
import DynamicSitemap from "react-dynamic-sitemap";
import Routes from './routes';


export default function Sitemap(props) {
  return (
   <DynamicSitemap  routes={Routes} prettify={true} {... props}  />
  )
}
