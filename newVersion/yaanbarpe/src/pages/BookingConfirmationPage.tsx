import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/utils/axiosInstance";

const BookingConfirmationPage = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const res = await axios.get(`/booking/${bookingId}`);
      setBooking(res.data.booking);
    };
    fetchBooking();
  }, [bookingId]);

  if (!booking) return <div>Loading booking...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">Booking {booking.status}</h2>
      <p>Booking ID: {booking._id}</p>
      <p>Total Paid: ₹{booking.payment?.amount}</p>
      <p>Payment ID: {booking.payment?.razorpayPaymentId}</p>
      <p>Travellers: {booking.travellers?.map((t: any) => t.name).join(", ")}</p>
    </div>
  );
}

export default BookingConfirmationPage;