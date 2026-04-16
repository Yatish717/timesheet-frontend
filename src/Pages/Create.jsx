import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { toast, Zoom,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
// import {ExpandMore} from '@mui/icons-material';
import { ExpandMore } from "@mui/icons-material";

const Create1 = () => {
  const [value, setValue] = useState("1");
  const [users, setUsers] = useState([]);
  const [costcenter, setCostcenter] = useState([]);
  const [department, setDepartment] = useState({});
  const [role, setRole] = useState({});
  const [companycode, setCompanycode] = useState({});
  const [org, setOrganization] = useState({});
  const [branch, setOfficebranch] = useState([]);
  const [companyCodes, setCompanyCodes] = useState({});
const [employees, setEmployees] = useState([]);
const [projects, setProjects] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [managers, setManagers] = useState([]);
  // const [projects, setProjects] = useState([]);
  // const [subProjects, setSubProjects] = useState([]);
  // const [allProCompData, setAllProCompData] = useState([]);
  // const [inputs, setInputs] = useState({
  //   projectname: "",
  //   projectcode: "",
  //   organization: "",
  //   managername: "",
  //   projectsubcode: "",
  //   activitycode: "",
  // });

 
  const [inputs, setInputs] = useState({
    "name": "",
    "number": "",
    "description": "",
    "companyCode": "",
 
  });

  const [inputs1, setInputs1] = useState({
    "name": " ",
    "description": " "
  });

  const [inputs2, setInputs2] = useState({
    "roleName": " ",
    "description": " "
  });

  const [inputs3, setInputs3] = useState({
    "code": "  ",
    "description": " "
  });

  const [inputs4, setInputs4] = useState({
    "name": " ",
  });

  const [inputs5, setInputs5] = useState({
    "location": " ",
    "description": " "
  });

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    // if (newValue === "2") {
    //   try {
    //     const response = await toast.promise(
    //       axios.get(`${process.env.REACT_APP_BE_URL}/user/costcenter/`, {
    //         headers: {
    //           Accept: "application/json",
    //           Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
    //         },
    //       }),
    //       {
    //         pending: "Getting costcenters...!",
    //       }
    //     );

    //     if (response.status === 200) {
    //       setProjects(response.data.msg);
    //     }
    //   } catch (error) {
    //     toast.error("Error retriving costcenter!", {
    //       position: "top-right",
    //       transition: Zoom,
    //       autoClose: 2500,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //     console.log(error);
    //   }
    // } else if (newValue === "3") {
    //   try {
    //     const response = await toast.promise(
    //       axios.get(`${process.env.REACT_APP_BE_URL}/project/detail/`, {
    //         headers: {
    //           Accept: "application/json",
    //           Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
    //         },
    //       }),
    //       {
    //         pending: "Getting subprojects...!",
    //       }
    //     );

    //     if (response.status === 200) {
    //       setSubProjects(response.data.msg);
    //     }
    //   } catch (error) {
    //     toast.error("Error retriving subprojects!", {
    //       position: "top-right",
    //       transition: Zoom,
    //       autoClose: 2500,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //     console.log(error);
    //   }
    // }
  };

  const fetchCompanyCodes = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}/user/companycode/`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
        }
      }
    );

    if (response.status === 200) {
      setCompanyCodes(response.data.msg);
    }

  } catch (error) {
    console.log(error);
  }
};

const fetchEmployees = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}/user/allprofile/`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
        }
      }
    );

    if (response.status === 200) {
      setEmployees(response.data.msg);
    }

  } catch (error) {
    console.log(error);
  }
};


// const fetchProjects = async () => {
//   try {
//     const response = await axios.get(
//       `${process.env.REACT_APP_BE_URL}/user/project/`,
//       {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
//         }
//       }
//     );

//     if (response.status === 200) {
//       setProjects(response.data.msg);
//     }

