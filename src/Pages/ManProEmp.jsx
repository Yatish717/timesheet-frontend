import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import { toast, ToastContainer, Zoom, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUser, FaBuilding, FaIdCard, FaChevronRight, FaUsers } from 'react-icons/fa';

const ManProEmp = (props) => {
    const [proUsers, setProUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectID = searchParams.get('projectID');
    const [profileData, setProfileData] = useState({});
    useEffect(() => {
        const fetchProEmps = async () => {
            try {
                const response = await toast.promise(
                    axios.get(`${process.env.REACT_APP_BE_URL}/user/allprofile/`, {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
                        },
                    }),
                    {
                        pending: "Retrieving..!",
                    }
                );

                if (response.status === 200 && response.data.msg.length > 0) {
                    // toast.success("Users Retrieved!!!", {
                    //     position: "top-right",
                    //     transition: Flip,
                    //     autoClose: 1500,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "light",
                    // });
                    setUsers(response.data.msg);
                } if (response.status === 200 && response.data.msg.length === 0) {
                    toast.info("No Users Available!!!", {
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
            } catch (error) {
                toast.error("Error Retrieving!", {
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
                // console.log(error);
            }
        }
        fetchProEmps()
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await toast.promise(
                    axios.get(`${process.env.REACT_APP_BE_URL}/project/projectusers/${projectID}/`, {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
                        },
                    }),
                    {
                        pending: "Retrieving..!",
                    }
                );

                if (response.status === 200 && response.data.msg.all_employees.length > 0) {
                    // toast.success("Employees Retrieved!!!", {
                    //     position: "top-right",
                    //     transition: Flip,
                    //     autoClose: 1500,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "light",
                    // });
                    setProUsers(response.data.msg.all_employees);
                    console.log("ProUsers", response.data.msg);
                } if (response.status === 200 && response.data.msg.all_employees.length === 0) {
                    toast.success("No Employees Available!!!", {
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
            } catch (error) {
                toast.error("Error Retrieving Project Users!", {
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
                console.log(error);
            }
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await toast.promise(
                    axios.get(`${process.env.REACT_APP_BE_URL}/user/profile/`, {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
                        },
                    }),
                    {
                        pending: "Getting profile data..!",
                    }
                );

                if (response.status === 200) {
                    setProfileData({
                        name: response.data.name,
                        empId: response.data.empID,
                        // dept: response.data.department.name
                        dept: `${response.data.costcenter.number}_${response.data.costcenter.name}`
                    });
                }
            } catch (error) {
                toast.error("Error retrieving profile!", {
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
                // console.log(error);
            }
        };
        fetchUserData();
    }, []);

    // useEffect(() => {
    //     console.log("PROPS", location)
    // }, [location])

    return (
        <div className="flex flex-col md:flex-row max-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 overflow-clip w-screen">
            <Dashboard />
            <main className="flex-1 p-6 h-screen overflow-y-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-blue-900 mb-2">
                        Project Contributors
                    </h1>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full"></div>
                    <p className="text-gray-600 mt-3">
                        Review and manage timesheets for all employees assigned to this project
                    </p>
                </div>

                {/* Employee Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {proUsers.length > 0 && proUsers.map(ea => {
                        const userName = users.find(val => val.empID === ea)?.name === undefined ? (ea === profileData?.empId ? profileData?.name : "") : users.find(val => val.empID === ea)?.name;
                        // const userDept = users.find(val => val.empID === ea)?.department__name === undefined ? (ea === profileData?.empId ? profileData?.dept : "") : users.find(val => val.empID === ea)?.department__name;
                        const userData = users.find(val => val.empID === ea);

const userDept = userData
  ? `${userData.costcenter__number}_${userData.costcenter__name}`
  : "N/A";
                        return (
                            <div key={ea} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                                {/* Card Header with Gradient */}
                                <div className="bg-gradient-to-br from-blue-500 to-sky-400 p-4 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-10 -mb-10"></div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
                                            <FaUser className="text-white text-lg" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1 truncate">
                                            {userName || "N/A"}
                                        </h3>
                                        <p className="text-blue-100 text-xs font-medium">{ea}</p>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <FaBuilding className="text-blue-600 text-xs" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500">Cost Center</p>
                                            <p className="font-semibold text-xs truncate">
                                                {userDept || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="px-4 pb-4">
                                    <Link
                                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all"
                                        to={`/weeklydataapproval?pID=${projectID}&eID=${ea}`}
                                    >
                                        View Timesheet
                                        <FaChevronRight className="text-xs" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {proUsers.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-96">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                            <FaUsers className="text-blue-500 text-4xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Contributors Found</h3>
                        <p className="text-gray-500">There are no employees assigned to this project yet.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ManProEmp;
