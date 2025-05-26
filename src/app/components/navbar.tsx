import Image from "next/image"
import { Search, Bell, LogOut } from "lucide-react"
import logo from "../images/logo.png"
import { useRouter } from "next/navigation";

export default function Navbar() {
  const route = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    route.push("/"); 
  };
  return (
    // <header className="bg-white shadow-sm z-10 flex items-center justify-between">
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 flex items-center justify-between">
      <div className="p-4 ml-8">
          <Image
            src={logo}
            alt="PSE Pour Un Sourire D'Enfant"
            width={220}
            height={100}
          />
      </div>
      <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <button
          onClick={handleLogout}
          className="p-2 text-red-600 hover:text-[#6499EF] cursor-pointer"
          aria-label="Logout"
        >
          <LogOut size={26} />
        </button>
      </div>
    </div>
    </header>
  )
}
