import Dashboard from "./Dashboard";
import axios from "axios";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Users, Folder, Clock } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  LabelList
} from "recharts";
import { getISOWeek } from "date-fns";
import { GolfCourseRounded } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Graph = () => {

  const [totalProjects, setTotalProjects] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [downloadType, setDownloadType] = useState("month");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [projectHoursData, setProjectHoursData] = useState([]);
  const [dayHoursData, setDayHoursData] = useState([]);
  const [employeeHoursData, setEmployeeHoursData] = useState([]);
  const [dayProjects, setDayProjects] = useState([]);
  const [graphFilter, setGraphFilter] = useState("week");
  const [selectedDate1, setSelectedDate1] = useState("");
  const [selectedMonth1, setSelectedMonth1] = useState("");
  const [selectedWeek1, setSelectedWeek1] = useState("");


  const currentYear = new Date().getFullYear();
  const currentWeekNumber = getISOWeek(new Date());
  const year_week = `${currentYear}_${currentWeekNumber}`;


  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BE_URL}/user/allprofile/`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          }
        }
      );
      console.log(res.data)
      setEmployees(res.data.msg);
    } catch (error) {
      console.log("Error fetching employee", error);
    }
  };


  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BE_URL}/project/getprojectname/`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          }
        }
      );
      setProjects(res.data.msg);
    } catch (error) {
      console.log("Error fetching projects", error);
    }
  };

  // const fetchProjectHours = async (employeeId) => {

  //  if(!employeeId) return;

  //  try{
  //   const res = await axios.get(
  //    `${process.env.REACT_APP_BE_URL}/timesheet/dashboardgraph/?type=project_hours&employee_id=${employeeId}&year_week=${year_week}`,
  //    {
  //     headers:{
  //      Authorization:`Bearer ${sessionStorage.getItem("userToken")}`
  //     }
  //    }
  //   );

  //   setProjectHoursData(res.data.msg);

  //  }catch(error){
  //   console.log("Error fetching project hours", error);
  //  }
  // };


  const fetchProjectHoursDaily = async (employeeId, date) => {
    if (!employeeId || !date) return;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BE_URL}/timesheet/dashboardgraph/?type=project_hours&employee_id=${employeeId}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          }
        }
      );
      setProjectHoursData(res.data.msg);
    } catch (error) {
      console.log("Error fetching daily project hours", error);
    }
  };


  const fetchProjectHoursWeekly = async (employeeId, weekValue) => {
    if (!employeeId || !weekValue) return;
    try {
      const [year, week] = weekValue.split("-W");
      const year_week = `${year}_${week}`;
      const res = await axios.get(
        `${process.env.REACT_APP_BE_URL}/timesheet/dashboardgraph/?type=project_hours&employee_id=${employeeId}&year_week=${year_week}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          }
        }
      );
      setProjectHoursData(res.data.msg);
    } catch (error) {
      console.log("Error fetching weekly project hours", error);
    }
  };


  const fetchProjectHoursMonthly = async (employeeId, month, year) => {
    if (!employeeId) return;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BE_URL}/timesheet/dashboardgraph/?type=project_hours&employee_id=${employeeId}&month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          }
        }
      );
      setProjectHoursData(res.data.msg);
    } catch (error) {
      console.log("Error fetching monthly project hours", error);
    }
  };


  const fetchDayHours = async (employeeId) => {
    if (!employeeId) return;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BE_URL}/timesheet/dashboardgraph/?type=day_hours&employee_id=${employeeId}&year_week=${year_week}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          }
        }
      );
      const rawData = res.data.msg;
      const grouped = {};
      const projectsSet = new Set();
      rawData.forEach(item => {
        projectsSet.add(item.project);
        if (!grouped[item.day]) {
          grouped[item.day] = { day: item.day };
        }
        grouped[item.day][item.project] = item.hours;
      });
      setDayProjects([...projectsSet]);
      const formatted = Object.values(grouped);
      setDayHoursData(formatted);
    } catch (error) {
      console.log("Error fetching day hours", error);
    }
  };

  // const fetchEmployeeHours = async (projectId) => {

  //  if(!projectId) return;

  //  try{
  //   const res = await axios.get(
  //    `${process.env.REACT_APP_BE_URL}/timesheet/dashboardgraph/?type=employee_hours&project_id=${projectId}&year_week=${year_week}`,
  //    {
  //     headers:{
  //      Authorization:`Bearer ${sessionStorage.getItem("userToken")}`
  //     }
  //    }
  //   );

  //   setEmployeeHoursData(res.data.msg);

  //  }catch(error){
  //   console.log("Error fetching employee hours", error);
  //  }
  // };



  const fetchEmployeeHoursDaily = async (projectId, date) => {
    if (!projectId || !date) return;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BE_URL}/timesheet/dashboardgraph/?type=employee_hours&project_id=${projectId}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          }
        }
      );
      setEmployeeHoursData(res.data.msg);
    } catch (error) {
      console.log("Error fetching daily employee hours", error);
    }
  };


  const fetchEmployeeHoursWeekly = async (projectId, weekValue) => {
    if (!projectId || !weekValue) return;
    try {
      const [year, week] = weekValue.split("-W");
      const year_week = `${year}_${week}`;
      const res = await axios.get(
        `${process.env.REACT_APP_BE_URL}/timesheet/dashboardgraph/?type=employee_hours&project_id=${projectId}&year_week=${year_week}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          }
        }
      );
      setEmployeeHoursData(res.data.msg);
    } catch (error) {
      console.log("Error fetching weekly employee hours", error);
    }
  };


  const fetchEmployeeHoursMonthly = async (projectId, month, year) => {
    if (!projectId) return;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BE_URL}/timesheet/dashboardgraph/?type=employee_hours&project_id=${projectId}&month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          }
        }
      );
      setEmployeeHoursData(res.data.msg);
    } catch (error) {
      console.log("Error fetching monthly employee hours", error);
    }
  };


  const fetchDashboardSummary = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_URL}/timesheet/dashboardsummary/`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          }
        }
      );
      setTotalEmployees(response.data.total_employees);
      setTotalProjects(response.data.total_projects);
      setTotalHours(parseFloat(response.data.total_hours).toFixed(2));
    } catch (error) {
      console.log("Error fetching dashboard data", error);
    }
  };

  // const fetchProjects = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BE_URL}/project/getprojectname/`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
  //         }
  //       }
  //     );

  //     console.log("Projects:", response.data);

  //     if (response.status === 200) {
  //       setTotalProjects(response.data.msg.length);
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchEmployees = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BE_URL}/user/allprofile/`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
  //         }
  //       }
  //     );
  //  console.log("Employees:", response.data.msg);
  //     if (response.status === 200) {
  //       setTotalEmployees(response.data.msg.length+1);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // const fetchTotalHours = async () => {
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_BE_URL}/timesheet/totalhours/`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
  //       }
  //     }
  //   );

  //   setTotalHours(response.data.total_hours);
  // };


  const downloadExcel = async (month, year) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_URL}/timesheet/timesheetexceldata/?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          }
        }
      );
      const data = response.data.msg;
      const employees = [...new Set(data.map(d => d.employee))];
      const projects = [...new Set(data.map(d => d.project))];
      let table = [];
      const header = ["Employee Name", ...projects];
      table.push(header);
      employees.forEach(emp => {
        let row = [emp];
        projects.forEach(proj => {
          const record = data.find(
            d => d.employee === emp && d.project === proj
          );
          row.push(record ? record.hours : 0);
        });
        table.push(row);
      });
      const worksheet = XLSX.utils.aoa_to_sheet(table);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Timesheet");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      saveAs(blob, `Timesheet_${month}_${year}.xlsx`);
      toast.success("Downloaded successfully ");
    } catch (error) {
      console.log("Error download excel data", error);
      toast.error("Download failed ");
    }
  };


  // const downloadExcel = async ({day, week, month, year}) => {

  //   let url = `${process.env.REACT_APP_BE_URL}/timesheet/timesheetexceldata/?year=${year}`;

  //   if(day){
  //     url += `&day=${day}`;
  //   }

  //   if(week){
  //     url += `&week=${week}`;
  //   }

  //   if(month){
  //     url += `&month=${month}`;
  //   }

  //   const response = await axios.get(url,{
  //     headers:{
  //       Authorization:`Bearer ${sessionStorage.getItem("userToken")}`
  //     }
  //   });

  //   const data = response.data.msg;

  //   const employees = [...new Set(data.map(d=>d.employee))];
  //   const projects = [...new Set(data.map(d=>d.project))];

  //   let table=[];

  //   const header=["Employee Name",...projects];
  //   table.push(header);

  //   employees.forEach(emp=>{
  //     let row=[emp];

  //     projects.forEach(proj=>{
  //       const record=data.find(
  //         d=>d.employee===emp && d.project===proj
  //       );
  //       row.push(record ? record.hours : 0);
  //     });

  //     table.push(row);
  //   });

  //   const worksheet=XLSX.utils.aoa_to_sheet(table);
  //   const workbook=XLSX.utils.book_new();

  //   XLSX.utils.book_append_sheet(workbook,worksheet,"Timesheet");

  //   XLSX.writeFile(workbook,"Timesheet_Report.xlsx");

  // };
  // const downloadDaily = () => {

  //   if(!selectedDate){
  //     alert("Select date");
  //     return;
  //   }

  //   downloadExcel({
  //     day: selectedDate,
  //     year: new Date().getFullYear()
  //   });

  // };


  const downloadWeekly = () => {
    const today = new Date();
    const week = getISOWeek(today);
    const year = today.getFullYear();
    downloadExcel({
      week: week,
      year: year
    });
  };

  const downloadMonthly = () => {
    const [year, month] = selectedMonth.split("-");
    downloadExcel({
      month: month,
      year: year
    });
  };


  // const downloadCurrentMonth = () => {
  //   const today = new Date();
  //   const month = today.getMonth() + 1;
  //   const year = today.getFullYear();
  //   downloadExcel(month, year);
  // };
  // const downloadPreviousMonth = () => {
  //   const today = new Date();
  //   const prevDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  //   const month = prevDate.getMonth() + 1;
  //   const year = prevDate.getFullYear();
  //   downloadExcel(month, year);

  // };


  const downloadCustomMonth = () => {
    if (!selectedMonth) {
      alert("Please select a month");
      return;
    }
    const [year, month] = selectedMonth.split("-");
    downloadExcel(month, year);
  };


  // useEffect(()=>{
  //  fetchProjectHours(selectedEmployee);
  //  fetchDayHours(selectedEmployee);
  // },[selectedEmployee]);


  useEffect(() => {
    if (!selectedEmployee) return;
    if (graphFilter === "week") {
      fetchProjectHoursWeekly(selectedEmployee, selectedWeek1);
    }
    if (graphFilter === "day") {
      fetchProjectHoursDaily(selectedEmployee, selectedDate1);
    }
    if (graphFilter === "month") {
      const [year, month] = selectedMonth1.split("-");
      fetchProjectHoursMonthly(selectedEmployee, month, year);
    }
  }, [selectedEmployee, graphFilter, selectedDate1, selectedWeek1, selectedMonth1]);



  // useEffect(()=>{
  //  fetchEmployeeHours(selectedProject);
  // },[selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;
    if (graphFilter === "week") {
      fetchEmployeeHoursWeekly(selectedProject, selectedWeek1);
    }
    if (graphFilter === "day") {
      fetchEmployeeHoursDaily(selectedProject, selectedDate1);
    }
    if (graphFilter === "month") {
      const [year, month] = selectedMonth1.split("-");
      fetchEmployeeHoursMonthly(selectedProject, month, year);
    }
  }, [selectedProject, graphFilter, selectedDate1, selectedWeek1, selectedMonth1]);



  useEffect(() => {
    // fetchProjects();
    // fetchEmployees();
    // fetchTotalHours();
    fetchDashboardSummary();
    fetchEmployees();
    fetchProjects();
  }, []);


  return (
    <div className="flex">

      <Dashboard />
      <div className="p-8 w-full bg-gray-50 min-h-screen flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          Dashboard Overview
        </h1>

        <div className="fixed top-6 right-6 group z-50">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            Download
          </button>
          <span className="absolute right-14 top-2 bg-white text-blue-600 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Download Timesheet
          </span>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-10">

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Total Employees</p>
              <h2 className="text-4xl font-bold mt-2">{totalEmployees}</h2>
            </div>
            <Users size={40} className="opacity-80" />
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Total Projects</p>
              <h2 className="text-4xl font-bold mt-2">{totalProjects}</h2>
            </div>
            <Folder size={40} className="opacity-80" />
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Total Hours</p>
              <h2 className="text-4xl font-bold mt-2">{totalHours}</h2>
            </div>
            <Clock size={40} className="opacity-80" />
          </div>
        </div>



        {/* <div className="flex justify-start"></div>
<div className="bg-white shadow-xl rounded-xl p-6 max-w-xl mt-4">

  <h3 className="text-lg font-semibold mb-4 text-gray-700">
    Download Timesheet
  </h3>

  <div className="flex gap-4 items-center">

    <button
      onClick={downloadCurrentMonth}
      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
    >
      Current Month
    </button>

    <button
      onClick={downloadPreviousMonth}
      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
    >
      Previous Month
    </button>

    <input
      type="month"
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      className="border border-gray-300 p-2 rounded-lg shadow-sm w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      onClick={downloadCustomMonth}
      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
    >
      Download
    </button>

  </div>

</div> */}


        <div className="flex gap-10">
          <div className="mb-6">
            <label className="font-semibold mr-2">Select Employee</label>

            <select
              value={selectedEmployee}
              onChange={(e) => {
                setSelectedEmployee(e.target.value);
                setSelectedProject("");
              }}
              className="border p-2 rounded"
            >

              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.empID} value={emp.empID}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="font-semibold mr-2">Select Project</label>

            <select
              value={selectedProject}
              onChange={(e) => {
                setSelectedProject(e.target.value);
                setSelectedEmployee("");
              }}
              className="border p-2 rounded"
            >
              <option value="">Select Project</option>
              {projects.map(proj => (
                <option key={proj.projectID} value={proj.projectID}>
                  {proj.projectName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <select
            value={graphFilter}
            onChange={(e) => setGraphFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="week">Weekly</option>
            <option value="day">Daily</option>
            <option value="month">Monthly</option>
          </select>

          {graphFilter === "week" && (
            <input
              type="week"
              value={selectedWeek1}
              onChange={(e) => setSelectedWeek1(e.target.value)}
              className="border p-2 rounded"
            />
          )}

          {graphFilter === "day" && (
            <input
              type="date"
              value={selectedDate1}
              onChange={(e) => setSelectedDate1(e.target.value)}
              className="border p-2 rounded"
            />
          )}

          {graphFilter === "month" && (
            <input
              type="month"
              value={selectedMonth1}
              onChange={(e) => setSelectedMonth1(e.target.value)}
              className="border p-2 rounded"
            />
          )}

        </div>
        {!selectedEmployee && !selectedProject && (
          <p className="text-gray-500 mt-10">
            Select an Employee or Project to view graph
          </p>
        )}

        {selectedEmployee && !selectedProject && (
          <div className="w-full max-w-4xl bg-white p-6 rounded shadow mb-8">
            <h2 className="font-semibold mb-4">Project vs Hours</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectHoursData} margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="project" label={{ value: "Projects", position: "bottom", offset: 15 }} />
                <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft", offset: -3 }} />
                <Tooltip wrapperStyle={{ zIndex: 1000 }} />
                <Bar dataKey="hours" fill="#4CAF50" cursor="pointer" />
                {/* 
<Bar dataKey="hours" fill="#4CAF50">
      <LabelList dataKey="hours" position="top" />
    </Bar> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}


        {/* 
<div className="w-full max-w-4xl bg-white p-6 rounded shadow mb-8">

<h2 className="font-semibold mb-4">Day vs Hours</h2>

<ResponsiveContainer width="100%" height={300}>
<BarChart data={dayHoursData} margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="day" label={{  value: "Weekdays", position: "bottom", offset: 15}}/>

<YAxis/>

<Tooltip wrapperStyle={{ zIndex: 1000 }}/>

<Legend  verticalAlign="top"  align="right"  wrapperStyle={{ top: -20 }} />

{dayProjects.map((project,index)=>(
  <Bar
    key={project}
    dataKey={project}
    stackId="a"
    fill={["green","orange","purple","red","teal","Gold","pink"][index % 5]}
    cursor="pointer"
  />
))}

</BarChart>
</ResponsiveContainer>

</div> */}

        {selectedProject && !selectedEmployee && (
          <div className="w-full max-w-4xl bg-white p-6 rounded shadow">
            <h2 className="font-semibold mb-4">Employee vs Hours</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employeeHoursData} margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="employee" label={{ value: "Employees", position: "bottom", offset: 15 }} />
                <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft", offset: -3 }} />
                <Tooltip wrapperStyle={{ zIndex: 1000 }} />
                <Bar dataKey="hours" fill="#2196F3" cursor="pointer" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>


      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Download Timesheet
            </h2>
            {/* <select
 value={downloadType}
 onChange={(e)=>setDownloadType(e.target.value)}
 className="border p-2 rounded mb-3"
>
<option value="day">Daily</option>
<option value="week">Weekly</option>
<option value="month">Monthly</option>
</select> */}
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg shadow-sm w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* 
{downloadType==="day" && (
<input
 type="date"
 value={selectedDate}
 onChange={(e)=>setSelectedDate(e.target.value)}
/>
)}

{downloadType==="week" && (
<input
 type="number"
 placeholder="Week Number"
 value={selectedWeek}
 onChange={(e)=>setSelectedWeek(e.target.value)}
/>
)}

{downloadType==="month" && (
<input
 type="month"
 value={selectedMonth}
 onChange={(e)=>setSelectedMonth(e.target.value)}
/>
)} */}


            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 mt-5"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  downloadCustomMonth();
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-5"
              >
                Download
              </button>
              {/* 
      <button
        onClick={() =>  {

  if(downloadType === "day"){
    downloadDaily();
  }

  else if(downloadType === "week"){
    downloadExcel({
      week: selectedWeek,
      year: new Date().getFullYear()
    });
  }

  else if(downloadType === "month"){
    downloadMonthly();
  }

  setShowModal(false);

}}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-5"
      >
        Download
      </button> */}
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>

  );
};



export default Graph;