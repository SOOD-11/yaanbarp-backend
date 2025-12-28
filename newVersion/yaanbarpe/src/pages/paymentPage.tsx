import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import LoadingLogo from "@/components/LoadingLogo";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const MIN_LOADING_TIME = 1000; // milliseconds

const loadRazorpay = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const PaymentPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const fetchBooking = async () => {
      setLoading(true);
      const start = Date.now();
      try {
        if (bookingId) {
          const res = await axiosInstance.get(`booking/${bookingId}`);
          setBooking(res.data.booking);
        } else {
          setError("No bookingId provided in route.");
        }
      } catch (err: any) {
        setError("Failed to load booking.");
        console.error(err);
      } finally {
        const elapsed = Date.now() - start;
        const remaining = MIN_LOADING_TIME - elapsed;
        timeoutId = setTimeout(() => setLoading(false), remaining > 0 ? remaining : 0);
      }
    };
    fetchBooking();
    return () => clearTimeout(timeoutId);
  }, [bookingId]);

  const handlePayment = async () => {
    const resScript = await loadRazorpay();
    if (!resScript) return alert("Razorpay SDK failed to load");

    const { data } = await axiosInstance.post("payment/create-order", { bookingId });
    console.log("data from order api", data);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_TEST_KEY,
      amount: data.amount,
      currency: data.currency,
      name: booking.title,
      description: "Booking Payment",
      order_id: data.orderId,
      handler: async (response: any) => {
        await axiosInstance.post("payment/verify-payment", {
          bookingId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        });

        navigate(`/booking/confirmation/${bookingId}`);
      },
      prefill: {
        name: booking.name,
        email: booking.email,
        contact: booking.phone,
      },
      theme: { color: "#0b69ff" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  

  if (loading) return <LoadingLogo />;
  if (error) return <div>{error}</div>;
  if (!booking) return <div>Loading booking...</div>;

   // Example levels, replace with actual data

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">Pay for your booking</h2>
      <p>Amount: ₹{booking.priceAtBooking}</p>
      
      <button onClick={handlePayment} className="px-6 py-3 bg-blue-600 text-white rounded">
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;