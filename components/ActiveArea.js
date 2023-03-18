"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { signOut } from "next-auth/react";

import { activePlaylistState, playlistAtom } from "@/atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";
import Songs from "./Songs";

const colors = [
  "from-[#dbbadd]",
  "from-indigo-500",
  "from-pink-500",
  "from-purple-500",
  "from-yellow-500",
  "from-green-500",
  "from-red-500",
  "from-blue-500",
];

function ActiveArea({ session }) {
  const activePlaylist = useRecoilValue(activePlaylistState);
  const [playlist, setPlaylist] = useRecoilState(playlistAtom);
  const spotifyApi = useSpotify({ session });

  const [color, setColor] = useState(null);
  useEffect(() => {
    setColor(shuffle(colors)[0]);
  }, [activePlaylist]);

  useEffect(() => {
    spotifyApi.getPlaylist(activePlaylist).then((data) => {
        setPlaylist(data.body);
    }).catch((err) => {
        console.log(err);
    });
  }, [spotifyApi, activePlaylist]);



  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 transition-all cursor-pointer rounded-full p-1 pr-2 text-white" onClick={()=>signOut()}>
          <img
            src={session.user?.image}
            alt={session.user?.name}
            className="rounded-full w-10 h-10"
          />
          <h2>{session.user?.name}</h2>
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-4" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black h-80 ${color} text-white p-8`}
      >
        <img
            src={playlist?.images[0]?.url}
            alt={playlist?.name}
            className = "w-48 h-48 shadow-2xl"
        />
        <div>
            <p>Playlist</p>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
        </div>
      </section>
      <div>
        <Songs session={session}/>
      </div>
    </div>
  );
}

export default ActiveArea;
