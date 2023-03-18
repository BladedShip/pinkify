import { Poppins } from "next/font/google";
import { getSession } from "next-auth/react";

import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const session = getSession();

export const metadata = {
  title: "Pinkify - Spotify Web Client",
  description: "It's spotify but pink and worse",
  icons: {
    icon: "/assets/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={poppins.className}>
          <div className="bg-black h-screen overflow-hidden">{children}</div>
        </body>
    </html>
  );
}
