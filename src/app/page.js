import Image from "next/image";
import Sidebar from "root/components/home/sidebar";
import Navbar from "root/components/navbar";
import Hero from "root/components/home/hero";
import Login from "root/components/auth/login";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Login/>
    </div>
  );
}
