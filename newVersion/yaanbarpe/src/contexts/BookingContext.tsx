import { createContext, useState, ReactNode, useContext } from "react";
import { useUserContext } from "./UserContext";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
// shape of traveller
export type traveller = {

    name: string,
    age: Number
    gender: string

};
// shape of packages 
export type Package = {
    _id: string,
    title: string,
    duration: {

        days: Number;
        nights: Number;
    }
    price: number;
}
// shape of booking 
export type Booking = {
    _id: string;
    user: string;
    package: Package;
    travelers: any;
    travelDate: Date;
    specialRequests: string;
    priceAtBooking: Number;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    payment: {

    }
};
// shapeof bookingcontext 


type BookingContextType = {
    bookings: Booking | null;

    loading: boolean;
    error: string | null;
    selectedPackage: Package | null;
    setSelectedPackage: React.Dispatch<React.SetStateAction<Package | null>>;
    createBooking: (bookingData: {

        packageId: string;
        travellers: traveller[];
        totalPrice: number,
        travelDate: Date,
        specialRequests: string



    }) => Promise<void>;
    refreshBookings: () => Promise<void>;
    updateBookingStatus: (bookingId: string, status: Booking["status"]) => Promise<void>


};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

type BookingProviderProps = {
    children: ReactNode;
};


const BookingProvider = ({ children }: BookingProviderProps) => {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<Booking | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);


    const createBooking = async (bookingData: {
        packageId: string;
        travellers: traveller[];
        totalPrice: number;
        travelDate: Date;
        specialRequests: string;
    }) => {
        setLoading(true);
        // TODO: Implement booking creation logic
try {
    
            const res = await axiosInstance.post<{ booking: Booking }>("booking/create-booking", bookingData);
            const bookingdone = res.data.booking;
            setBookings(bookingdone);
    
            localStorage.setItem("pendingBookingId", bookingdone._id);
            const bookingId = localStorage.getItem("pendingBookingId");
            console.log(bookingId);
                    navigate(`/payment/${bookingId}`);
            setLoading(false);
} catch (error) {

    console.log(error);
    
}
    };

    const refreshBookings = async () => {
        // TODO: Implement refresh logic
    };

    const updateBookingStatus = async (
        bookingId: string,
        status: Booking["status"]
    ) => {
        // TODO: Implement update logic
    };

    return (
        <BookingContext.Provider
            value={{
                bookings,
                loading,
                error,
                selectedPackage,
                setSelectedPackage,
                createBooking,
                refreshBookings,
                updateBookingStatus,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export { BookingContext, BookingProvider };
//using the context as hook 
export const useBookingContext = () => useContext(BookingContext);