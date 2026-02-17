import React from 'react'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


export default function GoogleButton() {
    const navigate = useNavigate(); // Initialize useNavigate

  return (
    <>
     <GoogleOAuthProvider clientId="471620209915-b4gb4s036opad1omdj05ke8uogkth4ft.apps.googleusercontent.com">
        <div className="w-[19rem] mx-auto">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              var decoded = jwt_decode(credentialResponse.credential);
              console.log(decoded);
              navigate("/");

            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          ;
        </div>
      </GoogleOAuthProvider>
    </>
  )
}
