import axiosInstance from '@/utils/axiosInstance';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import React from 'react';

interface GoogleLoginButtonProps {
  onLoginSuccess: (data: any) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onLoginSuccess }) => {

  const handleSuccess = async (response: CredentialResponse) => {
    try {
      const idToken = response.credential;

      if (!idToken) {
        throw new Error("Google ID token missing");
      }

      const res = await axiosInstance.post(
        "user/google",
        { idToken },
        { withCredentials: true }
      );

      console.log("Google login success", res.data);
      onLoginSuccess(res.data);
    } catch (error) {
      console.error("Google login error", error);
    }
  };

  const handleError = () => {
    console.error("Google login failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap={false} // optional: disable One Tap
    />
  );
};

export default GoogleLoginButton;