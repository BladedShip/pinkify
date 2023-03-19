import React from "react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "@/components/SessionProvider";
import Login from "@/components/Login";
import ActiveArea from "@/components/ActiveArea";
import RecoilProvider from "@/components/RecoilProvider";
import Player from "@/components/Player";

async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <SessionProvider session={session}>
      {!session ? (
        <Login />
      ) : (
        <RecoilProvider>
          <div className="flex">
            <Sidebar session={session} />
            <ActiveArea session={session} />
          </div>
          <div className="sticky bottom-0">
            <Player session={session}/>
          </div>
        </RecoilProvider>
      )}
    </SessionProvider>
  );
}

export default Home;