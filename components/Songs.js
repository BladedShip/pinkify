import { useRecoilValue } from 'recoil';

import { playlistAtom } from '@/atoms/playlistAtom';
import Song from '@/components/Song';

function Songs({session}) {

    const playlist = useRecoilValue(playlistAtom);
  return (
    <div className='px-8 flex flex-col space-y-1 pb-28 text-white overflow-y-scroll h-screen scrollbar-hide'>
      {
            playlist?.tracks?.items?.map((item, index) => (
                <Song key = {item.track.id} track={item} order={index} session={session}/>
            ))
      }
    </div>
  )
}

export default Songs
