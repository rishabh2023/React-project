import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import Home from "./component/home/Home.js";
import Contact from "./component/contactus/contact.jsx";
import Experts from "./component/experts/experts.jsx";
import { AppProvider } from './component/home/context.js';
import Services from "./component/services/services.jsx";
import Profile from "./component/profile/profile.jsx";
import Servicemain from "./component/service_details/servicemain.jsx";
import Form from "./component/apply/form.jsx"
import Login from "./component/authentication/login.jsx";
import Forgotpassword from "./component/authentication/forgotpassword.jsx";
import ResetPage from "./component/authentication/resetpass.jsx";
import Signup from "./component/register/signup.jsx";
import Meetlist from "./component/my_meets/meetlist.jsx";
import Dashboard from "./component/dashboard/dashboard.jsx";
import Meetings from "./component/dashboard/meetings.jsx";
import Aboutme_edit from "./component/dashboard/aboutme_edit.jsx";
import Current_plan from "./component/dashboard/current_plan.jsx";
import Price from "./component/dashboard/pricing.jsx";
import Myservice from "./component/dashboard/myservice.jsx";
import Mytransaction from "./component/dashboard/transactions.jsx";
import Mainserviceform from "./component/dashboard/mainserviceform.jsx";
import Maintimeform from "./component/dashboard/maintimeslot.jsx";
import Order from "./component/orders/orders.jsx";
import Order_detail from "./component/orders/order-detail/order_detail.jsx";
import Results from "./component/search_result/results.jsx";
import TrandingSearches from "./component/dashboard/tranding.jsx";
import ProtectedRoute from './ProtectedRoute';
import ExpertsProtectedRoute from "./ExpertsProtectedRoutes.js";
import EditService from "./component/dashboard/editservice.jsx";
import Mainrating from "./component/ratings/mainrating.jsx";
import Update from "./component/profile_update/update.jsx";
import BankDetails from "./component/dashboard/bankdetails.jsx";
import LiveMeeting from "./component/my_meets/livemeeting.jsx";
import Privacy from "./component/policies/privacy.jsx";
import Termsandconditions from "./component/policies/termsandconditions.jsx";
import PageNotFound from "./component/pages/pageNotFound.jsx";
import Blogs from "./component/blogs/blogs.jsx";
import Sitemap from "./sitemap.js";
import RefundPolicy from './component/policies/refundpolicy';

function App() {
   return (
      <>


         <BrowserRouter>

            <Switch>
               <AppProvider>

                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/contact" component={Contact}></Route>
                  <Route exact path="/experts" component={Experts}></Route>
                  <Route exact path="/services" component={Services}></Route>
                  <Route exact path="/privacypolicy" component={Privacy}></Route>
                  <Route exact path="/termsandconditions" component={Termsandconditions}></Route>
                  <Route exact path="/refund" component={RefundPolicy}></Route>
                  <Route exact path="/blog" component={Blogs}></Route>
                  <Route exact path="/profile/:id" component={Profile}></Route>
                  <Route exact path="/service/:id" component={Servicemain}></Route>
                  <Route exact path="/profile/:id/rating" component={Mainrating}></Route>
                  <Route exact path="/orders/:id" component={Order_detail}></Route>
                  <Route exact path="/apply"><ProtectedRoute Cmp={Form} /> </Route>
                  <Route exact path="/meet"><ProtectedRoute Cmp={Meetlist} /></Route>
                  <Route exact path="/orders"><ProtectedRoute Cmp={Order} /></Route>
                  <Route exact path="/results/search/:id" component={Results}></Route>
                  <Route exact path="/login" component={Login}></Route>
                  <Route exact path="/register" component={Signup}></Route>
                  <Route exact path="/linkedin" component={LinkedInCallback} />
                  <Route exact path="/reset" component={Forgotpassword}></Route>
                  <Route exact path="/reset/password" component={ResetPage}></Route>
                  {/* <Route exact path="/sitemap.xml" component={Sitemap}></Route> */}
                  <Route exact path="/dashboard"><ExpertsProtectedRoute Cmp={Dashboard} /></Route>
                  <Route exact path="/dashboard/meet"><ExpertsProtectedRoute Cmp={Meetings} /></Route>
                  <Route exact path="/meet/live/expert/:id"><ProtectedRoute Cmp={LiveMeeting} /></Route>
                  <Route exact path="/dashboard/about/edit/:id"><ExpertsProtectedRoute Cmp={Aboutme_edit} /></Route>
                  <Route exact path="/dashboard/current-pack"><ExpertsProtectedRoute Cmp={Current_plan} /></Route>
                  <Route exact path="/dashboard/price"><ExpertsProtectedRoute Cmp={Price} /></Route>
                  <Route exact path="/dashboard/services"><ExpertsProtectedRoute Cmp={Myservice} /></Route>
                  <Route exact path="/dashboard/services/edit/:id"><ExpertsProtectedRoute Cmp={EditService} /></Route>
                  <Route exact path="/dashboard/wallet"><ExpertsProtectedRoute Cmp={Mytransaction} /></Route>
                  <Route exact path="/dashboard/service/create/timeslots/:id"><ExpertsProtectedRoute Cmp={Maintimeform} /></Route>
                  <Route exact path="/dashboard/service/form"><ExpertsProtectedRoute Cmp={Mainserviceform} /></Route>
                  <Route exact path="/dashboard/top-searches"><ExpertsProtectedRoute Cmp={TrandingSearches} /></Route>
                  <Route exact path="/account/my/update" component={Update}></Route>
                  <Route exact path="/dashboard/add/details"><ExpertsProtectedRoute Cmp={BankDetails} /></Route>




               </AppProvider>
            </Switch>
         </BrowserRouter>


      </>

   );

}

export default App;
