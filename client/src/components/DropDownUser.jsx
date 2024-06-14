import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";

export default function DropDown() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      localStorage.removeItem("access_token");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = async () => {
    try {
      let data = await axios({
        method: "DELETE",
        url: "/delete_account",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (data.status === 200) {
        console.log("Berhasil dihapus");

        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        id="dropdownInformationButton"
        data-dropdown-toggle="dropdownInformation"
        className="w-15 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
        type="button"
      >
        <svg
          className="w-6 h-6 text-white-800 dark:text-white inline-block"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          className="w-2.5 h-2.5 ml-3 inline-block"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {/* Dropdown menu */}
      <div
        id="dropdownInformation"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformationButton"
        >
          <li>
            <Link
              to={"/edit_profile"}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit Profile
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign Out
            </button>
          </li>
        </ul>
        <div className="py-2">
          <a
            onClick={deleteAccount}
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Delete Account
          </a>
        </div>
      </div>
    </>
  );
}
