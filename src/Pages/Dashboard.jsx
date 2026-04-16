// import React, { useState, useEffect } from "react";
// import { IconContext } from "react-icons";
// import { CgProfile } from "react-icons/cg";
// import { IoMdTime } from "react-icons/io";
// import { Link, useNavigate } from "react-router-dom";
// import { FaUser } from "react-icons/fa";
// import { BiSolidImageAlt } from "react-icons/bi";
// import { IoIosCreate } from "react-icons/io";
// import { FcManager, FcViewDetails, FcLeave } from "react-icons/fc";
// import { MdOutlineAttachMoney } from "react-icons/md";
// import logo from "./Anmerkung.png";
// import { Button } from "antd";
// import { Flip, ToastContainer, Zoom, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import Userprofile from "./Userprofile";

// // Permissions object to define access for each role
// const permissions = {
//   admin: ["/user", "/createuser", "/table1", "/tablem", "/tablea", "/project1", "/Leave1", "/costcenter"],
//   manager: ["/user", "/table1", "/tablem", "/Leave1"],
//   employee: ["/user", "/table1", "/Leave1"],
// };

// // All options available in the dashboard
// const allOptions = [
//   { to: "/user", icon: <FaUser />, text: "User Profile" },
//   { to: "/createuser", icon: <IoIosCreate />, text: "Create User" },
//   { to: "/table1", icon: <IoMdTime />, text: "TimeSheet" },
//   { to: "/tablem", icon: <FcViewDetails />, text: "Emp Details" },
//   { to: "/tablea", icon: <FcManager />, text: "Manager Table" },
//   { to: "/project1", icon: <BiSolidImageAlt />, text: "Create Project" },
//   { to: "/Leave1", icon: <FcLeave />, text: "Leave" },
//   { to: "/costcenter", icon: <MdOutlineAttachMoney />, text: "Cost Center" },
// ];

// const Dashboard = () => {

//   const [userRole, setUserRole] = useState();
//   const [isHovered, setIsHovered] = useState(false);
//   const navigate = useNavigate();
//   useEffect(() => {

//     // const fetchUserRole = async () => {
//     //   const role = "manager"; 
//     //   setUserRole(role);
//     // };
//     const fetchUserRole = async () => {
//       try {
//         const response = await toast.promise(
//           axios.get(`${process.env.REACT_APP_BE_URL}/user/profile/`, {
//             headers: {
//               Accept: "application/json",
//               Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
//             },
//           }),
//           {
//             pending: "Getting profile data..!",
//             // success: "Yes you got your ticket...Redirecting",
//           }
//         );

//         if (response.status === 200) {
//           // console.log(response);
//           setUserRole(response.data.role.roleName)
//         }
//       } catch (error) {
//         toast.error("Error retriving profile!", {
//           position: "top-right",
//           transition: Zoom,
//           autoClose: 2500,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//         console.log(error);
//       }
//     };
//     fetchUserRole();
//   }, []);

//   // useEffect(() => {
//   //   console.log(userRole);
//   // }, [userRole]);

//   const isAccessible = (path) => {
//     return userRole && permissions[userRole].includes(path);
//   };

//   if (!userRole) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-wrap">
//       <nav className="max-h-screen bg-sky-400 border-r-2 border-gray-200" style={{ width: "12vw" }}>
//         <div className="flex justify-center">
//           <img src={logo} alt="Logo" className="w-26" />
//         </div>
//         <div className="p-4" style={{
//           width: "12vw"
//         }}>
//           <ul className="mt-4">
//             <li className="mb-6 border-2 border-black p-2 rounded-lg bg-white">
//               <div className="flex flex-col items-center">
//                 <IconContext.Provider value={{ size: "2em" }}>
//                   <CgProfile />
//                 </IconContext.Provider>
//                 {/* <p className="mt-4 text-xl font-semibold text-black">User</p>
//                 <p className="text-lg text-gray-600">user@aspl.ai</p> */}
//               </div>
//             </li>
//             {allOptions.map((item) => (
//               <li className="mb-2" key={item.to}>
//                 <Link
//                   to={isAccessible(item.to) ? item.to : "#"}
//                   className={`flex items-center p-4 text-md font-semibold ${isAccessible(item.to) ? "text-black bg-white" : "text-gray-400 bg-gray-200 cursor-not-allowed"
//                     } rounded-lg shadow-md hover:bg-cyan-400 hover:text-red-900 transition duration-300`}
//                   onClick={(e) => {
//                     if (!isAccessible(item.to)) e.preventDefault();
//                   }}
//                 >
//                   {item.icon}
//                   <span className="ml-3">{item.text}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//           <div className="flex justify-center mt-2">
//             <button
//               className={`
//                   relative overflow-hidden
//         px-4 py-2 rounded-full
//         font-semibold text-white
//         bg-gradient-to-r from-blue-600 to-blue-800
//         transform transition-all duration-300 ease-in-out
//         ${isHovered ? 'scale-105 shadow-lg' : 'scale-100 shadow-md'}
//       `}
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//               onClick={() => {
//                 sessionStorage.clear();
//                 navigate("/login");
//               }}
//             >
//               <span className="relative z-10">Logout</span>
//               <span
//                 className={`
//           absolute inset-0 
//           bg-gradient-to-r from-blue-800 to-blue-600
//           transform transition-transform duration-300 ease-in-out
//           ${isHovered ? 'translate-x-0' : '-translate-x-full'}
//         `}
//               />
//             </button>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { IoMdTime } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BiSolidImageAlt } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";
import { FcManager, FcViewDetails, FcLeave } from "react-icons/fc";
import { MdOutlineAttachMoney } from "react-icons/md";
import logo from "./Anmerkung.png";
import { Button } from "antd";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Userprofile from "./Userprofile";
import ThreeDanimation from "./threeDAnimation";
import { DNA, Watch } from 'react-loader-spinner'
import { Rotate3D } from "lucide-react";
import { Create, DashboardCustomize, GraphicEqOutlined } from "@mui/icons-material";

