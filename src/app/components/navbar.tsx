import Image from "next/image"
import { Search, Bell } from "lucide-react"
import logo from "../images/logo.png";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="bg-white shadow-sm z-10 flex items-center justify-between">
        <div className="p-4">
      <Link href="/">
        <Image
          src={logo}
          alt="PSE Pour Un Sourire D'Enfant"
          width={220}
          height={100}
          className="cursor-pointer"
        />
      </Link>
    </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-blue-600">
                <Bell size={32} />
              </button>
            </div>
          </div>
        </header>
    )
  };