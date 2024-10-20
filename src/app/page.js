import Image from "next/image";
import Sidebar from "root/components/home/sidebar";
import Navbar from "root/components/navbar";
import Hero from "root/components/home/hero";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Hero/>
    </div>
  );
}
