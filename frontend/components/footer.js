export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 absolute bottom-0 w-full">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xl font-bold mb-2">Made by:</p>
        <div className="flex flex-wrap justify-center mb-4">
          <p className="text-lg mr-2 mb-1">Alphonsus Aditya</p>
          <p className="text-lg mr-2 mb-1">Anggito Muhammad</p>
          <p className="text-lg mr-2 mb-1">Muhammad Fajrulfalaq</p>
          <p className="text-lg mb-1">Muhammad Muqtada</p>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} WhatToDoToday. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
