import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useUserContext } from "@/contexts/UserContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import LoadingLogo from "@/components/LoadingLogo";

const MIN_LOADING_TIME = 1200; // milliseconds

const MyBookings = () => {
  const { user } = useUserContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const fetchBookings = async () => {
      const start = Date.now();
      try {
        const response = await axiosInstance.get("booking/my-bookings");
        const fetchedBookings = response.data.bookings || [];
        setBookings(fetchedBookings);
        console.log("the bookings of the user are ", fetchedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      } finally {
        const elapsed = Date.now() - start;
        const remaining = MIN_LOADING_TIME - elapsed;
        timeoutId = setTimeout(() => setLoading(false), remaining > 0 ? remaining : 0);
      }
    };

    fetchBookings();
    return () => clearTimeout(timeoutId);
  }, [user]);

  if (loading)
    return (
      <LoadingLogo />
    );

  return (
    <div>
      <Navigation />
      <div className="max-w-2xl mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

        {bookings.length === 0 ? (
          <div className="text-center p-8 border rounded shadow bg-gray-50">
            <p className="text-lg mb-4">
              You have no bookings yet.
            </p>
            <p className="mb-6">
              Go explore our packages and book your next adventure!
            </p>
            <Link
              to="/packages"
              className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
              Browse Packages
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li key={booking._id} className="border p-4 rounded shadow">
                <div>
                  <strong>Package:</strong> {booking.package?.title}
                </div>
                <div>
                  <strong>Duration:</strong> {booking.package?.duration?.days} days
                </div>
                <div>
                  <strong>Price:</strong> ₹{booking.priceAtBooking}
                </div>
                <div>
                  <strong>Status:</strong> {booking.status}
                </div>
                <div>
                  <strong>Travel Date:</strong> {booking.travelDate?.slice(0, 10)}
                </div>
                <div>
                  <strong>Travellers:</strong>
                  <ul>
                    {booking.travellers?.map((t, idx) => (
                      <li key={idx}>
                        {t.name} ({t.age}, {t.gender})
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;