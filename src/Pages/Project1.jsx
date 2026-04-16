import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
// import {ExpandMore} from '@mui/icons-material';
import { ExpandMore } from "@mui/icons-material";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Project1 = () => {
  const [value, setValue] = useState("1");
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [subProjects, setSubProjects] = useState([]);
  const [allProCompData, setAllProCompData] = useState([]);
  const [costCenters, setCostCenters] = useState([]);
  // const [inputs, setInputs] = useState({
  //   projectname: "",
  //   projectcode: "",
  //   organization: "",
  //   managername: "",
  //   projectsubcode: "",
  //   activitycode: "",
  // });

  const [inputs, setInputs] = useState({
    projectName: "",
    projectCode: "",
    // organization: "",
    projectManager: "",
    costCenter: ""
  });

  const [inputs1, setInputs1] = useState({
    project: "",
    projectSubcode: "",
    description: ""
  });

  const [inputs2, setInputs2] = useState({
    projectsubcode: "",
    name: "",
    activityCode: "",
    description: ""
  });

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    if (newValue === "2") {
      try {
        const response = await 
          axios.get(`${process.env.REACT_APP_BE_URL}/project/getprojectname/`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
            },
          });
        

        if (response.status === 200) {
          setProjects(response.data.msg);
        }
      } catch (error) {
        toast.error("Error retriving projects!", {
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
    } else if (newValue === "3") {
      try {
        const response = await 
          axios.get(`${process.env.REACT_APP_BE_URL}/project/detail/`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
            },
          });
        

        if (response.status === 200) {
          setSubProjects(response.data.msg);
        }
      } catch (error) {
        toast.error("Error retriving subprojects!", {
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
       [name]: value.toString(),
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

  const handleUploadClick = () => {
    if (value === "1") {
      createProject();
    } else if (value === "2") {
      createProjectSubcode();
    } else if (value === "3") {
      createSubcodeActivity();
    }
    fetchProData();
  };

  const handleSubmitClick = () => {
    // setUsers([...users, inputs]);
    // setInputs({
    //   projectname: "",
    //   projectcode: "",
    //   organization: "",
    //   managername: "",
    //   projectsubcode: "",
    //   activitycode: "",
    // });

    // try {
    //   const response = toast.promise(
    //     axios.post("${process.env.REACT_APP_BE_URL}/project/createproject/", inputs, {
    //       headers: {
    //         Accept: "application/json",
    //         Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
    //       },
    //     }),
    //     {
    //       pending: "Creating Project...!",
    //       // success: "Yes you got your ticket...Redirecting",
    //     }
    //   );

    //   if (response.status === 200) {
    //     toast.success("Created");
    //   }
    // } catch (error) {
    //   toast.error("Error Creating Project!", {
    //     position: "top-right",
    //     transition: Zoom,
    //     autoClose: 2500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   console.log(error);
    // }
    console.log(inputs);
    axios.post(`${process.env.REACT_APP_BE_URL}/project/createproject/`, inputs, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
      }
    })

      .then((response) => {
        console.log(response);
        toast.success("Project Created");
      })

      .catch(err => {
        toast.error("Error Creating Project");
      })
  };

  const createProject = async () => {

    try {
      const response = await axios.post(`${process.env.REACT_APP_BE_URL}/project/createproject/`, {
        
        projectName: inputs.projectName,
        projectCode: inputs.projectCode,
        // organization: inputs.organization,
        projectManager: inputs.projectManager,
        costCenter: inputs.costCenter
      },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          }
        });
      if (response) toast.success("Project created successfully");
      setInputs({
        projectName: "",
        projectCode: "",
        // organization: "",
        projectManager: "",
         costCenter: ""
      });
    } catch (error) {
      console.error("Error creating project", error);
      toast.error("Failed to create project");
    }
    fetchProData();
  };

  const createProjectSubcode = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BE_URL}/project/storesubcode/`, {
        project: inputs1.project,
        projectSubcode: inputs1.projectSubcode,
        description: inputs1.description,
      }, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
        }
      });
      if (response) toast.success("Project subcode created successfully");
      setInputs1({
        project: "",
        projectSubcode: "",
        description: ""
      });
    } catch (error) {
      console.error("Error creating project subcode", error);
      toast.error("Failed to create project subcode");
    }
    fetchProData();
  };

  const createSubcodeActivity = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BE_URL}/project/subcodeactivity/`, {
        projectsubcode: inputs2.projectsubcode,
        name: inputs2.name,
        activityCode: inputs2.activityCode,
        description: inputs2.description,
      }, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
        }
      });
      if (response) toast.success("Subcode activity created successfully");
      setInputs2({
        projectsubcode: "",
        name: "",
        activityCode: "",
        description: ""
      });
    } catch (error) {
      console.error("Error creating subcode activity", error);
      alert("Failed to create subcode activity");
    }
    fetchProData();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await 
          axios.get(`${process.env.REACT_APP_BE_URL}/user/allprofile/`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
            },
          });
            console.log("FULL RESPONSE:", response);  // 👈 add this
    console.log("DATA:", response.data.msg);  

        if (response.status === 200) {
          // console.log(response);
          const arr = response.data.msg;
          // console.log("Pre", arr);
          const ftd = arr.filter( val => val.role__roleName?.toLowerCase() === "manager");
          // console.log("Post", arr);
          setManagers(ftd);
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

    fetchUsers();
  }, []);

