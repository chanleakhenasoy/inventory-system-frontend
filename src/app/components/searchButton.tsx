"use client";

import React from "react";

type SearchButtonProps = {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
};

const SearchButton: React.FC<SearchButtonProps> = ({
  onClick,
  label = "Search",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-[#2D579A] hover:bg-[#1e3e73] text-white font-semibold py-2 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
};

export default SearchButton;
