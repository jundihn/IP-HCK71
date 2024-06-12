import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      let { data } = await axios({
        method: "POST",
        url: "/login",
        data: {
          email,
          password,
        },
      });

      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      navigate("/Homepage");
    } catch (error) {
      console.log(error);
    }
  };

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }
  useEffect(() => {
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "1030982186230-du4tl9u9imfjb6qj5gcor6hgji1a7usl.apps.googleusercontent.com",
        //   callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  });

  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={login}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              console.log(event.target.value);
            }}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email@mail.com"
            required=""
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              console.log(event.target.value);
            }}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            required=""
          />
        </div>
        <button
          //   id="buttonDiv"
          type="submit"
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <div className="max-w-sm mx-auto mt-3" id="buttonDiv"></div>
    </>
  );
}