const fetchCostCenters = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_URL}/user/costcenter/`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });

    const data = res.data.msg;
    const formatted = data.map((item) => ({
  name: item.name,
  number: item.id,  
}));

    setCostCenters(res.data.msg);
  } catch (error) {
    console.error("Cost center fetch error", error);
  }
};

  useEffect(() => {
    fetchProData();
     fetchCostCenters();
  }, []);

   const fetchProData = async () => {
      try {
        const response = await 
          axios.get(`${process.env.REACT_APP_BE_URL}/project/detail/`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
            },
          });
         

        if (response.status === 200) {
          setAllProCompData(response.data.msg);
        }
      } catch (error) {
        toast.error("Error retrieving projects data!", {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Add Project
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1 sm:mt-2">Create and manage projects, subcodes, and activities</p>
          </div>

          {/* Tabs Section */}
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
                <TabList 
                  onChange={handleChange} 
                  aria-label="project tabs"
                  sx={{
                    '& .MuiTab-root': {
                      fontWeight: 600,
                      fontSize: '0.95rem',
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
                  <Tab label="Project" value="1" />
                  <Tab label="SubProject" value="2" />
                  <Tab label="Activity" value="3" />
                </TabList>
              </Box>

              {/* Tab Panel 1: New Project */}
              <TabPanel value="1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Project Name
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      value={inputs.projectName}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter project name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Project Code
                    </label>
                    <input
                      type="text"
                      name="projectCode"
                      value={inputs.projectCode}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="No more than 4 alphanumerics"
                    />
                  </div>



                  
                  {/* <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Organization
                    </label>
                    <select
                      name="organization"
                      value={inputs.organization}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <option value="" disabled>Select</option>
                      {[{ org: "ASPL", id: 1 }, { org: "ATTS", id: 2 }].map((obj) => (<option key={obj.id} value={obj.id}>{obj.org}</option>))}
                    </select>
                  </div> */}
 <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Cost center
                    </label>
                     {/* <select
  name="costCenter"
  value={inputs.costCenter}
  onChange={handleInputChange}
   className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
>
  <option value="">Select Cost Center</option>

 {costCenters.map((cc) => (
 <option key={cc.number} value={String(cc.number)}>
  {cc.name}
</option>
))}
</select> */}
<select
  name="costCenter"
  value={inputs.costCenter}
  onChange={handleInputChange}
  className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
>
  <option value="" disabled>Select Cost Center</option>

  {costCenters.map((cc) => (
    <option key={cc.id} value={String(cc.id)}>
      {cc.number}_{cc.name}
    </option>
  ))}
</select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Manager
                    </label>
                    <select
                      name="projectManager"
                      value={inputs.projectManager}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <option value="" disabled>Select</option>
                      {managers.length > 0 && managers.map((obj) => (<option key={obj.empID} value={obj.empID}>{obj.name}</option>))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
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
              </TabPanel>

              {/* Tab Panel 2: SubCode */}
              <TabPanel value="2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Projects
                    </label>
                    <select
                      name="project"
                      value={inputs1.project}
                      onChange={handleInputChange1}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <option value="" disabled>Select</option>
                      {projects.length > 0 && projects.map((obj) => (<option key={obj.projectID} value={obj.projectID}>{obj.projectName}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      SubProject
                    </label>
                    <input
                      type="text"
                      name="projectSubcode"
                      value={inputs1.projectSubcode}
                      onChange={handleInputChange1}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter subcode"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={inputs1.description}
                      onChange={handleInputChange1}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                      rows="1"
                      placeholder="Brief description"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
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
              </TabPanel>

              {/* Tab Panel 3: Activity */}
              <TabPanel value="3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      SubProject
                    </label>
                    <select
                      name="projectsubcode"
                      value={inputs2.projectsubcode}
                      onChange={handleInputChange2}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
                      <option value="" disabled>Select</option>
                      {subProjects.length > 0 && subProjects.map(obj => (
                        obj[Object.keys(obj)?.[0]]?.project_subcode.map(sub => (
                          <option key={sub.id} value={sub.id}>{sub.projectSubcode}</option>
                        ))
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Activity Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={inputs2.name}
                      onChange={handleInputChange2}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter activity name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Activity Code
                    </label>
                    <input
                      type="text"
                      name="activityCode"
                      value={inputs2.activityCode}
                      onChange={handleInputChange2}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter code"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={inputs2.description}
                      onChange={handleInputChange2}
                      className="w-full bg-white border-2 border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                      rows="1"
                      placeholder="Brief description"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
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
              </TabPanel>
            </TabContext>
          </Box>
        </div>

        {/* Projects Table Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-5">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Project Details
            </h2>
            <p className="text-blue-100 text-sm mt-1">View all projects with subcodes and activities</p>
          </div>

          <TableContainer component={Paper} style={{ maxHeight: "60vh" }} >
            <Table stickyHeader>
              <TableHead sx={{ position: "sticky", top: 0, zIndex: 2000 }}>
                <TableRow>
                  <TableCell 
                    align="center" 
                    sx={{ 
                       position: "sticky",   
    top: 0,               
    zIndex: 1000, 
                      backgroundColor: '#f3f4f6', 
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: '#374151',
                      borderBottom: '2px solid #d1d5db',
                     
                    }}
                  >
                    Project ID
                  </TableCell>
                  <TableCell 
                    align="center" 
                    sx={{ 
                       position: "sticky",  
    top: 0,               
    zIndex: 1000, 
                      backgroundColor: '#f3f4f6', 
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: '#374151',
                      borderBottom: '2px solid #d1d5db',
                     
                    }}
                  >
                    Project Name
                  </TableCell>
                  <TableCell 
                    align="center" 
                    sx={{ 
                       position: "sticky",   
    top: 0,               
    zIndex: 1000, 
                      backgroundColor: '#f3f4f6', 
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: '#374151',
                      borderBottom: '2px solid #d1d5db',
                      
                    }}
                  >
                    Project Code
                  </TableCell>

                  
                {/* added 23/3 */}
                <TableCell 
  align="center"
  sx={{ 
     position: "sticky",   
    top: 0,               
    zIndex: 1000, 
    backgroundColor: '#f3f4f6', 
    fontWeight: 700,
    fontSize: '0.9rem',
    color: '#374151',
    borderBottom: '2px solid #d1d5db',
   
  }}
>
  Status
</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
                {allProCompData.map((project) => {
                  const projectKey = Object.keys(project)[0];
                  const projectData = project[projectKey];
                  return (
                    <TableRow 
                      key={projectKey}
                      sx={{ '&:hover': { backgroundColor: '#eff6ff' } }}
                    >
                      <TableCell align="center" sx={{ fontWeight: 600, color: '#1f2937' }}>
                        {projectData.projectID}
                      </TableCell>
                      <TableCell>
                        <Accordion 
                           disableGutters
  sx={{ 
    boxShadow: 'none',
    '&:before': { display: 'none' },
    backgroundColor: 'transparent',
    position: "relative",   
    zIndex: 1               
  }}
                        >
                          <AccordionSummary 
                            expandIcon={<ExpandMore sx={{ color: '#3b82f6' }} />}
                            sx={{ 
                              fontWeight: 600,
                              color: '#1f2937',
                              '&:hover': { color: '#3b82f6' }
                            }}
                          >
                            {projectData.projectName}
                          </AccordionSummary>
                          <AccordionDetails sx={{ padding: 0 }}>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                              <Table size="small">
                                <TableHead sx={{ position: "sticky", top: 0, zIndex: 2000 }}>
                                  <TableRow>
                                    <TableCell sx={{ backgroundColor: '#e0f2fe', fontWeight: 600, fontSize: '0.85rem' }}>SubProject ID</TableCell>
                                    <TableCell sx={{ backgroundColor: '#e0f2fe', fontWeight: 600, fontSize: '0.85rem' }}>SubProject Name</TableCell>
                                    <TableCell sx={{ backgroundColor: '#e0f2fe', fontWeight: 600, fontSize: '0.85rem' }}>Description</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {projectData.project_subcode.map((subcode) => (
                                    <TableRow key={subcode.id} sx={{ '&:hover': { backgroundColor: '#f0f9ff' } }}>
                                      <TableCell sx={{ color: '#4b5563' }}>{subcode.id}</TableCell>
                                      <TableCell>
                                        <Accordion 
                                          disableGutters
  sx={{ 
    boxShadow: 'none',
    '&:before': { display: 'none' },
    backgroundColor: 'transparent',
    position: "relative",   
    zIndex: 1              
  }}
                                        >
                                          <AccordionSummary 
                                            expandIcon={<ExpandMore sx={{ color: '#0ea5e9' }} />}
                                            sx={{ 
                                              fontWeight: 500,
                                              color: '#374151',
                                              minHeight: '40px',
                                              '& .MuiAccordionSummary-content': { margin: '8px 0' }
                                            }}
                                          >
                                            {subcode.projectSubcode}
                                          </AccordionSummary>
                                          <AccordionDetails sx={{ padding: 0 }}>
                                            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                                              <Table size="small">
                                                <TableHead sx={{ position: "sticky", top: 0, zIndex: 2000 }}>
                                                  <TableRow>
                                                    <TableCell sx={{ backgroundColor: '#f0f9ff', fontWeight: 600, fontSize: '0.8rem' }}>Activity ID</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f0f9ff', fontWeight: 600, fontSize: '0.8rem' }}>Activity Name</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f0f9ff', fontWeight: 600, fontSize: '0.8rem' }}>Activity Code</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f0f9ff', fontWeight: 600, fontSize: '0.8rem' }}>Description</TableCell>
                                                  </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                  {subcode.project_subcode_activity.length > 0 ? (
                                                    subcode.project_subcode_activity.map((activity) => (
                                                      <TableRow key={activity.id} sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}>
                                                        <TableCell sx={{ fontSize: '0.85rem', color: '#6b7280' }}>{activity.id}</TableCell>
                                                        <TableCell sx={{ fontSize: '0.85rem', color: '#374151' }}>{activity.name}</TableCell>
                                                        <TableCell sx={{ fontSize: '0.85rem', color: '#374151' }}>{activity.activityCode}</TableCell>
                                                        <TableCell sx={{ fontSize: '0.85rem', color: '#6b7280' }}>{activity.description}</TableCell>
                                                      </TableRow>
                                                    ))
                                                  ) : (
                                                    <TableRow>
                                                      <TableCell colSpan={4} sx={{ textAlign: 'center', color: '#9ca3af', fontStyle: 'italic', fontSize: '0.85rem' }}>
                                                        No activities available for this subcode.
                                                      </TableCell>
                                                    </TableRow>
                                                  )}
                                                </TableBody>
                                              </Table>
                                            </TableContainer>
                                          </AccordionDetails>
                                        </Accordion>
                                      </TableCell>
                                      <TableCell sx={{ color: '#6b7280', fontSize: '0.9rem' }}>{subcode.description}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </AccordionDetails>
                        </Accordion>
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600, color: '#1f2937' }}>
                        {projectData.projectCode}
                      </TableCell>

                      {/* added 23/3 */}
                      <TableCell align="center">
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
      projectData.status
        ? "bg-orange-100 text-orange-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {projectData.status ? "Inactive" : "Active"}
  </span>
</TableCell>


                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Project1;