// Permissions object to define access for each role
const permissions = {
  admin: ["/user", "/createuser", "/table1", "/tablem", "/tablea", "/project1", "/costcenter", "/Create1","/Leave1"],
  // manager: ["/user", "/table1", "/tablem","/graph"],
  manager: ["/user", "/table1", "/tablem","/Leave1"],
  // employee: ["/user", "/table1"],
  employee: ["/user", "/table1","/Leave1"],
};

// All options available in the dashboard
const allOptions = [
  { to: "/user", icon: <FaUser />, text: "Profile" },
  // {to :'/graph' ,icon:<DashboardCustomize/>,text:"Dashboard"},
  { to: "/createuser", icon: <IoIosCreate />, text: "Users" },
  { to: "/table1", icon: <IoMdTime />, text: "TimeSheet" },
  { to: "/tablem", icon: <FcViewDetails />, text: "Approvals" },
  
  // { to: "/tablea", icon: <FcManager />, text: "Manager Table" },
  { to: "/project1", icon: <BiSolidImageAlt />, text: "Projects" },
  { to: "/Leave1", icon: <FcLeave />, text: "Leave" },
  // { to: "/costcenter", icon: <MdOutlineAttachMoney />, text: "Creation" },
  { to: "/Create1", icon: <Create />, text: "Creation" },
];

const Dashboard = () => {
  const [userRole, setUserRole] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BE_URL}/user/profile/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          },
        });

        if (response.status === 200) {
          setUserRole(response.data.role.roleName);
        }
      } catch (error) {
        console.log("Error retrieving profile:", error);
      }
    };
    fetchUserRole();
  }, []);

  const isAccessible = (path) => {
    return userRole && permissions[userRole]?.includes(path);
  };

  if (!userRole) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-b from-blue-600 via-blue-500 to-sky-400 shadow-2xl w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 h-screen">
        <Watch
          visible={true}
          height="80"
          width="80"
          radius="48"
          color="#ffffff"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isSidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 sm:w-72 md:w-80 lg:w-64 xl:w-72 2xl:w-80
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <nav className="bg-gradient-to-b from-blue-600 via-blue-500 to-sky-400 w-full h-screen shadow-2xl overflow-y-auto">
          {/* Logo Section */}
          <div className="flex justify-center p-4 sm:p-5 md:p-6 bg-white/10 backdrop-blur-sm">
            <img src={logo} alt="Logo" className="w-24 sm:w-28 md:w-32 lg:w-28 xl:w-32 drop-shadow-lg" />
          </div>

          <div className="px-3 sm:px-4 pb-6">
            {/* Profile Icon */}
            <div className="mb-4 sm:mb-5 md:mb-6 bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-lg">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-sky-300 rounded-full flex items-center justify-center shadow-md mb-2">
                  <IconContext.Provider value={{ size: "1.75em", className: "text-white sm:text-2xl" }}>
                    <CgProfile />
                  </IconContext.Provider>
                </div>
                <p className="text-xs sm:text-sm font-bold text-gray-800">{sessionStorage.getItem('role') || 'User'}</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <ul className="space-y-1.5 sm:space-y-2">
              {allOptions.map((item) => {
                const accessible = isAccessible(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={accessible ? item.to : "#"}
                      className={`
                        flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl font-semibold text-xs sm:text-sm
                        transition-all duration-200 transform
                        ${accessible 
                          ? 'bg-white/90 text-blue-900 hover:bg-white hover:scale-105 hover:shadow-lg active:scale-95' 
                          : 'bg-white/30 text-gray-300 cursor-not-allowed'
                        }
                      `}
                      onClick={(e) => {
                        if (!accessible) e.preventDefault();
                        if (accessible && isSidebarOpen) setIsSidebarOpen(false);
                      }}
                    >
                      <span className={`text-base sm:text-lg ${accessible ? '' : 'opacity-50'}`}>
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.text}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Logout Button */}
            <div className="mt-4 sm:mt-5 md:mt-6">
              <button
                className={`
                  w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-sm sm:text-base text-white
                  bg-gradient-to-r from-orange-500 to-orange-600
                  shadow-lg transform transition-all duration-200
                  ${isHovered ? 'scale-105 shadow-xl from-orange-600 to-orange-700' : 'scale-100'}
                  active:scale-95
                `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                  sessionStorage.clear();
                  navigate("/login");
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Dashboard;
