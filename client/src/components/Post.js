import React, { useEffect, useState } from "react";
import moment from "moment";
import { usePostContext } from "../context/postContext";
import AdminController from "./AdminController";
import DynamicSnackBar from "./DynamicSnackBar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/helper";

const Post = ({ post }) => {
  const { admin, getData } = usePostContext();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/news/${id}`);
  };

  // const date = moment(post.createdAt).format("MMMM Do YYYY, h:mm a");
  const date = moment(post.createdAt);
  const relativeTime = date.fromNow();

  // delete post ***************************
  const [openSnackbar, setOpenScnakbar] = React.useState(false);
  const [message, setMessage] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const deletePost = async (id) => {
    setLoadingDelete(true);
    const URL = `${BASE_URL}/api/deleteNews`;
    try {
      const res = await fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id: id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(data.success);
        setOpenScnakbar(true);
        getData();
      } else {
        const errorMessage = await res.json();
      }

      setLoadingDelete(false);
    } catch (error) {
      setLoadingDelete(false);
    }
  };

  // hide post **************************************
  const [loadingHide, setLoadingHide] = useState(false);
  const hidePost = async (id) => {
    setLoadingHide(true);
    const URL = `${BASE_URL}/api/activeNews`;
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id: id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(data.success);
        setOpenScnakbar(true);

        getData();
      } else {
        const errorMessage = await res.json();
      }

      setLoadingHide(false);
    } catch (error) {
      setLoadingHide(false);
    }
  };

  return (
    <>
      <div
        key={post._id}
        className="flex border-[2px] border-gray-400  overflow-hidden p-2 mb-5"
      >
        <div className="flex h-full w-full items-center justify-center sm:flex-row flex-col">
          <div className=" h-full  relative sm:w-1/2 w-full">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[300px] object-cover "
            />
            {post.active && admin?.token ? (
              <p className="absolute z-20 top-3 text-white left-3 bg-red-500 p-1">
                Live
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="sm:w-1/2 w-full sm:px-5 px-2 py-5 h-full flex flex-col justify-between ">
            <div>
              <p className="sm:text-2xl text-xl text-gray-900 font-bold pb-1  line-clamp-2">
                {post.title}
              </p>
              <div className=" flex  items-center ">
                <p className="text-gray-500">{post.category}</p>
                <p className="text-gray-500  pl-2">
                  <AccessTimeIcon />
                  {relativeTime}
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-base  line-clamp-3  mt-8">
              {post.content}
            </p>

            <div className="flex items-center ">
              {/* New container for the button */}
              <button
                onClick={() => handleClick(post._id)}
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4  mt-3"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
      {admin?.token ? (
        <div className=" mb-5 mt-2">
          <AdminController
            post={post}
            loadingDelete={loadingDelete}
            deletePost={deletePost}
            hidePost={hidePost}
            loadingHide={loadingHide}
          />
        </div>
      ) : (
        <></>
      )}
      <DynamicSnackBar
        openSnackbar={openSnackbar}
        setOpenScnakbar={setOpenScnakbar}
        message={message}
      />
    </>
  );
};

export default Post;
