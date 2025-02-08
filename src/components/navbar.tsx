
"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const params = new URLSearchParams(searchParams);
    
    if (query) {
      params.set("search", query); // ✅ Set query param
    } else {
      params.delete("search"); // ✅ Remove query param if empty
    }

    router.push(`/?${params.toString()}`, { scroll: false }); // ✅ Update URL without reload
  };

  return (
    <nav className="bg-white rounded-md mx-0 mr-5 m-4 shadow-md p-4 flex justify-between items-center z-40">
      <div className="relative w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          name="search-bar"
          placeholder="Search"
          onChange={handleChange}
          className="border rounded-full pl-10 p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-600"
        />
      </div>
    </nav>
  );
};

export default Navbar;
