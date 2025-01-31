import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import B2CHomepage from './MainComponent/B2CHomepage';
import TestRideBooking from './TestRideComponent/TestRideBooking';
import ServiceBooking from './ServiceBookingComponent/ServiceBooking';
import './styles/App.css'; // Custom styles
import HomepageComponents from './project-home-page/components/HomepageComponents';
import Login from './project-home-page/B2Bloginpage/Login';
import Home from './project-home-page/B2Bpages/Home';
import DealerBookingForm from './project-home-page/B2Bpages/DealerBookingForm';
import OrderList from './project-home-page/B2Bpages/OrderList';
import Navbar from './project-home-page/B2Bpages/Navbar';
import DealerDropdownWithTestRide from './project-home-page/B2Bpages/DealerDropdownWithTestRide';

function App() {



  return (
    <div className="App">
      <Routes>
        {/* First page */}
        <Route element={<HomepageComponents />} path="/"></Route>
        {/* b2b card navigation */}
        <Route element={<Login />} path="/login"></Route>
        {/* dealer login page  */}
        <Route path="/home" element={<Home />} />

        {/* Optionally, define a default route to redirect */}
        <Route path="*" element={<Login />} /> {/* Redirect unknown paths to login */}

        {/* admin login page */}
       
         
        <Route path="/adminpage" element={<DealerBookingForm />}></Route>
        <Route path="/orderlist/:dealerId" element={<OrderList />} />
        <Route path="/viewbookings" element={<DealerDropdownWithTestRide/>}></Route>
        {/* b2c navigation */}
        <Route element={<B2CHomepage />} path="/tvs-dealer-locator"></Route>
        {/* test ride booking*/}
        <Route element={<TestRideBooking />} path="/book-testride/:dealerId/:dealerName" />
        {/* service booking */}
        <Route element={<ServiceBooking />} path="/book-service/:dealerId/:dealerName" />
      </Routes>

    </div>

  );
}

export default App;
