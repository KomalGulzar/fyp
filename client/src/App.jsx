import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Main Headers
import Header from './components/Header';
import HeaderMinimal from './components/HeaderMinimal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import EmailPage from './pages/EmailPage';
import SearchResults from './pages/SearchResults';
import CategoryPage from './pages/CategoryPage';
import ViewProductAdmin from './pages/ViewProductAdmin';
import ContactPage from './components/Contact';
import Inquiry from './pages/adminInqueries';
import BuyerCard from './components/BuyerCard';
import Buyer from './components/BuyerInquiery';
import ViewBuyers from './pages/admin/ViewBuyers';
import ViewSuppliers from './pages/admin/ViewSuppliers';
import ViewCategory from './pages/admin/ViewCategory';
import CreateCategory from './pages/admin/CreateCategory';
import CreateUser from './pages/admin/CreateUser';
import Footer from './components/footer';
// Components
import PrivateRoute from './components/PrivateRoute';
import UserListings from './components/UserListings';
import ContactForm from './pages/ContactForm';
import AdminMessages from './pages/admin/AdminMessages';

const AppLayout = () => {
  const location = useLocation();

  // Show minimal header on these routes
  const showMinimalHeader =
    location.pathname.startsWith('/profile') || location.pathname.startsWith('/admin');

  return (
    <>
      {showMinimalHeader ? <HeaderMinimal /> : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/contact-seller" element={<EmailPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* General Pages */}
        <Route path="/profile/create-listing" element={<CreateListing />} />
        <Route path="/profile/update-listing/:listingId" element={<UpdateListing />} />
        <Route path="/userlistings" element={<UserListings />} />
        <Route path="/profile/view-product" element={<ViewProductAdmin />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/contact/:listingId" element={<ContactPage  />} />
        <Route path="/contact-us" element={<ContactForm/>} />
        <Route path="profile/view-inquery" element={<Inquiry />} />
        <Route path="profile/cart" element={<BuyerCard />} />
        <Route path="/buyer-reply" element={<Buyer />} />

        {/* Admin Pages */}
        <Route path="/admin/view-buyers" element={<ViewBuyers />} />
        <Route path="/admin/view-supplier" element={<ViewSuppliers />} />
        <Route path="/admin/view-category" element={<ViewCategory />} />
        <Route path="/admin/create-user" element={<CreateUser />} />
        <Route path="/admin/create-category" element={<CreateCategory />} />
        <Route path="/admin/contacts" element={<AdminMessages />} />
      </Routes>
       <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
