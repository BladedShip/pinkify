"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  ArrowsRightLeftIcon,
  BackwardIcon,
  HeartIcon,
  SpeakerWaveIcon as DecreaseVolume,
  ArrowPathRoundedSquareIcon,
  ForwardIcon,
} from "@heroicons/react/24/outline";
import {
  SpeakerWaveIcon as IncreaseVolume,
  PlayCircleIcon,
  PauseCircleIcon,
} from "@heroicons/react/24/solid";
import { debounce } from "lodash";

import useSpotify from "@/hooks/useSpotify";
import { currentTrackId, isTrackPlaying } from "@/atoms/songAtom";
import useSongInfo from "@/hooks/useSongInfo";

function Player({ session }) {
  const spotifyApi = useSpotify({ session });
  const songInfo = useSongInfo({ session });

  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackId);
  const [isPlaying, setIsPlaying] = useRecoilState(isTrackPlaying);

  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [volume, setVolume] = useState(50);
  const [shuffle, setShuffle] = useState(false);
  const [loop, setLoop] = useState("off");
  const fetchSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((res) => {
        setCurrentTrack(res.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((res) => {
          setVolume(res.body?.device?.volume_percent);
          setLoop(res.body?.repeat_state);
          setShuffle(res.body?.shuffle_state);
          setIsPlaying(res.body?.is_playing);
        });
      });
    }
  };

  const handlePlay = () => {
    spotifyApi.getMyCurrentPlaybackState().then((res) => {
      if (res.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const debouncedSetVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume);
    }, 500),
    []
  );

  const handleShuffle = () => {
    spotifyApi.getMyCurrentPlaybackState().then((res) => {
      if (res.body.shuffle_state) {
        setShuffle(!res.body.shuffle_state);
        spotifyApi.setShuffle("false");
      } else {
        setShuffle(!res.body.shuffle_state);
        spotifyApi.setShuffle("true");
      }
    });
  };

  const handleLoop = () => {
    spotifyApi.getMyCurrentPlaybackState().then((res) => {
      if (res.body.repeat_state === "off") {
        setLoop("context");
        spotifyApi.setRepeat("context");
      } else if (res.body.repeat_state === "context") {
        setLoop("track");
        spotifyApi.setRepeat("track");
      } else if (res.body.repeat_state === "track") {
        setLoop("off");
        spotifyApi.setRepeat("off");
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrack) {
      fetchSong();
      setVolume(50);
    }
  }, [currentTrack, spotifyApi, session, ]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedSetVolume(volume);
    }
  }, [volume]);

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img
          src={songInfo?.album.images[0]?.url}
          alt={songInfo?.album.name}
          className="hidden md:inline h-12 w-12"
        />
        <div className="flex items-center space-x-4">
          <div>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists[0].name}</p>
          </div>
          <div>
            <HeartIcon
              className={`button ${liked ? "text-green-500" : "text-white"}`}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
          <ArrowsRightLeftIcon
            className={`button ${shuffle ? "text-green-500" : "text-white"}`}
            onClick={handleShuffle}
          />
          <BackwardIcon
            className="button"
            onClick={() => spotifyApi.skipToPrevious()}
          />
          {isPlaying ? (
            <PauseCircleIcon
              className="button w-12 h-12"
              onClick={handlePlay}
            />
          ) : (
            <PlayCircleIcon className="button w-12 h-12" onClick={handlePlay} />
          )}
          <ForwardIcon
            className="button"
            onClick={() => spotifyApi.skipToNext()}
          />
          <ArrowPathRoundedSquareIcon
            className={`button ${
              loop === "off"
                ? "text-white"
                : loop === "track"
                ? "text-red-500"
                : "text-green-500"
            }`}
            onClick={handleLoop}
          />
      </div>

      <div className="flex items-center space-x-3 md:space-x-4 justify-end">
        <DecreaseVolume
          className="button"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          type="range"
          className="w-14 md:w-28"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <IncreaseVolume
          className="button"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  );
}

export default Player;
