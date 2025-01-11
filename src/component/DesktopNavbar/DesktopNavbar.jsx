import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { BsMoonStars } from "react-icons/bs";
import { TbSun } from "react-icons/tb";
import { ThemeContext } from "../../Context/ThemeContextProvider/ThemeContextProvider";
import { AuthenticationContext } from "../../Context/AuthenticationContextProvider/AuthenticationContextProvider";
import { ToggleContext } from "../Header/Header";
import "./desktopNavbar.scss";

const DesktopNavbar = ({ avator }) => {
  const { Toggle, handleToggle } = useContext(ToggleContext);
  const { Dark, darkMode } = useContext(ThemeContext);
  const { user, logOut } = useContext(AuthenticationContext); // Access user and logOut from context
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {/* Logo */}
      <div className="flex items-center">
        <Link
          className="text-main dark:text-white capitalize font-bold text-4xl"
          to="/"
        >
          𝑚ₑ
          <span className="text-slate-900 dark:text-sky-500">Լₑₐᵣ𝑛</span>
        </Link>
      </div>

      {/* Menus */}
      <ul className="hidden lg:flex space-x-8 items-center">
        <li>
          <NavLink
            to="/"
            className="hover:text-main dark:hover:text-sky-500 duration-300 font-medium uppercase text-md text-black dark:text-white"
          >
            home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/courses"
            className="hover:text-main dark:hover:text-sky-500 duration-300 font-medium uppercase text-md text-black dark:text-white"
          >
            courses
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className="hover:text-main dark:hover:text-sky-500 duration-300 font-medium uppercase text-md text-black dark:text-white"
          >
            about
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className="hover:text-main dark:hover:text-sky-500 duration-300 font-medium uppercase text-md text-black dark:text-white"
          >
            contact
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink
              to="/mylearning"
              className="hover:text-main dark:hover:text-sky-500 duration-300 font-medium uppercase text-md text-black dark:text-white"
            >
              my learning
            </NavLink>
          </li>
        )}
      </ul>

      {/* Icons */}
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          {/* Profile */}
          <div className="hidden lg:flex items-center gap-2 relative">
            {user ? (
              <>
                <div
                  className="bg-main dark:bg-sky-500 profile h-10 w-10 flex items-center justify-center rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="font-medium uppercase text-md text-white">
                    {avator}
                  </span>
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <ul className="info absolute bg-white dark:bg-slate-900 shadow-md dark:shadow-slate-600 h-auto w-52 top-16 right-0 rounded z-10">
                    <div className="flex px-3 gap-4 items-center py-4">
                      <div className="bg-main dark:bg-sky-500 profile h-10 w-10 flex items-center justify-center rounded-full">
                        <span className="font-medium uppercase text-md text-white">
                          {avator}
                        </span>
                      </div>
                      <div>
                        <h1 className="text-lg font-medium dark:text-white capitalize">
                          hi, {user.username}
                        </h1>
                        <p className="dark:text-slate-300">{user.email}</p>
                      </div>
                    </div>
                    <li
                      className="px-3 py-3 hover:bg-neutral-100 dark:hover:bg-slate-800 duration-300 cursor-pointer"
                      onClick={() => {
                        logOut();
                        setDropdownOpen(false);
                      }}
                    >
                      <Link className="flex items-center gap-3" to="/">
                        <span>
                          <FaSignOutAlt className="dark:text-white" />
                        </span>
                        <span className="dark:text-white capitalize">
                          log out
                        </span>
                      </Link>
                    </li>
                  </ul>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/log-in"
                  className="text-md font-medium text-main border py-2 px-4 border-main dark:border-sky-500 dark:text-sky-500 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 duration-300"
                >
                  Log in
                </Link>
                <Link
                  to="/sign-up"
                  className="text-md font-medium text-white border py-2 px-4 border-main rounded-lg bg-main dark:bg-sky-500"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Dark Mode Icon */}
          <div
            className="border border-gray-300 dark:border-slate-600 p-2 rounded-lg shadow cursor-pointer"
            onClick={darkMode}
          >
            <div className="text-xl text-main dark:text-sky-500">
              {Dark === "dark" ? <TbSun /> : <BsMoonStars />}
            </div>
          </div>

          {/* Toggle Menu Icon */}
          <div
            className={`${
              Toggle
                ? "rounded-full shadow shadow-slate-900 dark:shadow-slate-500 p-2"
                : ""
            } border bg-white dark:bg-slate-900 border-gray-300 z-20 dark:border-slate-600 p-2 rounded-lg shadow lg:hidden cursor-pointer`}
            onClick={handleToggle}
          >
            {Toggle ? (
              <FaTimes className="text-xl text-main dark:text-sky-500" />
            ) : (
              <FaBars className="text-xl text-main dark:text-sky-500" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopNavbar;
