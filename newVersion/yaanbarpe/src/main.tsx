
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ReactGA from 'react-ga4';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { inject } from '@vercel/analytics';
import { Import } from 'lucide-react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserContextProvider, { UserDataContext } from './contexts/UserContext.tsx';
import { BookingProvider } from './contexts/BookingContext.tsx';





inject();// for vercel analytics


const CLIENT_ID ="80268697308-bht423ke0t3odk7ija31krkg6s6nu6k0.apps.googleusercontent.com"                       
ReactGA.initialize('G-5T4QNS4SXJ'); // to track page views from google analytics using google measurement Id
ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <BrowserRouter>
<UserContextProvider>
  <BookingProvider>


    <App />

  </BookingProvider>
  </UserContextProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
</HelmetProvider>

  </React.StrictMode>
);
