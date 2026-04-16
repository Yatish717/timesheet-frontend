import React from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import background from "./Aspl2.png";

const Landing = () => {
  return (
    <div
      className="bg-fit bg-center w-screen h-full  "
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      <div className="min-h-screen mx-auto ">
        <nav className="flex items-center justify-between p-4 ">
          <div className="flex items-center"></div>
          <div className="flex items-center space-x-4 w-full">
            <div className="w-1/2">
            {/* <div className="w-1/2"></div> */}
          </div>
<div className="w-1/2 flex gap-4 p-2 justify-end">
{/* <h2 className="bg-gradient-to-r from-sky-400 via-sky-600  to-sky-800 text-white text-center items-center p-2 gap-3 rounded-lg shadow-lg shadow-white  w-32 h-12 text-xl">Home</h2> */}
{/* <h2 className="bg-gradient-to-r from-sky-400 via-sky-600  to-sky-800 text-white text-center items-center p-2 gap-3 rounded-lg shadow-lg shadow-white  w-32 h-12 text-xl">About</h2> */}
{/* <h2 className="bg-gradient-to-r from-sky-400 via-sky-600  to-sky-800 text-white text-center items-center p-2 gap-3 rounded-lg shadow-lg shadow-white  w-32 h-12 text-xl">Help</h2> */}
<h2 className="bg-gradient-to-r from-sky-400 via-sky-600  to-sky-800 text-white text-center items-center p-2 gap-3 rounded-lg shadow-lg shadow-white flex   w-32 h-12 text-xl">
          <a
            href="/Login"
            className="font-medium text-2xl text-white items-center  hover:text-blue-200"
          >
            <Link
              to="/login">
              Login
            </Link>
          </a></h2>
          </div>
          </div>
        </nav>
      </div>
      <div className="mb-20">
        <footer>
          <section class="flex justify-center items-center">
            <button
              href="/"
              class="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#0077b5] from-gray-800 text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1.1em"
                viewBox="0 0 512 512"
                stroke-width="0"
                fill="currentColor"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"></path>
              </svg>
              <span class="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">
                Linkedin
              </span>
            </button>
          </section>
        </footer>
      </div>
    </div>
  );
};
export default Landing;
