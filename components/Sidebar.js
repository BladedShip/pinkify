"use client";

import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  BuildingLibraryIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";

import useSpotify from "@/hooks/useSpotify";
import { activePlaylistState } from "@/atoms/playlistAtom";
import { signOut } from "next-auth/react";

function Sidebar({ session }) {
  const spotifyApi = useSpotify({ session });
  const [playlists, setPlaylists] = useState([]);
  const [activePlaylist, setActivePlaylist] = useRecoilState(activePlaylistState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500 p-5 text-xs border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white transition-all duration-100">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white transition-all duration-100">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white transition-all duration-100">
          <BuildingLibraryIcon className="h-5 w-5" />
          <p>Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white transition-all duration-100">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white transition-all duration-100">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white transition-all duration-100">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists */}
        {playlists.map((playlist) => (
          <p
            className="cursor-pointer hover:text-white transition-all duration-100"
            key={playlist.id}
            onClick={() => setActivePlaylist(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
