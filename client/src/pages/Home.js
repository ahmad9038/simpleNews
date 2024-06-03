import React, { useEffect } from "react";
import { usePostContext } from "../context/postContext";
import Category from "../components/Category";
import Post from "../components/Post";

const Home = () => {
  const {
    query,
    currentPage,
    getPrevPage,
    getNextPage,
    totalPages,
    posts,
    getData,
    limit,
    selectedCategory,
  } = usePostContext();

  useEffect(() => {
    getData();
  }, [limit, query, currentPage, selectedCategory]);

  return (
    <>
      <div className=" mx-auto mt-8  xl:w-[1200px] lg:w-[1000px] md:w-[800px] sm:w-full">
        <Category />

        {/* News Section */}
        {/* Assume `posts` is an array containing news data */}
        <div className=" mt-7">
          {posts
            .filter((post) => post.active == true)
            .map((post) => (
              <Post key={post.id} post={post} />
            ))}
        </div>

        {/* Pagination */}
        {posts.length > 0 ? (
          <div className="flex items-center justify-between my-20 ">
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
    </>
  );
};

export default Home;
