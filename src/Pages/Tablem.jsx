// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Dashboard from './Dashboard';
// import { startOfMonth, addMonths, eachWeekOfInterval, endOfMonth, format, startOfWeek, isSameWeek, subMonths, isBefore } from 'date-fns';
// import { BsBell } from 'react-icons/bs';
// import { toast, ToastContainer, Zoom, Flip } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Tablem = () => {
//     const [projects, setProjects] = useState([]);
   
//     useEffect(() => {
//         const fetchPros = async () => {
//             try {
//                 const response = await toast.promise(
//                     axios.get(`${process.env.REACT_APP_BE_URL}/project/managerprojects/`, {
//                         headers: {
//                             Accept: "application/json",
//                             Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
//                         },
//                     }),
//                     {
//                         pending: "Retrieving data..!",
//                     }
//                 );

//                 if (response.status === 200 && response.data.all_projects.length > 0) {
//                     // toast.success("Projects Retrieved!!!", {
//                     //     position: "top-right",
//                     //     transition: Flip,
//                     //     autoClose: 1500,
//                     //     hideProgressBar: false,
//                     //     closeOnClick: true,
//                     //     pauseOnHover: true,
//                     //     draggable: true,
//                     //     progress: undefined,
//                     //     theme: "light",
//                     // });
//                     setProjects(response.data.all_projects);
//                 } if (response.status === 200 && response.data.all_projects.length === 0) {
//                     toast.success("No Projects Available!!!", {
//                         position: "top-right",
//                         transition: Flip,
//                         autoClose: 1500,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "light",
//                     });
//                 }
//             } catch (error) {
//                 toast.error("Error Retrieving!", {
//                     position: "top-right",
//                     transition: Zoom,
//                     autoClose: 2500,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 });
//                 // console.log(error);
//             }
//         }

//         fetchPros()
//     }, []);

//     return (
//         <div className="flex flex-col md:flex-row max-h-screen bg-sky-50 overflow-clip w-screen">
//             <Dashboard />
//             <main className="flex-1 p-4 bg-sky-50 border-5 shadow-md h-screen w-full">
//                 <div className="flex flex-wrap w-full gap-2 justify-center">
//                     {projects.length > 0 && projects.map(ea => (
//                         <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-80">
//                             <div class="p-6">
//                                 <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
//                                     {ea?.projectID}
//                                 </h5>
//                                 <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
//                                     {ea?.projectName}
//                                 </p>
//                                 <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
//                                     {ea?.projectCode}
//                                 </p>
//                             </div>
//                             <div class="p-6 pt-0">
//                                 <Link
//                                     className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
//                                     to={`/tablemanProEmp?projectID=${ea?.projectID}`}>
//                                     View Contributors
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </main>
//         </div>
//     );
// };
// export default Tablem;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import { toast, ToastContainer, Zoom, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaProjectDiagram, FaUser, FaBuilding, FaUserTie, FaChevronRight, FaClipboardCheck } from 'react-icons/fa';

const Tablem = () => {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [isadmin, setIsAdmin] = useState(false);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRole = sessionStorage.getItem("role");
                console.log(userRole)
                setIsAdmin(userRole === "admin");

                if (userRole === "admin") {
                    await fetchAllUsers();
                } else {
                    await fetchProjects();
                }
            } catch (error) {
                handleError(error);
            }
        };

        fetchData();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await toast.promise(
                axios.get(`${process.env.REACT_APP_BE_URL}/project/managerprojects/`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
                    },
                }),
                {
                    pending: "Retrieving projects...",
                }
            );

            if (response.status === 200) {
                if (response.data.all_projects.length > 0) {
                    setProjects(response.data.all_projects);
                } else {
                    toast.success("No Projects Available!", {
                        position: "top-right",
                        transition: Flip,
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
        } catch (error) {
            handleError(error);
        }
    };

    const fetchAllUsers = async () => {
        try {
            const response = await toast.promise(
                axios.get(`${process.env.REACT_APP_BE_URL}/user/allprofile/`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
                    },
                }),
                {
                    pending: "Retrieving all users...",
                }
            );

            if (response.status === 200 && response.data.msg) {
                if (response.data.msg.length > 0) {
                    setUsers(response.data.msg);
                } else {
                    toast.success("No Users Available!", {
                        position: "top-right",
                        transition: Flip,
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
        } catch (error) {
            handleError(error);
            console.log("Error to retrieve users")
        }
    };

    const handleError = (error) => {
        toast.error("Error Retrieving Data!", {
            position: "top-right",
            transition: Zoom,
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        console.error(error);
    };


    return (
        <div className="flex flex-col lg:flex-row max-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 overflow-clip w-screen">
            <Dashboard />
            <main className="flex-1 p-3 sm:p-4 md:p-6 h-screen overflow-y-auto pt-16 lg:pt-6">
                {/* Header Section */}
                <div className="mb-4 sm:mb-6 md:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-2">
                        {isadmin ? 'User Management' : 'Project Approvals'}
                    </h1>
                    <div className="h-1 sm:h-1.5 w-24 sm:w-28 md:w-32 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full"></div>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-2 sm:mt-3">
                        {isadmin 
                            ? `Manage and review all user timesheets and activities` 
                            : `Review and approve timesheets for your assigned projects`
                        }
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                    {isadmin ? (
                        users.map((user, index) => (
                            <div 
                                key={user.empID} 
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                            >
                                {/* Card Header with Gradient */}
                                <div className="bg-gradient-to-br from-blue-500 to-sky-400 p-4 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-10 -mb-10"></div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
                                            <FaUser className="text-white text-lg" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1 truncate">{user.name}</h3>
                                        <p className="text-blue-100 text-xs font-medium">{user.empID}</p>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4 space-y-2">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <FaBuilding className="text-blue-600 text-xs" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500">Cost Center</p>
                                            <p className="font-semibold text-xs truncate">{user.costcenter__number}_{user.costcenter__name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center">
                                            <FaUserTie className="text-sky-600 text-xs" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500">Role</p>
                                            <p className="font-semibold text-xs capitalize truncate">{user.role__roleName}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="px-4 pb-4">
                                    <Link
                                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all"
                                        to={`/Month?empID=${user.empID}`}
                                    >
                                        View Details
                                        <FaChevronRight className="text-xs" />
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        projects.map((project, index) => (
                            <div 
                                key={project.projectID} 
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                            >
                                {/* Card Header with Gradient */}
                                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-4 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-10 -mb-10"></div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
                                            <FaProjectDiagram className="text-white text-lg" />
                                        </div>
                                        <div className="mb-2">
                                            <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                                                {project.projectID}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white truncate">{project.projectName}</h3>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <FaClipboardCheck className="text-blue-600 text-xs" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500">Project Code</p>
                                            <p className="font-semibold text-xs truncate">{project.projectCode}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="px-4 pb-4">
                                    <Link
                                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all"
                                        to={`/tablemanProEmp?projectID=${project.projectID}`}
                                    >
                                        View Contributors
                                        <FaChevronRight className="text-xs" />
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Empty State */}
                {!isadmin && projects.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-96">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                            <FaProjectDiagram className="text-blue-500 text-4xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Projects Available</h3>
                        <p className="text-gray-500">There are no projects assigned to you at the moment.</p>
                    </div>
                )}
                {isadmin && users.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-96">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                            <FaUser className="text-blue-500 text-4xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Users Available</h3>
                        <p className="text-gray-500">There are no users in the system at the moment.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Tablem;