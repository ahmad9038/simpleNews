import React, { useEffect, useState } from "react";
import { usePostContext } from "../context/postContext";
import Post from "../components/Post";
import Login from "../components/Login";
import CreateNews from "../components/CreateNews";
import categories from "../categories";
import Category from "../components/Category";

const Admin = () => {
  const {
    getPosts,
    setSearchedText,
    query,
    currentPage,
    getPrevPage,
    getNextPage,
    totalPages,
    posts,
    admin,
    getData,
    setLimit,
    limit,
    selectedCategory,
  } = usePostContext();

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setLimit(selectedValue);
  };

  const handleInputChange = (e) => {
    setSearchedText(e.target.value);
  };

  useEffect(() => {
    getData();
  }, [limit, query, currentPage, selectedCategory]);

  const [trigger, setTrigger] = useState(false);

  return (
    <>
      {!admin.token ? (
        <Login />
      ) : (
        <div className="container mx-auto mt-8  w-[1200px]">
          <Category />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 mt-5 ml-auto">
              <button
                className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 "
                onClick={() => setTrigger((prevTrigger) => !prevTrigger)}
              >
                Create News
              </button>
              <label
                htmlFor="options"
                className="text-sm font-medium text-gray-600"
              >
                Show:
              </label>
              <select
                value={limit}
                onChange={handleSelectChange}
                className="p-2 border border-gray-300  focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="20">20</option>
                <option value="10">10</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          {/* News Section */}
          {/* Assume `posts` is an array containing news data */}
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}

          {/* Pagination */}
          {posts.length > 0 ? (
            <div className="flex items-center justify-between my-20">
              <button
                onClick={() => {
                  getPrevPage();
                }}
                disabled={currentPage === 1}
                className={`px-4 py-2 ${
                  currentPage === 1
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-black text-white"
                }`}
              >
                Prev Page
              </button>
              <p className="text-sm text-gray-500">{`${currentPage} of ${totalPages}`}</p>
              <button
                onClick={() => {
                  getNextPage();
                }}
                disabled={currentPage === totalPages}
                className={`px-4 py-2  ${
                  currentPage === totalPages
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-black text-white"
                }`}
              >
                Next Page
              </button>
            </div>
          ) : (
            <div className=" flex items-center justify-center text-center">
              No News Found
            </div>
          )}
        </div>
      )}

      <CreateNews trigger={trigger} setTrigger={setTrigger} />
    </>
  );
};

export default Admin;
