/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useGetAllUsersQuery, useLogoutUserMutation } from '../../redux/api/apiSlice';
import toast, { Toaster } from "react-hot-toast";


const Navigation = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropDown, setDropDown] = useState(false);

    const [logoutUser] = useLogoutUserMutation();
    const { data, isLoading, error } = useGetAllUsersQuery(undefined);
    console.log("Get all user data after sign in: ", data);
    console.log(isLoading)
    console.log(error)

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.reload();
      console.log('Logged out')
      toast.success('Logged out');
    } catch (error) {
      toast.error("Failed to update book.");
    }
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const miniToggleDropdown = () => {
    setDropDown(!dropDown);
  }

    return (
    <nav className="border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <h4 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Book_Catalog
          </h4>
        </Link>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-expanded={isDropdownOpen ? 'true' : 'false'}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isDropdownOpen ? 'block' : 'hidden'
          }  w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/home"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-books"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                All Books
              </Link>
            </li>
            <li>
              <Link
                to="/add-new-book"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Add New Book
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={miniToggleDropdown}
                className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                aria-haspopup="true"
                aria-expanded={dropDown ? 'true' : 'false'}
              >
                Account
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {dropDown && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-400"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="dropdownLargeButton"
                  >
                    
                    
                    <li>
                      <Link
                        to="/signin"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign in
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                        role="menuitem"
                        
                      >
                        <button onClick={handleLogout}>Sign out</button>
                        
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            
            <li>
              <Link
                to="/signup"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </nav>


    );
};

export default Navigation;