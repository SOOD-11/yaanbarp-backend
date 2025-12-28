import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/utils/axiosInstance';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");

    try {
      const response = await axiosInstance.post(
        "user/register", // Make sure the leading slash is present
        {
          Fullname: { firstname, lastname }, // Or separate fields if backend expects it
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log("Registered successfully:", response.data);
      navigate("/login"); // Redirect after successful registration
    } catch (error: any) {
      // Capture backend error or network error
      if (error?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message || "Something went wrong");
      }
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 text-center font-sans">
      <img
        src="/logos/Screenshot_2025-05-30_at_6.22.00_PM-removebg-preview-2.png"
        alt="YaanBarpe Logo"
        className="w-36 mx-auto mb-6"
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="p-3 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="p-3 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`p-3 text-base text-white rounded transition-colors ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-700 hover:bg-teal-800"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {errorMessage && (
        <div className="mt-4 text-red-600 font-medium">{errorMessage}</div>
      )}

      <div className="mt-6 text-gray-600">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-teal-700 hover:underline"
        >
          Login here
        </button>
      </div>
    </div>
  );
};

export default Register;