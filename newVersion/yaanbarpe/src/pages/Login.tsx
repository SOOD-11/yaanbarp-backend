import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '@/contexts/UserContext';
import axiosInstance from '@/utils/axiosInstance';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleLoginButton from '@/components/GoogleLoginButton';

const Login: React.FC = () => {
  const {setUser,user} = useUserContext();
  const navigate = useNavigate();
const handleGoogleLoginSuccess = (data: any) => {
  setUser(data);
  navigate("/packages"); // Redirect after successful login
};
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("user/login", {
        email,
        password,
      }, { withCredentials: true });
console.log("resposne from login",response.data.user);
      setUser(response.data.user);
      console.log("Context extracted form the user",user);
      navigate("/packages");
    } catch (error) {
      console.error("Login error:", error);
    }

  
  };

  const handleGoogleSignIn = () => {
    useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // tokenResponse contains access_token
        const { access_token } = tokenResponse;

        // Send token to your backend for verification / login
        const response = await axiosInstance.post(
          "user/google",
          { token: access_token },
          { withCredentials: true }
        );

        console.log("Login success:", response.data);
        navigate("/package"); // redirect after successful login
      } catch (error) {
        console.error("Google login failed:", error);
      }
    },
    onError: () => {
      console.error("Google login failed");
    },
  });
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
          className="p-3 text-base bg-teal-700 text-white rounded hover:bg-teal-800 transition-colors"
        >
          Login
        </button>
      </form>

      <div className="my-6 font-bold text-gray-500">OR</div>

      <GoogleLoginButton onLoginSuccess={handleGoogleLoginSuccess} ></GoogleLoginButton>

      <div className="mt-6 text-gray-700">
        Not registered?{" "}
        <Link to="/register" className="text-teal-700 underline hover:text-teal-900">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default Login;