import "./globals.css";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Home from "./page";
import { connectDB } from "@/lib/db";

connectDB();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="flex"> 
        <Sidebar />
  
        {/* Main Content */}
        <div className="flex flex-col w-full">
          {/* Navbar */}
          <Navbar />

          <div className="h-[calc(100vh-80px)] overflow-y-scroll">
              {children} 
            </div>
        </div>
        </div>
      </body>
    </html>
  );
}
