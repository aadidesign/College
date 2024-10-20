import Image from "next/image";
import Sidebar from "root/components/home/sidebar";
import Navbar from "root/components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
    </div>
  );
}
