import useSpotify from "@/hooks/useSpotify";

function Song ({track, order, session}){
    const spotifyApi = useSpotify(session);
    return(
        <div>
            <p>{order+1}</p>
            <img className ="h-10 w-10" src={track.track.album.images[0].url} alt={track.track.name}/>
        </div>
    )
}

export default Song;