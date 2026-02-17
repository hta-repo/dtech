import React from 'react'
import { AllRoutes } from './Routes'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SnackbarProvider } from 'notistack';
import { FirebaseTokenProvider } from './Routes';

export default function App() {

  return (
    <GoogleOAuthProvider clientId="531718115606-v6d2q4s93f6bcc32ep25bvnga9jkoi53.apps.googleusercontent.com">
      <SnackbarProvider>
        <FirebaseTokenProvider>
          <AllRoutes />
        </FirebaseTokenProvider>
      </SnackbarProvider>
    </GoogleOAuthProvider>
  )
}