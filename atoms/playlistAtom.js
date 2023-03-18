import { atom } from "recoil";

export const activePlaylistState = atom({
    key: "activePlaylist",
    default:'37i9dQZF1DWTAtTdFMiJYK',
})

export const playlistAtom = atom({
    key: "playlist",
    default: null,
})