//   } catch (error) {
//     console.log(error);
//   }
// };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setInputs1({
      ...inputs1,
      [name]: value,
    });
  };

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setInputs2({
      ...inputs2,
      [name]: value,
    });
  };

  const handleInputChange3 = (e) => {
    const { name, value } = e.target;
    setInputs3({
      ...inputs3,
      [name]: value,
    });
  };

  const handleInputChange4 = (e) => {
    const { name, value } = e.target;
    setInputs4({
      ...inputs4,
      [name]: value,
    });
  };

  const handleInputChange5 = (e) => {
    const { name, value } = e.target;
    setInputs5({
      ...inputs5,
      [name]: value,
    });
  };



  const handleUploadClick = () => {
    if (value === "1") {
      createCostcenter();
    }
    // else if (value === "2") {
    //   createDepartment();
    // }
    else if (value === "3") {
      createRole();
    }
    else if (value === "4") {
      createCompanycode();
    }
    // else if (value === "5") {
    //   createOrganization();
    // }
    else if (value === "6") {
      createOfficebranch();
    }

  };


  useEffect(() => {
    fetchCostcenter();
    fetchCompanyCodes();
  fetchEmployees();
  // fetchProjects();
  }, []);

  const fetchCostcenter = async () => {
      try {
        const response = await 
          axios.get(`${process.env.REACT_APP_BE_URL}/user/costcenter/`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
            },
          });
         

        if (response.status === 200) {
          setCostcenter(response.data.msg);
          // alert("got")
        }
      } catch (error) {
        toast.error("Error retrieving Costcenter data!", {
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

const createCostcenter = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BE_URL}/user/costcenter/`,
      {
        name: inputs.name,
        number: inputs.number,
        description: inputs.description,
        company_code: Number(inputs.companyCode)
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      }
    );
    if (response.status === 201 || response.status === 200) {
      toast.success("Costcenter created successfully");
      setInputs({
        name: "",
        number: "",
        description: "",
      });
      
      if (typeof fetchCostcenter === "function") {
        fetchCostcenter();
      }
    } else {
      toast.error("Failed to create costcenter");
    }
  } catch (error) {
    console.error("Error creating costcenter", error);
    toast.error("Failed to create costcenter");
  }
};

  // useEffect(() => {
  //   fetchDepartment();
  // }, []);
  // const fetchDepartment = async () => {
  //     try {
  //       const response = await 
  //         axios.get(`${process.env.REACT_APP_BE_URL}/user/department/`, {
  //           headers: {
  //             Accept: "application/json",
  //             Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
  //           },
  //         });


  //       if (response.status === 200) {
  //         setDepartment(response.data.msg);
  //         // alert("got")
  //       }
  //     } catch (error) {
  //       toast.error("Error retrieving Department data!", {
  //         position: "top-right",
  //         transition: Zoom,
  //         autoClose: 2500,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       // console.log(error);
  //     }
  //   };

  const createDepartment = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BE_URL}/user/department/`, {
        name: inputs1.name,
        description: inputs1.description,

      }, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
        }
      });
      if (response) toast.success("Department created successfully");
      setInputs1({
        name: "",
        description: ""
      });
      // fetchDepartment();
    } catch (error) {
      console.error("Error creating Department", error);
      toast.error("Failed to create Department");
    }
  };


  useEffect(() => {
    fetchRole();
  }, []);

  const fetchRole = async () => {
      try {
        const response = await 
          axios.get(`${process.env.REACT_APP_BE_URL}/user/role/`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
            },
          });
        

        if (response.status === 200) {
          setRole(response.data.msg);
          // alert("got")
        }
      } catch (error) {
        toast.error("Error retrieving Role data!", {
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


  const createRole = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BE_URL}/user/role/`, {
        roleName: inputs2.roleName,
        description: inputs2.description,

      }, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
        }
      });
      if (response) toast.success("Role created successfully");
      setInputs2({
        roleName: "",
        description: ""
      });
      fetchRole();
    } catch (error) {
      console.error("Error creating Role", error);
      toast.error("Failed to create Role");
    }
  };

  useEffect(() => {
    fetchCompanycode();
  }, []);

  const fetchCompanycode = async () => {
      try {
        const response = await 
          axios.get(`${process.env.REACT_APP_BE_URL}/user/companycode/`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
            },
          });
         

        if (response.status === 200) {
          setCompanycode(response.data.msg);
          // alert("got")
        }
      } catch (error) {
        toast.error("Error retrieving Role data!", {
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

  const createCompanycode = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BE_URL}/user/companycode/`, {
        code: inputs3.code,
        description: inputs3.description,

      }, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
        }
      });
      if (response) toast.success("companycode created successfully");
      setInputs3({
        code: "",
        description: ""
      });
      fetchCompanycode();
    } catch (error) {
      console.error("Error creating companycode", error);
      toast.error("Failed to create companycode");
    }
  };

  // const createOrganization = async () => {
  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_BE_URL}/user/org/`, {
  //       name: inputs4.name,

  //     }, {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
  //       }
  //     });
  //     if (response) toast.success("Organization created successfully");
  //     setInputs4({
  //       name: "",
  //     });
  //     fetchOrganization();
  //   } catch (error) {
  //     console.error("Error creating Organization", error);
  //     toast.error("Failed to create Organization");
  //   }
  // };

  // useEffect(() => {
  //   fetchOrganization();
  // }, []);

  //  const fetchOrganization = async () => {
  //     try {
  //       const response = await toast.promise(
  //         axios.get(`${process.env.REACT_APP_BE_URL}/user/org/`, {
  //           headers: {
  //             Accept: "application/json",
  //             Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
  //           },
  //         }),
  //         {
  //           pending: "Getting Role Data..!",
  //         }
  //       );

  //       if (response.status === 200) {
  //         setOrganization(response.data.msg);
  //         // alert("got")
  //       }
  //     } catch (error) {
  //       toast.error("Error retrieving Role data!", {
  //         position: "top-right",
  //         transition: Zoom,
  //         autoClose: 2500,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       // console.log(error);
  //     }
  //   };

  const createOfficebranch = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BE_URL}/user/branch/`, {
        location: inputs5.location,
        description: inputs5.description,

      }, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
        }
      });
      if (response) toast.success("Branch created successfully");
      setInputs4({
        name: "",
      });
      fetchOfficebranch();
    } catch (error) {
      console.error("Error creating Branch", error);
      toast.error("Failed to create Branch");
    }
  };

  useEffect(() => {
    fetchOfficebranch();
  }, []);

  const fetchOfficebranch = async () => {
      try {
        const response = await 
          axios.get(`${process.env.REACT_APP_BE_URL}/user/branch/`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
            },
          });
        

        if (response.status === 200) {
          setOfficebranch(response.data.msg);
          // alert("got")
        }
      } catch (error) {
        toast.error("Error retrieving Role data!", {
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



  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <Dashboard />
      <main className="flex-1 p-3 sm:p-4 md:p-6 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 overflow-auto pt-16 lg:pt-6">
        {/* Header Card */}
        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl mb-4 sm:mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-4 sm:p-5 md:p-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Account
            </h1>
            {/* <p className="text-blue-100 text-xs sm:text-sm mt-1 sm:mt-2">Create and manage system accounts, departments, and roles</p> */}
          <p className="text-blue-100 text-xs sm:text-sm mt-1 sm:mt-2">Create and manage system accounts, and roles</p>
          </div>

          {/* Tabs Section */}
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
                <TabList 
                  onChange={handleChange} 
                  aria-label="account tabs"
                  sx={{
                    '& .MuiTab-root': {
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      textTransform: 'none',
                      color: '#64748b',
                      '&.Mui-selected': {
                        color: '#3b82f6',
                      }
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#3b82f6',
                      height: 3,
                    }
                  }}
                >
                  <Tab label="Costcenter" value="1" />
                  {/* <Tab label="Department" value="2" /> */}
                  <Tab label="Role" value="3" />
                  <Tab label="CompanyCode" value="4" />
                  {/* <Tab label="Organization" value="5" /> */}
                  <Tab label="Office Branch" value="6" />
                </TabList>
              </Box>

              {/* Tab Panel 1: Costcenter */}
              <TabPanel value="1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Costcenter Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={inputs.name}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter costcenter name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Costcenter Number
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={inputs.number}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter number"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={inputs.description}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Brief description"
                    />
                  </div>
                  <div>
<label className="block text-gray-700 font-semibold mb-2 text-sm">
Company Code
</label>

<select
name="companyCode"
value={inputs.companyCode}
onChange={handleInputChange}
className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4"
>

<option value="">Select Company Code</option>

{Object.entries(companyCodes).map(([id, code]) => (
<option key={id} value={id}>
{code}
</option>
))}

</select>
</div>
                </div>
                <div className="flex justify-end mb-8">
                  <button
                    onClick={handleUploadClick}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create
                  </button>
                </div>

                {/* Cost Centers Table */}
                <div className="bg-gradient-to-r from-blue-500 to-sky-400 rounded-t-xl p-4">
                  <h2 className="text-xl font-bold text-white text-center">Cost Centers</h2>
                </div>
                {costcenter.length > 0 ? (
                  <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-96">
                      <table className="min-w-full">
                        <thead className="bg-gradient-to-r from-gray-100 to-gray-200 sticky top-0 z-10">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Number</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
  {costcenter.map((item, index) => (
    <tr key={index} className="hover:bg-blue-50 transition-colors">
      <td className="px-6 py-4">{item.name}</td>
      <td className="px-6 py-4">{item.number}</td>
    </tr>
  ))}
</tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-b-xl shadow-lg p-8 text-center">
                    <p className="text-gray-400 text-lg">No cost centers found.</p>
                  </div>
                )}
              </TabPanel>

              {/* Tab Panel 2: Department */}
              {/* <TabPanel value="2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Department Name
                    </label>
                    <input
                      name="name"
                      value={inputs1.name}
                      onChange={handleInputChange1}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter department name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={inputs1.description}
                      onChange={handleInputChange1}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Brief description"
                    />
                  </div>
                </div>
                <div className="flex justify-end mb-8">
                  <button
                    onClick={handleUploadClick}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create
                  </button>
                </div> */}

                {/* Departments Table */}
                {/* <div className="bg-gradient-to-r from-blue-500 to-sky-400 rounded-t-xl p-4">
                  <h2 className="text-xl font-bold text-white text-center">Departments</h2>
                </div>
                {department && Object.entries(department).length > 0 ? (
                  <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-96">
                      <table className="min-w-full">
                        <thead className="bg-gradient-to-r from-gray-100 to-gray-200 sticky top-0 z-10">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Department Name</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {Object.entries(department).map(([key, value]) => (
                            <tr key={key} className="hover:bg-blue-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-b-xl shadow-lg p-8 text-center">
                    <p className="text-gray-400 text-lg">No departments found.</p>
                  </div>
                )}
              </TabPanel> */}

              {/* Tab Panel 3: Role */}
              <TabPanel value="3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Role Name
                    </label>
                    <input
                      name="roleName"
                      value={inputs2.roleName}
                      onChange={(e) => handleInputChange2(e)}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter role name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={inputs2.description}
                      onChange={(e) => handleInputChange2(e)}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                      rows="1"
                      placeholder="Brief description"
                    />
                  </div>
                </div>
                <div className="flex justify-end mb-8">
                  <button
                    onClick={handleUploadClick}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create
                  </button>
                </div>

                {/* Roles Table */}
                <div className="bg-gradient-to-r from-blue-500 to-sky-400 rounded-t-xl p-4">
                  <h2 className="text-xl font-bold text-white text-center">Roles</h2>
                </div>
                {role && Object.entries(role).length > 0 ? (
                  <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-96">
                      <table className="min-w-full">
                        <thead className="bg-gradient-to-r from-gray-100 to-gray-200 sticky top-0 z-10">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Role Name</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {Object.entries(role).map((roleName) => (
                            <tr key={roleName} className="hover:bg-blue-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{roleName?.[1]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-b-xl shadow-lg p-8 text-center">
                    <p className="text-gray-400 text-lg">No roles found.</p>
                  </div>
                )}
              </TabPanel>

              {/* Tab Panel 4: CompanyCode */}
              <TabPanel value="4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Company Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={inputs3.code}
                      onChange={(e) => handleInputChange3(e)}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter company code"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={inputs3.description}
                      onChange={(e) => handleInputChange3(e)}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                      rows="1"
                      placeholder="Brief description"
                    />
                  </div>
                </div>
                <div className="flex justify-end mb-8">
                  <button
                    onClick={handleUploadClick}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create
                  </button>
                </div>

                {/* Company Codes Table */}
                <div className="bg-gradient-to-r from-blue-500 to-sky-400 rounded-t-xl p-4">
                  <h2 className="text-xl font-bold text-white text-center">Company Codes</h2>
                </div>
                {companycode && Object.entries(companycode).length > 0 ? (
                  <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-96">
                      <table className="min-w-full">
                        <thead className="bg-gradient-to-r from-gray-100 to-gray-200 sticky top-0 z-10">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Code</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {Object.entries(companycode).map((code) => (
                            <tr key={code} className="hover:bg-blue-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{code?.[1]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-b-xl shadow-lg p-8 text-center">
                    <p className="text-gray-400 text-lg">No company codes found.</p>
                  </div>
                )}
              </TabPanel>

              {/* Tab Panel 5: Organization */}
              {/* <TabPanel value="5">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={inputs4.name}
                      onChange={handleInputChange4}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter organization name"
                    />
                  </div>
                </div>
                <div className="flex justify-end mb-8">
                  <button
                    onClick={handleUploadClick}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create
                  </button>
                </div> */}

                {/* Organizations Table */}
                {/* <div className="bg-gradient-to-r from-blue-500 to-sky-400 rounded-t-xl p-4">
                  <h2 className="text-xl font-bold text-white text-center">Organizations</h2>
                </div>
                {org && Object.entries(org).length > 0 ? (
                  <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-96">
                      <table className="min-w-full">
                        <thead className="bg-gradient-to-r from-gray-100 to-gray-200 sticky top-0 z-10">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Organization</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {Object.entries(org).map((name) => (
                            <tr key={name} className="hover:bg-blue-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{name?.[1]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-b-xl shadow-lg p-8 text-center">
                    <p className="text-gray-400 text-lg">No organizations found.</p>
                  </div>
                )}
              </TabPanel> */}

              {/* Tab Panel 6: Office Branch */}
              <TabPanel value="6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Office Branch
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={inputs5.location}
                      onChange={handleInputChange5}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter branch location"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={inputs5.description}
                      onChange={handleInputChange5}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                      rows="1"
                      placeholder="Brief description"
                    />
                  </div>
                </div>
                <div className="flex justify-end mb-8">
                  <button
                    onClick={handleUploadClick}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create
                  </button>
                </div>

                {/* Office Branches Table */}
                <div className="bg-gradient-to-r from-blue-500 to-sky-400 rounded-t-xl p-4">
                  <h2 className="text-xl font-bold text-white text-center">Office Branches</h2>
                </div>
                {branch && Object.entries(branch).length > 0 ? (
                  <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-96">
                      <table className="min-w-full">
                        <thead className="bg-gradient-to-r from-gray-100 to-gray-200 sticky top-0 z-10">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Branch</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {Object.entries(branch).map((name) => (
                            <tr key={name} className="hover:bg-blue-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{name?.[1]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-b-xl shadow-lg p-8 text-center">
                    <p className="text-gray-400 text-lg">No office branches found.</p>
                  </div>
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Create1;