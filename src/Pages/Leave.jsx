// import React, { useState, useRef, useEffect } from 'react';
// import axios from "axios";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { FaCalendarAlt } from 'react-icons/fa';
// import Dashboard from './Dashboard';
// import { Radio } from 'antd';
// import { toast, ToastContainer, Zoom } from "react-toastify";
// import 'react-datepicker/dist/react-datepicker.css';

// const Leave1 = () => {
//   const [employeeName, setEmployeeName] = useState('');
//   const [employeeId, setEmployeeId] = useState('');
//   const [leaveType, setLeaveType] = useState('');
//   const [otherLeaveType, setOtherLeaveType] = useState('');
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
//   const [totalDays, setTotalDays] = useState('');
//   const [leaveReason, setLeaveReason] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const fromDateRef = useRef(null);
//   const toDateRef = useRef(null);
//   const [leaveHistory, setLeaveHistory] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [leaveBalance, setLeaveBalance] = useState(20);
//   const [fromDateSelection, setFromDateSelection] = useState('');
//   const [toDateSelection, setToDateSelection] = useState('');
//   const [fetchleaveapplication, setFetchLeaveapplication] = useState();
//   const [leaveapplication, setleaveapplication] = useState([]);
//   const [fromDateManual, setFromDateManual] = useState('');
//   const [toDateManual, setToDateManual] = useState('');

//   const [inputs, setInputs] = useState({
//     start_date: "",
//     start_half: "",
//     end_date: "",
//     end_half: "",
//     message: "",
//     leave_type: "",
//     approver: ""
//   });

//   const isFormValid = () => {
//     if (
//       leaveType.trim() === '' ||
//       (leaveType === 'Other' && otherLeaveType.trim() === '') ||
//       !fromDate ||
//       !toDate ||
//       totalDays === '' ||
//       leaveReason.trim() === '' ||
//       fromDateSelection === '' ||
//       toDateSelection === ''
//     ) {
//       return false;
//     }
//     return true;
//   };

//   const handleLeaveTypeChange = (e) => {
//     setLeaveType(e.target.value);
//   };

//   const handleOtherLeaveTypeChange = (e) => {
//     setOtherLeaveType(e.target.value);
//   };

// const handleFromDateChange = (e) => {
//   const selectedDate = new Date(e.target.value);
//   const currentDate = new Date();

//   if (selectedDate.getMonth() < currentDate.getMonth() || selectedDate.getFullYear() < currentDate.getFullYear()) {
//     alert('Please select a date from the current month or later.');
//     return;
//   }

//   setFromDate(selectedDate);
//   calculateTotalDays(selectedDate, toDate);
// };

// const handleToDateChange = (e) => {
//   const selectedDate = new Date(e.target.value);
//   const currentDate = new Date();

//   if (selectedDate.getMonth() < currentDate.getMonth() || selectedDate.getFullYear() < currentDate.getFullYear()) {
//     alert('Please select a date from the current month or later.');
//     return;
//   }

//   setToDate(selectedDate);
//   calculateTotalDays(fromDate, selectedDate);
// };

//   const calculateTotalDays = (fromDate, toDate) => {
//     if (fromDate && toDate) {
//       const differenceInTime = toDate.getTime() - fromDate.getTime();
//       const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;
//       setTotalDays(differenceInDays);
//     }
//   };

//   const handleLeaveReasonChange = (e) => {
//     setLeaveReason(e.target.value);
//   };

//   const openFromDateCalendar = () => {
//     fromDateRef.current.setOpen(true);
//   };

