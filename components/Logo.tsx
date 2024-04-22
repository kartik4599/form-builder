import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-bold text-3xl bg-gradient-to-r from-indigo-400  to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer">
      <span className="bg-gradient-to-r from-red-400  to-yellow-400 text-transparent bg-clip-text">
        form
      </span>
      ation
    </Link>
  );
};

export default Logo;
