import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { CiEdit } from "react-icons/ci";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./CreateUser.css"; // Import the CSS file
import { Eye, EyeOff } from "lucide-react";

const Createuser = () => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
    empID: "",
    // organization: 1,
    department: Number,
    // companyCode: "",
    costcenter: "",
    role: Number,
    branch: "",
    doj: "",
  });

  const [isadmin, setIsadmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isemployee, setIsemployee] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedManager1, setSelectedManager1] = useState("");
  const [selectedManager2, setSelectedManager2] = useState("");
  const [managerEmployees, setManagerEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [movedEmployees, setMovedEmployees] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [departments, setDepartments] = useState([]);
const [roles, setRoles] = useState([]);
const [costCenters, setCostCenters] = useState([]);
const [branches, setBranches] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };


// const fetchDepartments = async () => {
//   try {
//     const res = await axios.get(`${process.env.REACT_APP_BE_URL}/user/department/`, {
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
//       },
//     });

//     setDepartments(res.data.msg); // direct array

//   } catch (error) {
//     console.error("Department fetch error", error);
//   }
// };


const fetchRoles = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_URL}/user/role/`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });

    const data = res.data.msg;
    const formatted = Object.entries(data).map(([id, name]) => ({
      id,
      name,
    }));

    setRoles(formatted);
  } catch (error) {
    console.error("Role fetch error", error);
  }
};

const fetchCostCenters = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BE_URL}/user/costcenter/`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      }
    );

    setCostCenters(res.data.msg);

  } catch (error) {
    console.error("Cost center fetch error", error);
  }
};

