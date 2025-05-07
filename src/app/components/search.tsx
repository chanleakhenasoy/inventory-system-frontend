import { Search as SearchIcon } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="relative w-[630px] h-[45px]">
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-4 pr-10 h-full border-none bg-white text-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="absolute right-0 top-0 mt-[10px] mr-3 text-[#2D579A] cursor-pointer">
        <SearchIcon width={20} height={20} />
      </button>
    </div>
  );
}