export default function ButtonLogout() {
  return (
    <>
      <Link
        to={"/login"}
        type="button"
        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700dark:focus:ring-blue-800"
      >
        Login
      </Link>
    </>
  );
}
