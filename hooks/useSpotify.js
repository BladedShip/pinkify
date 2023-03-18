import React,{useEffect} from "react";
import { signIn } from "next-auth/react";
import spotifyApi from "@/lib/spotify";


function useSpotify({session}) {
    useEffect(() => {
      if(session){
        if(session.error === 'RefreshAccessTokenError'){
            signIn();
        }
        spotifyApi.setAccessToken(session.user.accessToken);
      }
    }, [session]);
  return spotifyApi;
}

export default useSpotify
