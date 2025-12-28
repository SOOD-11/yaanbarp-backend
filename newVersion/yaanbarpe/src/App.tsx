
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Packages from "./pages/Packages";
import EnhancedPackages from "./pages/EnhancedPackages";
import Heritage from "./pages/Heritage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
import usePageTracking from "./hooks/usePageTracking";
import ReactGA from "react-ga4";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PaymentPage from "./pages/paymentPage";
import MyBookings from "./pages/MyBookings";
const queryClient = new QueryClient();

const App = () => {
usePageTracking();


  return(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/culturalheritage/:postId" element={<BlogPost />} />
          <Route path="/packages" element={<Packages />} />
<Route path="/payment/:bookingId" element={<PaymentPage></PaymentPage>}></Route>
          <Route path="/culturalheritage" element={<Blog/>} />
            <Route path="/my-bookings" element={<MyBookings/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking/:packageId" element={<Booking />} />
          <Route path= "/login" element={<Login></Login>}></Route>
             <Route path= "/register" element={<Register/>} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>

    </TooltipProvider>
  </QueryClientProvider>
)
};

export default App;
