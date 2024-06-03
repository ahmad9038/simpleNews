import React, { useState } from "react";
import categories from "../categories";
import { usePostContext } from "../context/postContext";
import { Link } from "react-router-dom";

const Category = () => {
  const {
    setCategory,
    selectedCategory,
    setSearchedText,
    query,
    setCurrentPage,
    admin,
  } = usePostContext();

  console.log(admin);

  const handleInputChange = (e) => {
    setSearchedText(e.target.value);
    setCurrentPage();
  };

  return (
    <div>
      <div className=" bg-black text-white flex justify-between w-full items-center p-4 md:flex-row flex-col">
        <div className=" w-full  items-center justify-center">
          <ul className=" flex gap-2 justify-center md:justify-start items-center flex-wrap">
            <li
              className={`border-transparent border-2 hover:border-white px-1 cursor-pointer ${
                selectedCategory === "All" ? "border-white" : ""
              }`}
              onClick={() => {
                setCategory("All");
              }}
            >
              All
            </li>
            {categories.map((category, index) => (
              <li
                key={index}
                className={`border-transparent border-2 hover:border-white px-1 cursor-pointer ${
                  category === selectedCategory ? "border-white" : ""
                }`}
                onClick={() => {
                  setCategory(category);
                }}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:mt-0 mt-2">
          <input
            className="w-[200px] p-2 text-black rounded-none"
            type="text"
            placeholder="Search..."
            name="search"
            value={query}
            onChange={handleInputChange}
          />
        </div>
        <Link
          to="/admin"
          className=" cursor-pointer bg-white inline-block text-black px-3 py-2 font-bold ml-2 "
        >
          Admin
        </Link>
      </div>
    </div>
  );
};

export default Category;
