import React, { useState } from "react";
import { usePostContext } from "../context/postContext";
import DynamicSnackBar from "./DynamicSnackBar";
import { BASE_URL } from "../services/helper";

const Login = () => {
  const { adminLogin } = usePostContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [openSnackbar, setOpenScnakbar] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const URL = `${BASE_URL}/api/login`;

  const Login = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const newData = { token: data.token, admin: data.admin };
        adminLogin(newData);
      } else {
        const errorMessage = await res.json();

        setMessage(errorMessage.error);
        setOpenScnakbar(true);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center px-4 sm:px-6 lg:px-8 h-full">
      <div className="max-w-md w-full space-y-8 flex flex-col justify-center mt-32">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:black focus:z-10 sm:text-lg text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:black focus:z-10 sm:text-lg text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent sm:text-lg text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:black mt-4"
              onClick={() => {
                Login(URL);
              }}
            >
              Sign in
            </button>
          </div>
        </form>

        <div>
          <p className=" font-bold">
            username: <span className=" font-normal">ahmadshahzad</span>
          </p>
          <p className=" font-bold">
            password: <span className=" font-normal">9038</span>
          </p>
        </div>
      </div>

      <DynamicSnackBar
        openSnackbar={openSnackbar}
        setOpenScnakbar={setOpenScnakbar}
        message={message}
      />
    </div>
  );
};

export default Login;
