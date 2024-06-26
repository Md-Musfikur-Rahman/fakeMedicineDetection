"use client";
import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link href="/">FMD</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/">
            <span className="text-white hover:bg-blue-700 px-3 py-2 rounded">
              Home
            </span>
          </Link>
          <Link href="/addMedicine">
            <span className="text-white hover:bg-blue-700 px-3 py-2 rounded">
              Add Medicine
            </span>
          </Link>
          <Link href="/receivedMedicine">
            <span className="text-white hover:bg-blue-700 px-3 py-2 rounded">
              Received Medicine
            </span>
          </Link>
          <Link href="/searchMedicine">
            <span className="text-white hover:bg-blue-700 px-3 py-2 rounded">
              Search Medicine
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
