import React, { useState } from "react";
import UpdateModal from "./UpdateModal";
import { usePostContext } from "../context/postContext";

const AdminController = ({
  post,
  loadingDelete,
  deletePost,
  hidePost,
  loadingHide,
}) => {
  const update = (id) => {};

  const [trigger, setTrigger] = useState(false);

  return (
    <>
      {" "}
      <div className="flex space-x-4" key={post._id}>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4  focus:outline-none focus:shadow-outline"
          onClick={() => {
            {
              update(post._id);
              setTrigger((prevTrigger) => !prevTrigger);
            }
          }}
        >
          Update
        </button>

        <button
          className="  bg-red-500 hover:bg-red-600 text-white py-2 px-4  focus:outline-none focus:shadow-outline"
          onClick={() => deletePost(post._id)}
        >
          {!loadingDelete ? "Delete" : "Loading..."}
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4  focus:outline-none focus:shadow-outline"
          onClick={() => hidePost(post._id)}
        >
          {loadingHide
            ? "Loading..."
            : post.active
            ? "Pause News"
            : "Activate News"}
        </button>

        <UpdateModal trigger={trigger} setTrigger={setTrigger} post={post} />
      </div>
    </>
  );
};

export default AdminController;
