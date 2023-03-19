import { atom } from "recoil";

export const currentTrackId = atom({
    key: "currentTrackId",
    default: null,
})

export const isTrackPlaying = atom({
    key: "isPlaying",
    default: false,
})