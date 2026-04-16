import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { VscOrganization } from "react-icons/vsc";
import { BsCalendar2DateFill } from "react-icons/bs";
import { TbNumbers } from "react-icons/tb";
import { useStyleRegister } from "antd/es/theme/internal";
import axios from "axios";
import { toast } from "react-toastify";
import { Flip, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Eye, EyeOff } from "lucide-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 345,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const Userprofile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [org, setOrg] = useState();
  const [empid, setEmpid] = useState();
  const [dept, setDept] = useState();
  const [role, setRole] = useState();
  const [cost, setCost] = useState();
  const [date, setDate] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [submit, setSubmit] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClosee = () => setOpen1(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/user/profile/`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })

      .then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem("role", response.data.role.roleName);
          // sessionStorage.setItem('email', response.data.email);
          // sessionStorage.setItem('organization', response.data.organization);
          // sessionStorage.setItem('empID', response.data.empID);
          // sessionStorage.setItem('department', response.data.department);
          // sessionStorage.setItem('role', response.data.role);
          // sessionStorage.setItem('costcenter', response.data.costcenter);
          // sessionStorage.setItem('doj', response.data.doj);
          // sessionStorage.setItem('location', response.data.location);
          const arr = [...profileData];

          // arr[0].value = response.data.name;
          // arr[1].value = response.data.email;
          // arr[2].value = response.data.empID;
          // arr[3].value = response.data.organization.name;
          // arr[4].value = response.data.department.name;
          // arr[5].value = response.data.role.roleName;
          // arr[6].value = response.data.costcenter.name;
          // arr[7].value = response.data.doj;

            arr[0].value = response.data.name;
          arr[1].value = response.data.email;
          arr[2].value = response.data.empID;
          
          // arr[3].value = response.data.department.name;
          arr[3].value = response.data.role.roleName;
          arr[4].value = response.data.costcenter ? `${response.data.costcenter.number}_${response.data.costcenter.name}`
  : "N/A";
          arr[5].value = response.data.doj;

          setProfileData(arr);
        }
      })
      .catch((err) => {
        toast("Error Getting Profile Data");
        // console.log(err.response.data);
      });
  }, []);

  const handlePpUpload = async () => {
    const formData = new FormData();
    formData.append("profile_picture", selectedFile);

    try {
      const response = await toast.promise(
        axios.patch(
          `${process.env.REACT_APP_BE_URL}/user/profileupdate/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
          }
        ),
        {
          pending: "Updating Profile Picture..!",
          success: "Profile updated successfully",
        }
      );
      if (response.status === 200) {
        handleClosee();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error uploading profile picture..Please retry!", {
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
    }
  };

  const handleSubmit = async () => {
    try {
      const toastConfig = {
        position: "top-right",
        transition: Zoom,
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      };

      const response = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BE_URL}/user/changepassword/`,
          {
            password,
            password2,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
          }
        ),
        {
          pending: "Changing Password...",
        }
      );

      if (response.status === 200) {
        toast.success("Password Changed Successfully!", toastConfig);
        setTimeout(() => handleClose(), 1000);
      }
    } catch (error) {
      console.error("Password change error:", error);

      const toastConfig = {
        position: "top-right",
        transition: Zoom,
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      };

      if (error.response && error.response.data) {
        if (error.response.data.msg) {
          const errorMessages = error.response.data.msg;

          Object.keys(errorMessages).forEach((field) => {
            errorMessages[field].forEach((message) => {
              toast.error(message, toastConfig);
            });
          });
          return;
        }

        if (error.response.data.errors) {
          const errorMessages = error.response.data.errors;

          Object.keys(errorMessages).forEach((field) => {
            errorMessages[field].forEach((message) => {
              toast.error(message, toastConfig);
            });
          });
          return;
        }
      }

      toast.error("An unexpected error occurred!", toastConfig);
    }
  };

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [profileData, setProfileData] = useState([
    { icon: BiUserCircle, label: "Name", value: "" },
    { icon: AiOutlineMail, label: "Email", value: "" },
    { icon: TbNumbers, label: "Emp ID", value: "" },
    // { icon: VscOrganization, label: "Organization", value: "" },
    // { icon: VscOrganization, label: "Department", value: "" },
    { icon: VscOrganization, label: "Role", value: "" },
    { icon: VscOrganization, label: "Cost Center", value: "" },
    { icon: BsCalendar2DateFill, label: "Date of joining", value: "" },
  ]);

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100">
      <Dashboard />
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto pt-16 lg:pt-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-2">Profile</h1>
            <div className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full"></div>
          </div>

          {/* Profile Card Container */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden mb-6 sm:mb-8">
            {/* Profile Header Section */}
            <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-4 sm:p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <BiUserCircle className="text-blue-500 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                  </div>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{profileData[0]?.value || 'Loading...'}</h2>
                  <p className="text-blue-100 text-sm sm:text-base md:text-lg flex items-center justify-center md:justify-start gap-2">
                    <AiOutlineMail className="w-4 h-4 sm:w-5 sm:h-5" />
                    {profileData[1]?.value || 'Loading...'}
                  </p>
                  <p className="text-blue-100 text-sm sm:text-base mt-1 flex items-center justify-center md:justify-start gap-2">
                    <TbNumbers className="w-4 h-4 sm:w-5 sm:h-5" />
                    {profileData[2]?.value || 'Loading...'}
                  </p>
                </div>
                <button
                  className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-white text-blue-600 rounded-lg font-semibold shadow-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
                  onClick={() => setOpen1(true)}
                >
                  Change Picture
                </button>
              </div>
            </div>

            {/* Profile Details Grid */}
            <div className="p-4 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                <VscOrganization className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6" />
                Professional Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Organization */}
                {/* <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-blue-500 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <VscOrganization className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Organization</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-gray-900">{profileData[3]?.value || 'N/A'}</p>
                </div>/*}

                {/* Department */}
                {/* <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-sky-500 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <VscOrganization className="text-sky-600 w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Department</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-gray-900">{profileData[3]?.value || 'N/A'}</p>
                </div> */}

                {/* Role */}
                <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-indigo-500 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <VscOrganization className="text-indigo-600 w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Role</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-gray-900">{profileData[3]?.value || 'N/A'}</p>
                </div>

                {/* Cost Center */}
                <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-cyan-500 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <VscOrganization className="text-cyan-600 w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Cost Center</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-gray-900">{profileData[4]?.value || 'N/A'}</p>
                </div>

                {/* Date of Joining */}
                <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-teal-500 hover:shadow-md transition-all ">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <BsCalendar2DateFill className="text-teal-600 w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Date of Joining</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-gray-900">{profileData[5]?.value || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>







          {/* Change Password Button */}
          <div className="flex justify-center">
            <button
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200"
              onClick={handleOpen}
            >
              Change Password
            </button>
          </div>
        </div>
        {/* Change Password Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
                <p className="text-gray-500 mt-1">Enter your new password below</p>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter new password"
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Confirm new password"
                      onChange={e => setPassword2(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all shadow-md"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
          </Box>
        </Modal>

        {/* Profile Picture Modal */}
        <Modal
          open={open1}
          onClose={handleClosee}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BiUserCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Update Profile Picture</h2>
                <p className="text-gray-500 mt-1">Choose a new profile picture</p>
              </div>
              
              <div className="mb-6">
                <label className="block w-full">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-all cursor-pointer bg-gray-50 hover:bg-blue-50">
                    <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600 font-semibold">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG or GIF (MAX. 5MB)</p>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                </label>
                {selectedFile && (
                  <p className="mt-3 text-sm text-green-600 font-semibold text-center">
                    ✓ {selectedFile.name}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                  onClick={handleClosee}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-sky-400 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-sky-500 transform hover:scale-105 transition-all shadow-md"
                  onClick={() => handlePpUpload()}
                >
                  Update
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </main>
    </div>
  );
};

export default Userprofile;