const fetchBranches = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_URL}/user/branch/`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });

    const data = res.data.msg;
    const formatted = Object.entries(data).map(([id, name]) => ({
      id,
      name,
    }));

    setBranches(formatted);
  } catch (error) {
    console.error("Branch fetch error", error);
  }
};



  const fetchUsers = async () => {
    try {
      const response = await toast.promise(
        axios.get(`${process.env.REACT_APP_BE_URL}/user/allprofile/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }),
        {
          pending: "Getting profiles...!",
          // success: "Yes you got your ticket...Redirecting",
        }
      );

      if (response.status === 200) {
        console.log(response);
        setUsers(response.data.msg);
      }
    } catch (error) {
      toast.error("Error retriving profiles!", {
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
  };

  useEffect(() => {
    fetchUsers();
    //  fetchDepartments();
  fetchRoles();
  fetchCostCenters();
  fetchBranches();
  }, []);

  const handleAddUser = () => {
    // Directly use startDate as it's in "YYYY-MM-DD" format from input[type="date"]
    if (!startDate || isNaN(Date.parse(startDate))) {
      toast.warn("Please select a valid Date of Joining!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    let inputsClone = {
      ...inputs,
      doj: startDate,
    };

    if (
      inputsClone.email === "" ||
      inputsClone.name === "" ||
      inputsClone.password === "" ||
      inputsClone.password2 === ""
    ) {
      toast.warn("Fields empty!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (inputsClone.password !== inputsClone.password2) {
      toast.warn("Passwords do not match!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    toast
      .promise(
        axios.post(
          `${process.env.REACT_APP_BE_URL}/user/register/`,
          inputsClone,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
          }
        ),
        {
          pending: "Creating User...",
          success: "User Created",
        }
      )
      .then((response) => {
        if (
          response.status === 201 &&
          response.data.msg === "Registration Successful..."
        ) {
          setInputs({
            email: "",
            name: "",
            password: "",
            password2: "",
            empID: "",
            // organization: 1,
            department: "",
            // companyCode: 1,
            costcenter: "",
            role: "",
            branch: "",
            doj: "",
          });
          setStartDate(new Date());
          fetchUsers();
          handleClose(); // Close modal after successful creation
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          const errorData = err.response.data?.msg;

          if (typeof errorData === "object") {
            Object.values(errorData).forEach((messages) => {
              if (Array.isArray(messages)) {
                messages.forEach((msg) => {
                  toast.error(msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                  });
                });
              }
            });
          } else if (typeof errorData === "string") {
            toast.error(errorData, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });
          }
        } else {
          toast.error("Error Registering User", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }

        console.log("User RegisterBy", err);
      });
  };

  const handledepartment = (event) => {
    const selectedDepartment = event.target.value;
    setSelectedDepartment(selectedDepartment);
  };
  const handleDepartmentChange = (event) => {
    const selectedDepartment = event.target.value;
    setSelectedDepartment(selectedDepartment);
  };

  const handleManagerChange1 = (event) => {
    const selectedManager = event.target.value;
    setSelectedManager1(selectedManager);
    // const managerData = dummyData.find((data) => data.manager === selectedManager);
    // if (managerData) {
    //   setManagerEmployees(managerData.employees);
    // } else {
    //   setManagerEmployees([]);
    // }
  };

  const handleManagerChange2 = (event) => {
    const selectedManager = event.target.value;
    setSelectedManager2(selectedManager);
  };

  const handleUpdate = () => {
    setNotification("User updated successfully!");
    const selectedEmployee = inputs.Employee;
    const selectedDepartment = inputs.Department;
    const movedEmployee = {
      name: selectedEmployee,
      manager: selectedManager2,
      department: selectedDepartment,
    };
    setMovedEmployees([...movedEmployees, movedEmployee]);

    toast.success(
      `${selectedEmployee} moved to ${selectedManager2} in ${selectedDepartment}`,
      {
        autoClose: 3000,
        position: "top-center",
      }
    );
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <Dashboard />
      <main className="flex-1 p-3 sm:p-4 md:p-6 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 overflow-auto pt-16 lg:pt-6">
        {/* Header with Add User Button */}
        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl mb-4 sm:mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                User Management
              </h1>
              <p className="text-blue-100 text-xs sm:text-sm mt-1 sm:mt-2">Manage team members and their details</p>
            </div>
            <button
              onClick={handleOpen}
              className="w-full sm:w-auto bg-white text-blue-600 py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New User
            </button>
          </div>
        </div>

        {/* User Details Table */}
        {users.length > 0 ? (
          <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-4 sm:p-5">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Registered Users
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm mt-1">Currently registered users in the system</p>
            </div>

            <div className="overflow-auto max-h-96">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-300">
                      Emp ID
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-300">
                      Emp Name
                    </th>
                    <th className="hidden md:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-300">
                      Cost Center
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr 
                      key={index}
                      className="hover:bg-blue-50 transition-colors border-b border-gray-200"
                    >
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-800 font-medium">
                        {user.empID}
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">
                        {user.name}
                      </td>
                      <td className="hidden md:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">
                        {user.costcenter__number}_{user.costcenter__name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Users Found</h3>
            <p className="text-gray-500">Click "Add New User" to create your first user</p>
          </div>
        )}

        {/* Add User Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 900,
            maxHeight: '90vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
            borderRadius: '16px',
            boxShadow: 24,
          }}>
            <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-6 sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h2 id="modal-title" className="text-2xl font-bold text-white flex items-center gap-3">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Create New User
                  </h2>
                  <p className="text-blue-100 mt-1">Add new team member to the system</p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Name */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={inputs.name}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Emp ID */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Emp ID
                  </label>
                  <input
                    type="text"
                    name="empID"
                    value={inputs.empID}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Enter employee ID"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="user@aspl.ai"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Role
                  </label>
                  <select
  name="role"
  value={inputs.role}
  onChange={handleInputChange}
   className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4"
>
  <option value="">Select Role</option>

  {roles.map((role) => (
    <option key={role.id} value={role.id}>
      {role.name}
    </option>
  ))}
</select>
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={inputs.password}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 pr-12 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Enter password"
                    required
                  />
                  <span
                    className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-blue-500 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </span>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Confirm Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password2"
                    value={inputs.password2}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 pr-12 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Confirm password"
                  />
                  <span
                    className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-blue-500 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </span>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Location
                  </label>
                 <select
  name="branch"
  value={inputs.branch}
  onChange={handleInputChange}
  className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4"
>
  <option value="">Select Location</option>

  {branches.map((branch) => (
    <option key={branch.id} value={branch.id}>
      {branch.name}
    </option>
  ))}
</select>
                </div>

                {/* Cost Center */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Cost Center
                  </label>
                 <select
  name="costcenter"
  value={inputs.costcenter}
  onChange={handleInputChange}
  className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4"
>
  <option value="">Select Cost Center</option>

   {costCenters.map((cc) => (
    <option key={cc.id} value={cc.id}>
     {cc.number}_{cc.name}
    </option>
  ))}
</select>
                </div>

                {/* Department */}
                {/* <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Department
                  </label>
                  <select
  name="department"
  value={inputs.department}
  onChange={handleInputChange}
  className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4"
>
  <option value="">Select Department</option>

  {departments.map((dept) => (
    <option key={dept.id} value={dept.id}>
      {dept.name}_{dept.description}
    </option>
  ))}

</select>
                </div> */}

                {/* Date of Joining */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Date of Joining
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={handleClose}
                  className="bg-gray-200 text-gray-700 py-3 px-8 rounded-lg font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create User
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </main>
    </div>
  );
};

export default Createuser;
