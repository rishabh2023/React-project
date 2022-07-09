import React from 'react'
import { Route, Switch } from "react-router-dom";
import Blogs from './component/blogs/blogs';
import Experts from './component/experts/experts';
import Home from './component/home/Home';
import Services from './component/services/services';

export default function Routes() {
    return (
        <Switch>
            <Route  path="/" component={Home} sitemapIndex = {true} priority = {1} changefreq = {"always"} />
            <Route  path="/experts" component={Experts} sitemapIndex = {true} priority = {1} changefreq = {"always"}/>
            <Route  path="/services" component={Services} sitemapIndex = {true} priority = {1} changefreq = {"always"}/>
            <Route  path="/blog" component={Blogs} sitemapIndex = {true} priority = {1} changefreq = {"daily"} />
        </Switch>
    )
}
