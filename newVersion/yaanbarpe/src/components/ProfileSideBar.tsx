import { motion } from "framer-motion";

import { X, LogOut, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { useUserContext } from "@/contexts/UserContext";
import { useEffect } from "react";

type ProfileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProfileSidebar = ({ isOpen, onClose }: ProfileSidebarProps) => {
  const { user, setUser } = useUserContext();
 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("user/logout", {}, { withCredentials: true });
      setUser(null);
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }



    // handle getallbookings response here

};
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40"
        ></div>
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 p-6 flex flex-col"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        {/* Profile Content */}
        <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
        {user ? (
          <div className="flex-1 space-y-4">
            <div className="text-center mb-6">
  <h2 className="text-2xl font-bold text-tulu-blue">
    Welcome, {user?.Fullname?.firstname} {user?.Fullname?.lastname} 👋
  </h2>
  <p className="text-gray-500 mt-1">
    Glad to have you back on your travel journey!
  </p>
</div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>

            {/* Buttons */}
            <div className="mt-8 space-y-4">
              <button
                onClick={() => {
                  navigate("/my-bookings");
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 bg-tulu-blue text-white py-2 px-4 rounded-lg hover:bg-tulu-blue/90 transition"
              >
                <CalendarCheck size={18} />
                My Bookings
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Not logged in</p>
        )}
      </motion.div>
    </>
  );
};

export default ProfileSidebar;