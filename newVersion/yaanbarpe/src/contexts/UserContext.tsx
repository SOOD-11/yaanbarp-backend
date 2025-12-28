import React, { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";

// ok in type script need to destructure properly
// Create the context



type User={

_id: string,
 Fullname: {
    firstname: string;
    lastname: string;
  };
email: string;



}
type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
};

export const UserDataContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

// Provider component
const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // start as null instead of empty object
  const [loading, setLoading] = useState(true); // optional: track loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("user/me", {
          withCredentials: true, // send cookies along with the request
        });

        setUser(response.data.user);
      
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    console.log(user);
  }, []);

  return (
    <UserDataContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContextProvider;

// Custom hook to consume the context easily
export const useUserContext = () => useContext(UserDataContext);