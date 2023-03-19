import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import useSpotify from "./useSpotify";
import { currentTrackId } from "@/atoms/songAtom";

function useSongInfo({ session }) {
  const spotifyApi = useSpotify({ session });
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackId);
  const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const fetchSongInfo = async () => {
            if(currentTrack){
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrack}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        }
                    }
                ).then(res=>res.json());
                setSongInfo(trackInfo);
            }
        };
        fetchSongInfo();
    },[currentTrack]);

  return songInfo;
}

export default useSongInfo;
