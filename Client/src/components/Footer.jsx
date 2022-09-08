import React from "react";
const Footer = () => {
  return (
    <footer className="bottom-0 left-0 z-20 p-2 w-full bg-slate-900 border-t border-gray-200 shadow md:flex md:items-center md:justify-between dark:bg-gray-800 dark:border-gray-600">
      <span className="text-sm text-slate-50 sm:text-center dark:text-gray-400">
        © 2022{" "}
        <a href="#" class="hover:underline">
          Charles Zhang
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-slate-50 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6 ">
            Contact us
          </a>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            Privacy Policies
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Help
          </a>
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