//   const openToDateCalendar = () => {
//     toDateRef.current.setOpen(true);
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!isFormValid()) {
//     toast.error("Please fill in all required fields.");
//     return;
//   }

//   const leaveTypeValue = leaveType === 'Other' ? otherLeaveType : leaveType;

//   const mapHalfDaySelection = (selection) => {
//     return selection === 'Half Day' ? 'first_half' : 'second_half';
//   };

//  const startDate = fromDate && !isNaN(new Date(fromDate))
//   ? new Date(fromDate).toISOString().split('T')[0]
//   : '';

// const endDate = toDate && !isNaN(new Date(toDate))
//   ? new Date(toDate).toISOString().split('T')[0]
//   : '';

//   const leaveData = {
//     start_date: startDate,
//     start_half: mapHalfDaySelection(fromDateSelection),
//     end_date: endDate,
//     end_half: mapHalfDaySelection(toDateSelection),
//     message: leaveReason,
//     leave_type: leaveTypeValue,
//     approver: " "
//   };

//   try {
//     const response = await axios.post(
//       `${process.env.REACT_APP_BE_URL}/tracker/leaveapplication/`,
//       leaveData,
//       {
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
//         }
//       }
//     );

//     if (response.status === 200 || response.status === 201) {
//       toast.success("Leave application submitted successfully");
//       setInputs({
//         start_date: "",
//         start_half: "",
//         end_date: "",
//         end_half: "",
//         message: "",
//         leave_type: "",
//         approver: ""
//       });
//       setLeaveType('');
//       setOtherLeaveType('');
//       setFromDate(null);
//       setToDate(null);
//       setTotalDays('');
//       setLeaveReason('');
//       setFromDateSelection('');
//       setToDateSelection('');
//       setSubmitted(false);
//     } else {
//       toast.error("Failed to submit leave application");
//     }
//   } catch (error) {
//     console.error("Error submitting leave application", error.response?.data || error.message);
//     toast.error(`Failed to submit leave application: ${error.response?.data?.message || error.message}`);
//   }
// };

//   useEffect(() => {
//     getAllLeaveApplications();
//   }, []);

//   const getAllLeaveApplications = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BE_URL}/tracker/leaveapplication/`,
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
//           }
//         }
//       );

//       if (response.status === 200) {
//         console.log("All Leave Applications:", response.data.msg);
//         setleaveapplication(response.data.msg);
//         console.log("All Leave Applications:", response.data);
//       } else {
//         toast.error("Failed to fetch leave leaveApplications");
//       }
//     } catch (error) {
//       console.error("Error fetching leave leaveApplications", error.response?.data || error.message);
//       toast.error(`Failed to fetch leave leaveApplications: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   const handleEditLeave = (index) => {
//     setEditIndex(index);
//     const selectedLeave = leaveHistory[index];
//     setEmployeeName(selectedLeave.employeeName);
//     setEmployeeId(selectedLeave.employeeId);
//     setLeaveType(selectedLeave.leaveType);
//     setOtherLeaveType(selectedLeave.leaveType === 'Other' ? selectedLeave.otherLeaveType : '');
//     setFromDate(parseDate(selectedLeave.fromDate));
//     setToDate(parseDate(selectedLeave.toDate));
//     setTotalDays(selectedLeave.totalDays);
//     setLeaveReason(selectedLeave.leaveReason);
//     setFromDateSelection(selectedLeave.fromDateSelection);
//     setToDateSelection(selectedLeave.toDateSelection);
//     setSubmitted(false);
//   };

//   const handleDeleteLeave = (index) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete this entry?");
//     if (isConfirmed) {
//       const updatedLeaveHistory = [...leaveHistory];
//       updatedLeaveHistory.splice(index, 1);
//       setLeaveHistory(updatedLeaveHistory);
//     }
//   };

//   const formatDate = (date) => {
//     if (!date) return '';
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const parseDate = (dateString) => {
//     const parts = dateString.split('/');
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1;
//     const year = parseInt(parts[2], 10);
//     return new Date(year, month, day);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Dashboard />
//       <main className="flex-1 p-6">
//         <h1 className="text-3xl font-bold text-center text-sky-500 mb-6">Leave Application Form</h1>
//         <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
//           <div className="grid grid-cols-2 gap-6">
// <div className="relative col-span-2 sm:col-span-1">
//   <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">
//     From Date*
//   </label>
//   <div className="flex items-center mt-1">
//     <input
//       type="date"
//       ref={fromDateRef}
//       selected={fromDate}
//       value={fromDate ? fromDate.toISOString().split('T')[0] : ''}
//       onChange={handleFromDateChange}
//       dateFormat="dd/MM/yyyy"
//       className="mt-1 block w-40 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//       placeholderText="Select or enter date"
//     />

//   </div>
//   <div className="mt-2">
//     <Radio.Group onChange={(e) => setFromDateSelection(e.target.value)} value={fromDateSelection}>
//       <Radio value="Half Day" className="text-gray-700">Half Day</Radio>
//       <Radio value="Full Day" className="text-gray-700">Full Day</Radio>
//     </Radio.Group>
//   </div>
// </div>

//             <div className="relative">
//               <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">
//                 To Date*
//               </label>
//               <div className="flex items-center mt-1">
//                 <input
//                   type="date"
//                   ref={toDateRef}
//                   selected={toDate}
//                   value={toDate ? toDate.toISOString().split('T')[0] : ''}
//                   onChange={handleToDateChange}
//                   dateFormat="dd/MM/yyyy"
//                   className="block w-40 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
//                   placeholderText="Select or enter date"
//                 />

//               </div>
//               <div className="mt-2">
//                 <Radio.Group onChange={(e) => setToDateSelection(e.target.value)} value={toDateSelection}>
//                   <Radio value="Half Day" className="text-gray-700">Half Day</Radio>
//                   <Radio value="Full Day" className="text-gray-700">Full Day</Radio>
//                 </Radio.Group>
//               </div>
//             </div>
//           </div>

//           <div>
//             <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">
//               Leave Type*
//             </label>
//             <select
//               id="leaveType"
//               value={leaveType}
//               onChange={handleLeaveTypeChange}
//               className="mt-1 block w-max border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
//             >
//               <option value="">Select leave type</option>
//               <option value="paid_leave">Paid leave</option>
//               <option value="loss_of_paid_leave">Loss of paid leave</option>
//             </select>
//             {leaveType === 'Other' && (
//               <input
//                 type="text"
//                 id="otherLeaveType"
//                 value={otherLeaveType}
//                 onChange={handleOtherLeaveTypeChange}
//                 placeholder="Please specify"
//                 className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
//               />
//             )}
//           </div>

//           <div>
//             <label htmlFor="leaveReason" className="block text-sm font-medium text-gray-700">
//               Leave Reason*
//             </label>
//             <textarea
//               id="leaveReason"
//               value={leaveReason}
//               onChange={handleLeaveReasonChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
//               rows="4"
//             ></textarea>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-max inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:bg-indigo-800 transition duration-200 ease-in-out"
//             >
//               <span className="mr-2 w-max">Submit</span>
//             </button>
//           </div>
//         </form>
//         <div class="leave-applications-table container mx-auto p-6">
//           <h2 class="text-2xl font-bold text-center text-sky-500 mb-5">Leave Applications</h2>
//           <div class="overflow-x-auto bg-white shadow-md rounded-lg">
//             <table class="min-w-full table-auto">
//               <thead class="bg-sky-400 text-white">
//                 <tr>
//                   <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
//                   <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Start Date</th>
//                   <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Start Half</th>
//                   <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">End Date</th>
//                   <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">End Half</th>
//                   <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Message</th>
//                   <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
//                   <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Applied Date</th>
//                 </tr>
//               </thead>
//               <tbody class="bg-white divide-y divide-gray-200">
//                 {leaveapplication.length > 0 ? (
//                   leaveapplication.map((leaveapplication) => (
//                     <tr key={leaveapplication.id} class="hover:bg-gray-50">
//                       <td class="px-4 py-4 whitespace-nowrap">{leaveapplication.id}</td>
//                       <td class="px-4 py-4 whitespace-nowrap">{leaveapplication.start_date}</td>
//                       <td class="px-4 py-4 whitespace-nowrap">{leaveapplication.start_half}</td>
//                       <td class="px-4 py-4 whitespace-nowrap">{leaveapplication.end_date}</td>
//                       <td class="px-4 py-4 whitespace-nowrap">{leaveapplication.end_half}</td>
//                       <td class="px-4 py-4">{leaveapplication.message}</td>
//                       <td class="px-4 py-4 whitespace-nowrap">{leaveapplication.status}</td>
//                       <td class="px-4 py-4 whitespace-nowrap">{new Date(leaveapplication.applied_date).toLocaleString()}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colspan="8" class="px-4 py-4 text-center text-gray-500">No leave applications found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <ToastContainer transition={Zoom} />
//       </main>
//     </div>
//   );
// };

// export default Leave1;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCalendarAlt,
  FaClipboardList,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";
import Dashboard from "./Dashboard";
import { Radio } from "antd";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegCalendarAlt } from "react-icons/fa";

const Leave1 = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [otherLeaveType, setOtherLeaveType] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [totalDays, setTotalDays] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [leaveBalance, setLeaveBalance] = useState(20);
  const [fromDateSelection, setFromDateSelection] = useState("");
  const [toDateSelection, setToDateSelection] = useState("");
  const [leaveapplication, setleaveapplication] = useState([]);
  const [activeTab, setActiveTab] = useState("form");
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = () => {
    if (
      leaveType.trim() === "" ||
      (leaveType === "Other" && otherLeaveType.trim() === "") ||
      !fromDate ||
      !toDate ||
      leaveReason.trim() === "" ||
      fromDateSelection === "" ||
      toDateSelection === ""
    ) {
      return false;
    }
    return true;
  };

  const handleLeaveTypeChange = (e) => {
    setLeaveType(e.target.value);
  };

  const handleOtherLeaveTypeChange = (e) => {
    setOtherLeaveType(e.target.value);
  };

  const handleFromDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (
      selectedDate.getMonth() < currentDate.getMonth() ||
      selectedDate.getFullYear() < currentDate.getFullYear()
    ) {
      alert("Please select a date from the current month or later.");
      return;
    }

    setFromDate(selectedDate);
    calculateTotalDays(selectedDate, toDate);
  };

  const handleToDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (
      selectedDate.getMonth() < currentDate.getMonth() ||
      selectedDate.getFullYear() < currentDate.getFullYear()
    ) {
      alert("Please select a date from the current month or later.");
      return;
    }

    setToDate(selectedDate);
    calculateTotalDays(fromDate, selectedDate);
  };

  const calculateTotalDays = (fromDate, toDate) => {
    if (fromDate && toDate) {
      const differenceInTime = toDate.getTime() - fromDate.getTime();
      const differenceInDays =
        Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;
      setTotalDays(differenceInDays);
    }
  };

  const handleLeaveReasonChange = (e) => {
    setLeaveReason(e.target.value);
  };

  const openFromDateCalendar = () => {
    if (fromDateRef.current) {
      fromDateRef.current.setOpen(true);
    }
  };

  const openToDateCalendar = () => {
    if (toDateRef.current) {
      toDateRef.current.setOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    const leaveTypeValue = leaveType === "Other" ? otherLeaveType : leaveType;

    const mapHalfDaySelection = (selection) => {
      return selection === "Half Day" ? "first_half" : "second_half";
    };

    const leaveData = {
      start_date: fromDate ? fromDate.toISOString().split("T")[0] : "",
      start_half: mapHalfDaySelection(fromDateSelection),
      end_date: toDate ? toDate.toISOString().split("T")[0] : "",
      end_half: mapHalfDaySelection(toDateSelection),
      message: leaveReason,
      leave_type: leaveTypeValue,
      approver: " ",
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}/tracker/leaveapplication/`,
        leaveData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Leave application submitted successfully");
        resetForm();
        getAllLeaveApplications();
        setActiveTab("applications");
      } else {
        toast.error("Failed to submit leave application");
      }
    } catch (error) {
      console.error(
        "Error submitting leave application",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to submit leave application: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setLeaveType("");
    setOtherLeaveType("");
    setFromDate(null);
    setToDate(null);
    setTotalDays("");
    setLeaveReason("");
    setFromDateSelection("");
    setToDateSelection("");
    setSubmitted(false);
  };

  useEffect(() => {
    getAllLeaveApplications();
  }, []);

  const getAllLeaveApplications = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_URL}/tracker/leaveapplication/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setleaveapplication(response.data.msg || []);
      } else {
        toast.error("Failed to fetch leave applications");
      }
    } catch (error) {
      console.error(
        "Error fetching leave applications",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to fetch leave applications: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      <Dashboard />
      <main className="flex-1 overflow-auto pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Leave Management
            </h1>
            <div className="flex space-x-1 w-full sm:w-auto">
              <button
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg font-medium transition-all ${
                  activeTab === "form"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("form")}
              >
                Apply for Leave
              </button>
              <button
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg font-medium transition-all ${
                  activeTab === "applications"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("applications")}
              >
                Leave Applications
              </button>
            </div>
          </div>

          {activeTab === "form" && (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="border-b border-gray-200 p-4 sm:p-6 bg-gradient-to-r from-indigo-50 to-blue-50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 sm:p-3 rounded-full bg-indigo-100 text-indigo-600">
                    <FaUser className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Leave Application Form
                    </h2>
                    <p className="text-sm text-gray-500">
                      Fill in the details to apply for leave
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      Leave Balance: {leaveBalance} days
                    </div>
                  </div>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow space-y-8"
              >
               
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
     
                  <div className="relative col-span-2 sm:col-span-1">
                    <label
                      htmlFor="fromDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      From Date*
                    </label>
                    <div className="flex items-center mt-1">
                      <input
                        type="date"
                        ref={fromDateRef}
                        selected={fromDate}
                        value={
                          fromDate ? fromDate.toISOString().split("T")[0] : ""
                        }
                        onChange={handleFromDateChange}
                        dateFormat="dd/MM/yyyy"
                        className="mt-1 block w-40 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholderText="Select or enter date"
                      />
                    </div>
                    <div className="mt-2">
                      <Radio.Group
                        onChange={(e) => setFromDateSelection(e.target.value)}
                        value={fromDateSelection}
                      >
                        <Radio value="Half Day" className="text-gray-700">
                          Half Day
                        </Radio>
                        <Radio value="Full Day" className="text-gray-700">
                          Full Day
                        </Radio>
                      </Radio.Group>
                    </div>
                  </div>

              
                  <div className="relative">
                    <label
                      htmlFor="toDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      To Date*
                    </label>
                    <div className="flex items-center mt-1">
                      <input
                        type="date"
                        ref={toDateRef}
                        selected={toDate}
                        value={toDate ? toDate.toISOString().split("T")[0] : ""}
                        onChange={handleToDateChange}
                        dateFormat="dd/MM/yyyy"
                        className="block w-40 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                        placeholderText="Select or enter date"
                      />
                    </div>
                    <div className="mt-2">
                      <Radio.Group
                        onChange={(e) => setToDateSelection(e.target.value)}
                        value={toDateSelection}
                      >
                        <Radio value="Half Day" className="text-gray-700">
                          Half Day
                        </Radio>
                        <Radio value="Full Day" className="text-gray-700">
                          Full Day
                        </Radio>
                      </Radio.Group>
                    </div>
                  </div>
                </div>

               
                {totalDays > 0 && (
                  <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-3 rounded-lg">
                    Leave Duration: <strong>{totalDays}</strong>{" "}
                    {totalDays === 1 ? "day" : "days"}
                  </div>
                )}

           
                <div>
                  <label
                    htmlFor="leaveType"
                    className="block text-sm font-semibold text-gray-800 mb-1"
                  >
                    Leave Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="leaveType"
                    value={leaveType}
                    onChange={handleLeaveTypeChange}
                    className="w-full mt-1 py-2 px-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Select leave type</option>
                    <option value="paid_leave">Paid leave</option>
                    <option value="loss_of_paid_leave">
                      Loss of paid leave
                    </option>
                    <option value="Other">Other</option>
                  </select>

                  {leaveType === "Other" && (
                    <input
                      type="text"
                      value={otherLeaveType}
                      onChange={handleOtherLeaveTypeChange}
                      placeholder="Please specify leave type"
                      className="w-full mt-3 py-2 px-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:outline-none"
                    />
                  )}
                </div>

                <div>
                  <label
                    htmlFor="leaveReason"
                    className="block text-sm font-semibold text-gray-800 mb-1"
                  >
                    Leave Reason <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="leaveReason"
                    value={leaveReason}
                    onChange={handleLeaveReasonChange}
                    rows="4"
                    placeholder="Provide a reason for your leave request"
                    className="w-full mt-1 py-2 px-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:outline-none"
                  ></textarea>
                </div>

        
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2 rounded-md border text-gray-600 bg-white hover:bg-gray-100 focus:ring-2 focus:ring-indigo-300"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "applications" && (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-indigo-50 to-blue-50">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                    <FaClipboardList className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Leave Applications
                    </h2>
                    <p className="text-sm text-gray-500">
                      View all your leave applications and their status
                    </p>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center p-12">
                  <svg
                    className="animate-spin h-8 w-8 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Start Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Start Half
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          End Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          End Half
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Message
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Applied Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {leaveapplication.length > 0 ? (
                        leaveapplication.map((application) => (
                          <tr
                            key={application.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {application.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(application.start_date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {application.start_half === "first_half"
                                ? "Half Day"
                                : "Full Day"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(application.end_date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {application.end_half === "first_half"
                                ? "Half Day"
                                : "Full Day"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                              {application.message}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                  application.status
                                )}`}
                              >
                                {application.status || "Pending"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {application.applied_date
                                ? new Date(
                                    application.applied_date
                                  ).toLocaleString()
                                : ""}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="8"
                            className="px-6 py-12 text-center text-gray-500"
                          >
                            <div className="flex flex-col items-center">
                              <svg
                                className="h-12 w-12 text-gray-400 mb-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <p className="text-lg font-medium text-gray-900">
                                No leave applications found
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                Your leave application history will appear here
                              </p>
                              <button
                                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                                onClick={() => setActiveTab("form")}
                              >
                                Apply for Leave
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Zoom}
        />
      </main>
    </div>
  );
};

export default Leave1;
