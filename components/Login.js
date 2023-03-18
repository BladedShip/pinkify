'use client';

import React from "react";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col space-y-12">
      <h1 className="text-[#FCFCFC]">Login to Pinkify</h1>
      <button className="group border-gray-500 border rounded-xl hover:scale-105 transition-all duration-200 hover:border-[#dbbadd] cursor-pointer flex items-center justify-center" onClick={()=>signIn('spotify',{callbackUrl:'/'})}>
        <img src="/assets/icon.png" className="w-12 m-5" alt="logo" />
        <div className="text-gray-500 m-5 ml-0 group-hover:text-[#FCFCFC] transition-all duration-200">
          Login with Spotify
        </div>
      </button>
    </div>
  );
}

export default Login;
