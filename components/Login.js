"use client";

import React from "react";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="flex justify-evenly items-center min-h-screen space-x-12">
      <div className="flex items-center justify-center flex-col space-y-12">
        <h1 className="text-[#FCFCFC]">Login to Pinkify</h1>
        <button
          className="group border-gray-500 border rounded-xl hover:scale-105 transition-all duration-200 hover:border-[#dbbadd] cursor-pointer flex items-center justify-center"
          onClick={() => signIn("spotify", { callbackUrl: "/" })}
        >
          <img src="/assets/icon.png" className="w-12 m-5" alt="logo" />
          <div className="text-gray-500 m-5 ml-0 group-hover:text-[#FCFCFC] transition-all duration-200">
            Login with Spotify
          </div>
        </button>
      </div>
      <div className="w-[0.1px] h-40 bg-gray-700" />
      <div className="text-white max-w-xs">
        <h1 className="text-3xl font-bold text pb-4 text-center">
          Welcome to <span className="text-[#dbbadd]">Pinkify</span>
        </h1>
        <p className="text-gray-500 text-sm">
          A really bad spotify client that just acts like a remote to your
          existing spotify player.
        </p>
        <br />
        <h2 className="font-bold pb-1">So what exactly can it do?</h2>
        <ul className="list-disc">
          <li className="text-sm text-gray-500">
            Basic Controls - Play, Pause, Skip, Volume Control
          </li>
          <li className="text-sm text-gray-500">
            Playlists - View 20 of your top playlists and play from them
          </li>
          <li className="text-sm text-gray-500">
            Nothing else, really... You see your plalists, you play from it.
            Done
          </li>
        </ul>
      </div>
      <div className="text-white absolute bottom-0 flex justify-center items-center text-sm cursor-default">
        <p className="pb-1 text-gray-500">
          Contact{" "}
          <a
            className="text-[#dbbadd] underline cursor-pointer hover:text-white transition duration-150 ease-out"
            href="https://adithyan.tech/#contact"
            target="_blank"
            rel="noreferrer"
          >
            Adithyan Jayakumar
          </a>{" "}
          for access as this app runs on the dev version of the Spotify API
        </p>
      </div>
    </div>
  );
}

export default Login;
