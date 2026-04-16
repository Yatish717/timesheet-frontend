import React, { useState, useEffect, useRef } from "react";
import {
  startOfWeek,
  addDays,
  format,
  subWeeks,
  addWeeks,
  isToday,
  isSaturday,
  isSunday,
  startOfMonth,
  endOfMonth,
  addMonths,
  getISOWeek,
} from "date-fns";

import { SlOptionsVertical } from "react-icons/sl";
import { TbFreezeRow } from "react-icons/tb";
import Dashboard from "./Dashboard";
import { FaArrowCircleDown, FaRegIdCard, FaUser, FaUserCircle } from "react-icons/fa";
import { utils, writeFile } from "xlsx";
import { CiSaveDown1 } from "react-icons/ci";
import { CiLogout, CiEdit } from "react-icons/ci";
import { toast, ToastContainer, Zoom, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AiOutlineCalendar, AiOutlinePlus, AiOutlineDelete, AiOutlineDown, AiOutlineUp, AiOutlineSave } from 'react-icons/ai';
import { TextareaAutosize, Typography, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Box, Chip } from '@mui/material';
import { Card } from '@mui/material';
import { Select } from '@mui/material';
import { TextField } from '@mui/material';
import { MenuItem } from '@mui/material';
import { LinearProgress } from '@mui/material';
import { CardHeader } from '@mui/material';
import { CardContent } from '@mui/material';
import { IconButton } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import dayjs from 'dayjs';
import TextArea from "antd/es/input/TextArea";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FaCalendarAlt, FaClipboardList, FaUserAlt, FaMoneyBillAlt } from 'react-icons/fa';
import { Fullscreen } from "lucide-react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from "@mui/material/colors";
import { FcDepartment } from "react-icons/fc";
import { animate } from "framer-motion";
import { IoMdDoneAll } from "react-icons/io";
import { BiArchiveOut } from "react-icons/bi";
import DoubleConfirmationDialog from './DoubleConfirmationDialog';


const colorPalette = [
  '#e0e0e0', '#e0e0e0', '#e0e0e0', '#e0e0e0',
  '#e0e0e0', '#e0e0e0', '#e0e0e0', '#e0e0e0',
  '#e0e0e0', '#e0e0e0', '#e0e0e0', '#e0e0e0',
  '#e0e0e0', '#e0e0e0', '#e0e0e0', '#e0e0e0'
];





const colorForEven = '#e0e0e0';
const colorForOdd = '#e0e0e0';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  cursor: 'pointer',
}));

// const GradientLinearProgress = styled(LinearProgress)(({ value }) => ({
//   height: 10,
//   borderRadius: 5,
//   background: `linear-gradient(to right, ${value < 50
//       ? '#ff6f00, #ff8f00'
//       : value < 75
//         ? '#ffa000, #ffb300'
//         : '#c0ca33, #7cb342'
//     })`,
//   '& .MuiLinearProgress-bar': {
//     backgroundColor: 'transparent', // Make the bar background transparent so the gradient shows
//   },
// }));


const getBarColor = (value) => {
  if (value < 20) {
    return 'primary'; // Example predefined color, customize in theme
  } else if (value < 40) {
    return 'secondary'; // Example predefined color, customize in theme
  } else if (value < 60) {
    return 'warning'; // You would have to customize or use custom colors
  } else if (value < 80) {
    return 'success'; // Example predefined color, customize in theme
  } else if (value <= 100) {
    return 'error'; // Example predefined color, customize in theme
  } else {
    return 'inherit'; // Fallback
  }
};

const DayCard = ({ date, eac, onAddEntry, onUpdateEntry, onDeleteEntry, onSaveEntry, allProCompData,activeProjects,costCenters,  handleChangeDd, comp, preWeek, curWeek }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const dayTotal = entries.reduce((sum, entry) => sum + entry.hours, 0);



  let totalMinutes = 0;

eac?.data.forEach(item => {
  if (!item.hours) return;

  const time = dayjs(`1970-01-01T${item.hours}`);

  const hr = time.hour();
  const mn = time.minute();

  totalMinutes += (hr * 60) + mn;
});

const totalHours = Math.floor(totalMinutes / 60);
const totalMin = totalMinutes % 60;

  const progress = Math.min(((totalHours + totalMin / 60) / 9) * 100, 100); // 9-hour working
  const [colored, setColored] = useState(false);

  // function getRandomLightColor(ea) {
  //   // higher minimum to ensure the color is light
  //   // const r = Math.floor(Math.random() * 128) + 128; // 128-255
  //   // const g = Math.floor(Math.random() * 128) + 128; // 128-255
  //   // const b = Math.floor(Math.random() * 128) + 128; // 128-255

  //   // //  to hex string and return as a color code
  //   // return `rgb(${r}, ${g}, ${b})`;
  //   if (!colored) {
  //     return colorPalette[Math.floor(Math.random() * 11)];
  //   } else if (ea?.id === null) {
  //     return colorPalette[Math.floor(Math.random() * 11)];
  //   }
  //   if (!colored) setColored(true);
  //   return "#a5d6a7";
  // }

  // const retWorkedHrs = () => {
  //   // return dayjs().hour(Math.trunc(t)).minute(t.toString().split(".")?.[1]);
  //   let totalHours = 0;

  //   eac?.data.forEach(item => {
  //     const effort = item.hours;
  //     const hours = Math.floor(effort); // Extract integer part (hours)
  //     const minToHrs = (effort - hours) / 60; // Extract decimal part and convert to minutes

  //     // const convertedHours = minutes / 60; // Convert minutes to hours
  //     totalHours += hours + minToHrs; // Sum hours and converted hours
  //   });
  //   return totalHours;
  // };

  const retMn = (data) => {
    if (data) {
      // let val = parseInt(data.toString().split(".")?.[-1]);
      // if (val === NaN || val === undefined) return 0;
      if (data.toString().split(".").length > 1) return parseInt(data.toString().split(".")?.[1]);
      else if (data.toString().split(".").length === 1) return 0;
      else return 0;
    } else {
      return 0;
    }
  };

  const getBtnBool = () => {
    let bool = true;
    comp?.forEach(ea => {
      ea?.data.forEach(sub => {
        if (sub?.status?.id === 2 || sub?.status?.id === 3 || sub?.status?.id === 4) bool = false;
      });
    });
    return bool;
  };

  return (
    <StyledCard>
      <StyledCardHeader
        onClick={() => setIsExpanded(!isExpanded)}
        title={
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" display="flex" alignItems="center" className={`${isToday(date) ? 'bg-slate-300' : 'bg-white'} p-1 text-sm`}>
              <AiOutlineCalendar fontSize="small" style={{ marginRight: 6 }} />
              {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle2" fontWeight="bold" style={{ marginRight: 16 }}>
                {`${totalHours} Hrs ${totalMin} Mn`}
              </Typography>
              {isExpanded ? <AiOutlineDown /> : <AiOutlineUp />}
            </Box>
          </Box>
        }
        className={`${isToday(date) ? 'bg-slate-300 shadow-lg border rounded-md' : 'bg-white'}`}
      />
      <LinearProgress variant="determinate" value={progress} style={{ margin: '0 16px' }} sx={{
        backgroundColor: '#e0e0e0',
        '& .MuiLinearProgress-bar': {
          background: `linear-gradient(to right, 
          ${progress < 20 ? '#ff0000' : progress < 40 ? '#ff6f00' : progress < 60 ? '#ff8f00' : progress < 80 ? '#4caf50' : '#4caf50'}, 
          ${progress < 20 ? '#ff6f00' : progress < 40 ? '#ff8f00' : progress < 60 ? '#4caf50' : progress < 80 ? '#81c784' : '#81c784'})`,
        },
      }} />
      {/* <GradientLinearProgress variant="determinate" value={progress} /> */}
      {isExpanded && (
        <CardContent>
          {eac?.data.length > 0 && eac.data.map((ea, index) => (
            <Box 
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                p: 1,
                borderRadius: 1,
                boxShadow: 2,
                border: ea?.status?.statusName === 'Save' ? '2px solid #22C55E' : 'none',
                backgroundColor: ea?.status?.statusName === 'Save' ? '#f0fdf4' : '#f5f5f5'
              }}
            >
              {/* <CheckCircleIcon style={{ color: '#fff', marginRight: 8 }} />  */}
              <Chip
                label={ea?.status?.statusName === 'Save' ? 'Saved' : ea?.status?.statusName}
                color="primary"
                style={{
                  backgroundColor: ea?.status?.statusName === 'Save' ? '#22C55E' : '#e0e0e0',
                  color: ea?.status?.statusName === 'Save' ? 'white' : 'black',
                  fontWeight: 'bold',
                  padding: '4px 8px',
                  marginRight: '8px'
                }}
              />

              <FormControl className="w-24" style={{ marginRight: 8 }}>
                <InputLabel id="demo-simple-select-hours-label">Hours</InputLabel>
                <Select
                  labelId="demo-simple-select-hours-label"
                  id="select-hours"
                value={ea?.hours ? dayjs(`1970-01-01T${ea.hours}`).hour() : 0}
                  label="Enter Hours"
                  name="hours"
                  disabled={!getBtnBool()}
                  onChange={(e) => handleChangeDd(e, index, date)}>
                  {[...Array(12).keys()].map((hour) => (
                    <MenuItem key={hour} value={hour}>
                      {hour}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className="w-24" style={{ marginRight: 8 }}>
                <InputLabel id="demo-simple-select-minutes-label">Min</InputLabel>
                <Select
                  labelId="demo-simple-select-minutes-label"
                  id="select-minutes"
                 value={ea?.hours ? dayjs(`1970-01-01T${ea.hours}`).minute() : 0}
                  label="Enter Min"
                  name="minutes"
                  disabled={!getBtnBool()}
                  onChange={(e) => handleChangeDd(e, index, date)}>
                  {[...Array(60).keys()].map((minute) => {
                    // if (minute % 5 === 0 && minute !== 10 && minute !== 20 && minute !== 30 && minute !== 40 && minute !== 50)
                     if (minute % 5 === 0) 
                    return (
                        <MenuItem key={minute} value={minute}>
                          {minute}
                        </MenuItem>
                      )
                  })}
                </Select>
              </FormControl>

<FormControl className="w-40" style={{ marginRight: 8 }}>
  <InputLabel id="costcenter-label">Cost Center</InputLabel>

  <Select
    labelId="costcenter-label"
    id="costcenter-select"
    value={ea?.employee_costcenter?.id ?? ea?.employee_costcenter ?? ""}
    name="employee_costcenter"
    label="Cost Center"
     disabled={!getBtnBool()}
    onChange={(e) => handleChangeDd(e, index, date)}
  >
    <MenuItem value="" disabled>Select Cost Center</MenuItem>

    {costCenters.map((cc) => (
      <MenuItem key={cc.id} value={cc.id}>
        {cc.number}_{cc.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

              <FormControl className="w-40" style={{ marginRight: 8 }}>
                <InputLabel id="demo-simple-select-label">Project</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ea?.project?.projectID}
                  label="Select Project"
                  name="project"
                  disabled={!getBtnBool()}
                  onChange={(e) => handleChangeDd(e, index, date)}
                >
                  <MenuItem key={"first"} value="" disabled>
                    Select
                  </MenuItem>
                 {activeProjects
  .filter((obj) => {
    const key = Object.keys(obj)?.[0];
    const project = obj[key];

    const selectedCC =
      typeof ea?.employee_costcenter === "object"
        ? ea.employee_costcenter?.id
        : ea?.employee_costcenter;

    return project.costCenter === selectedCC;
  })
  .map((obj) => {
    const key = Object.keys(obj)?.[0];
    const project = obj[key];

    return (
      <MenuItem key={project.projectID} value={project.projectID}>
        {project.projectName}
      </MenuItem>
    );
  })}

                </Select>
              </FormControl>

              <FormControl className="w-48" style={{ marginRight: 8 }}>
                <InputLabel id="demo-simple-select-label">SubProject</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ea?.projectsubcode?.id}
                  label="Select Sub Project"
                  name="projectsubcode"
                  disabled={!getBtnBool()}
                  onChange={(e) => handleChangeDd(e, index, date)}>
                  <MenuItem key={"first"} value="" disabled>
                    Select
                  </MenuItem>
                  {ea?.project?.projectID !== null &&
                    allProCompData.map((obj) => {
                      const projectKey = Object.keys(obj)?.[0];
                      const project = obj[projectKey];
                      return project.projectID === ea?.project?.projectID &&
                        project.project_subcode?.map((sub) => (
                          <MenuItem key={sub.id} value={sub.id}>
                            {sub.projectSubcode}
                          </MenuItem>
                        ));
                    })}
                </Select>
              </FormControl>

              <FormControl className="w-40" style={{ marginRight: 8 }}>
                <InputLabel id="demo-simple-select-label">Activity</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ea?.project_subcode_activity?.id}
                  label="Select Activity"
                  name="project_subcode_activity"
                  disabled={!getBtnBool()}
                  onChange={(e) => handleChangeDd(e, index, date)}>
                  <MenuItem key={"first"} value="" disabled>
                    Select
                  </MenuItem>
                  {ea?.projectsubcode?.id !== null &&
                    allProCompData
                      .map((obj) => {
                        const projectKey = Object.keys(obj)?.[0];
                        const project = obj[projectKey];

                        if (project.projectID !== ea?.project?.projectID) return null;

                        return project.project_subcode
                          ?.filter((sub) => sub.id === ea?.projectsubcode?.id)
                          .flatMap((sub) =>
                            sub.project_subcode_activity?.map((act) => (
                              <MenuItem key={act.id} value={act.id}>
                                {act.name}
                              </MenuItem>
                            ))
                          );
                      })
                      .filter(Boolean)}
                </Select>
              </FormControl>

              <FormControl className="w-40" style={{ marginRight: 8 }}>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ea?.location}
                  label="Select Location"
                  name="location"
                  disabled={!getBtnBool()}
                  onChange={(e) => handleChangeDd(e, index, date)}>
                  <MenuItem key={"first"} value="" disabled>
                    Select
                  </MenuItem>
                  {["Office", "WFH", "OnSite"].map((loc, index) => {
                    return (
                      <MenuItem key={loc} value={loc}>
                        {loc}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <TextareaAutosize
                value={ea?.comment}
                className="p-2 outline-none border rounded-md bg-gray-200"
                onChange={(e) => handleChangeDd(e, index, date)}
                placeholder="Comment"
                style={{ flexGrow: 1, marginRight: 8 }}
                name="comment"
                disabled={!getBtnBool()}
              />
              {curWeek === preWeek && (ea?.status?.statusName === "Save" || ea?.status?.statusName === "Open") && <div className="flex flex-col"><IconButton onClick={() => onSaveEntry(date, index, ea?.id)}>
                <AiOutlineSave fontSize="big" className="hover:bg-orange-400 rounded-full" />
              </IconButton>
                <IconButton onClick={() => onDeleteEntry(date, index, ea?.id)}>
                  <AiOutlineDelete fontSize="big" className="hover:bg-red-600 rounded-full" />
                </IconButton></div>}
            </Box>))}
          {curWeek === preWeek && getBtnBool() && <Button onClick={() => onAddEntry(date)} startIcon={<AiOutlinePlus />} variant="contained" color="primary" style={{ marginTop: 16 }}>
            Add Entry
          </Button>}
        </CardContent>
      )}
    </StyledCard>
  );
};

const TimeSelector = ({ val, onChange }) => (
  <div className="flex">
    <select
      name="hours"
      value={val.split(".")[0]}
      onChange={onChange}
      className="text-center border rounded px-2 py-1 mx-1 w-22"
    >
      {[...Array(12).keys()].map((hour) => (
        <option key={hour} value={hour}>
          {hour}
        </option>
      ))}
    </select>
    <span>:</span>
    <select
      name="minutes"
      value={val.split(".")[0]}
      onChange={onChange}
      className="text-center border rounded px-2 py-1 mx-1 w-22"
    >
      {[...Array(60).keys()].map((minute) => (
        <option key={minute} value={minute}>
          {minute}
        </option>
      ))}
    </select>
  </div>
);

const Dropdown = ({ options, name, onChange, value }) => (
  <select
    name={name}
    onChange={onChange}
    className="border rounded px-2 py-1"
    value={value}
  >
    <option value="">
      Select
    </option>
    {options.map((op) => (
      <option key={op} value={op.projectID}>
        {op.projectName}
      </option>
    ))};
  </select>
);

const Table1 = () => {
const [costCenters, setCostCenters] = useState([]);
  const currentWeekBtn = useRef(null);
  const [timesheet, setTimesheet] = useState({
    '2024-08-12': [{ project: 'Project A', activity: 'Development', hours: 8, description: '' }],
    '2024-08-13': [{ project: 'Project B', activity: 'Design', hours: 4, description: '' },
    { project: 'Project C', activity: 'Meeting', hours: 4, description: '' }],
    '2024-08-14': [],
    '2024-08-15': [],
    '2024-08-16': [],
    '2024-08-17': [],
    '2024-08-18': [],
  });
const fetchCostCenters = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BE_URL}/timesheet/costcenterlist/`,
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


useEffect(() => {

  fetchCostCenters();   
}, []);




const handleDataUpdation = (e, ind, date) => {

  const clone = [...masterData];

  const targetDateData = clone.find(sub => sub.date === date);
  if (!targetDateData) return;

  const targetData = targetDateData.data[ind];

  const { name, value } = e.target;

  if (name === "employee_costcenter") {
    targetData.employee_costcenter = Number(value);
  }

  else if (["project", "projectsubcode", "project_subcode_activity"].includes(name)) {
    const key = name === "project" ? "projectID" : "id";
    targetData[name][key] = value;
  }

  else if (name === "hours" || name === "minutes") {

    let hr = 0;
let mn = 0;


const current = targetData.hours || "00:00:00";
const [oldHr, oldMn] = current.split(":");

hr = parseInt(oldHr) || 0;
mn = parseInt(oldMn) || 0;


if (name === "hours") hr = parseInt(value);
if (name === "minutes") mn = parseInt(value);

    targetData.hours = dayjs()
      .hour(hr)
      .minute(mn)
      .second(0)
      .format("HH:mm:ss");
  }

  else {
    targetData[name] = value;
  }

  setMasterData(clone);
};

  // const handleDataUpdation = (e, ind, date) => {
  //   const clone = [...masterData];
  //   clone.forEach((sub, index) => {
  //     if (sub.date === date) {
  //       if (e.target.name === "project") {
  //         clone[index].data[ind].project.projectID = e.target.value;
  //       } else if (e.target.name === "projectsubcode") {
  //         clone[index].data[ind].projectsubcode.id = e.target.value;
  //       } else if (e.target.name === "project_subcode_activity") {
  //         clone[index].data[ind].project_subcode_activity.id = e.target.value;
  //       } else if (e.target.name === "hours") {
  //         if (clone[index]?.data?.[ind]?.hours !== null) {
  //           let val = clone[index]?.data?.[ind]?.hours;
  //           let mn = parseInt(val.toString().split(".")?.[1]);
  //           let newVal = `${e.target.value}.${mn}`;
  //           clone[index].data[ind].hours = parseFloat(newVal);
  //         } else if (clone[index]?.data?.[ind]?.hours === null) {
  //           clone[index].data[ind].hours = parseFloat(`${e.target.value}.${0}`);
  //         } else return 0;
  //       } else if (e.target.name === "minutes") {
  //         if (clone[index]?.data?.[ind]?.hours !== null) {
  //           let val = clone[index]?.data?.[ind]?.hours;
  //           let hr = parseInt(val.toString().split(".")?.[0]);
  //           let newVal = `${hr}.${e.target.value}`;
  //           clone[index].data[ind].hours = parseFloat(newVal);
  //         } else if (clone[index]?.data?.[ind]?.hours === null) {
  //           clone[index].data[ind].hours = parseFloat(`${0}.${e.target.value}`);
  //         } else return 0;
  //       } else {
  //         clone[index].data[ind] = {
  //           ...clone[index].data[ind],
  //           [e.target.name]: e.target.value
  //         }
  //       }
  //     }
  //   });
  //   setMasterData(masterData);
  // };

  const handleAddEntry = (date) => {
    const clone = [...masterData];

    clone.forEach(ea => {
      if (ea.date === date) {
        ea.data.push(
          {
            "id": null,
            "hours": "00:00:00",
            "bill": null,
            "location": "",
            "comment": "",
            "status": {
              "id": null,
              "statusName": "Open"
            },
            "project": {
              "projectID": null,
              "projectName": "",
              "projectCode": ""
            },
            "projectsubcode": {
              "id": null,
              "projectSubcode": ""
            },
            "project_subcode_activity": {
              "id": null,
              "activityCode": "",
              "name": ""
            },
            "employee": empid,
           employee_costcenter: null
          }
        );
      }
    });

    setMasterData(clone);

    // setTimesheet(prev => ({
    //   ...prev,
    //   [date]: [...prev[date], { project: '', activity: '', hours: 0, description: '' }]
    // }));
  };

  const handleUpdateEntry = (date, index, field, value) => {
    setTimesheet(prev => ({
      ...prev,
      [date]: prev[date].map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry
      )
    }));
  };



  

  const handleDataSave = async (date, index, id) => {
    const clone = [...masterData];
    const targetDateData = clone.find(sub => sub.date === date);
    if (!targetDateData) return;
    const targetData = targetDateData.data[index];

    if (id === null) {
      try {
        const response = await toast.promise(
          axios.post(`${process.env.REACT_APP_BE_URL}/timesheet/timesheetdata/`, {
            "date": date,
            "location": targetData.location,
            "hours": targetData.hours,
            "comment": targetData.comment,
            "employee_costcenter": targetData.employee_costcenter,
            "project": targetData.project.projectID,
            "projectsubcode": targetData.projectsubcode.id,
            "project_subcode_activity": targetData.project_subcode_activity.id,
            "year_week": `${currentYear}_${currentWeekNumber}`
          }, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
            },
          }),
          {
            pending: "Saving data..!",
          }
        );

        if (response.status === 201 && response.data.msg === "Timesheet data saved....") {
          toast.success("Data saved", {
            position: "top-center",
            transition: Zoom,
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          fetchCwData(currentWeek);
        }
      } catch (error) {
        toast.error("Error saving!", {
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
    } else if (id !== null) {
      try {
        const response = await toast.promise(
          axios.patch(`${process.env.REACT_APP_BE_URL}/timesheet/updatedata/${id}/`, {
            "date": date,
            "location": targetData.location,
            "hours": targetData.hours,
            "comment": targetData.comment,
            "employee_costcenter": targetData.employee_costcenter.id,
            "project": targetData.project.projectID,
            "projectsubcode": targetData.projectsubcode.id,
            "project_subcode_activity": targetData.project_subcode_activity.id,
            "year_week": `${currentYear}_${currentWeekNumber}`
          }, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
            },
          }),
          {
            pending: "Updating data..!",
          }
        );

        if (response.status === 200 && response.data.msg === "Timesheet data update ....") {
          toast.success("Data saved", {
            position: "top-center",
            transition: Zoom,
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          fetchCwData(currentWeek);
        }
      } catch (error) {
        toast.error("Error updating!", {
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
  };

  const handleDeleteEntry = async (date, index, id) => {

    try {
      const response = await toast.promise(
        axios.delete(`${process.env.REACT_APP_BE_URL}/timesheet/deletedata/${id}/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          },
        }),
        {
          pending: "Deleting data..!",
        }
      );

      if (response.status === 200 && response.data.msg === "Timesheet data delete ....") {
        toast.success("Deleted!!!", {
          position: "top-right",
          transition: Zoom,
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
      toast.error("Error Deleting!", {
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

    const clone = [...masterData];
    clone.forEach(ea => {
      if (ea.date === date) {
        ea.data.splice(index, 1);
      }
    });
    setMasterData(clone);
  };


const calculateWeekTotal = () => {
  let totalMinutes = 0;

  masterData.forEach(day => {
    day?.data.forEach(entry => {
      if (!entry.hours) return;

      const time = dayjs(`1970-01-01T${entry.hours}`);

      const hr = time.hour();
      const mn = time.minute();

      totalMinutes += (hr * 60) + mn;
    });
  });

  const totalHours = Math.floor(totalMinutes / 60);
  const totalMin = totalMinutes % 60;

  return `${totalHours} Hrs ${totalMin} Mn`;
};

  const [totalHours, setTotalHours] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeekNo, setCurrentWeekNo] = useState(0);
  const [currentCalenderWeek, setCurrentCalenderWeek] = useState(null);
  const [currentWeek, setCurrentWeek] = useState([]);
  const [empname, setEmpname] = useState("");
  const [empid, setEmpid] = useState("");
  const [department, setDepartment] = useState("");
  const [costcenter, setCostcenter] = useState("");
  const [pros, setPros] = useState([]);
  const [proSubs, setProSubs] = useState([]);
  const [proSubActs, setProSubActs] = useState([]);
  const [allProCompData, setAllProCompData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [curEditRow, setCurEditRow] = useState(null);
  const [holidays, setHolidays] = useState([
    { date: "2024-02-28", name: "IOP" },
    { date: "2024-03-08", name: "Maha Shivaratri" },
    { date: "2024-03-29", name: "XYZ" },
    { date: "2024-04-09", name: "Ugadi" },
    { date: "2024-05-01", name: "Labours Day" },
    { date: "2024-06-22", name: "ABC" },
    { date: "2024-07-09", name: "RTYU" },
    { date: "2024-08-15", name: "Independence Day" },
    { date: "2024-09-28", name: "LKG" },
    { date: "2024-10-02", name: "Gandhi Jayanti" },
    { date: "2024-11-03", name: "QWE" },
    { date: "2024-12-23", name: "DFG" },
    { date: "2024-12-29", name: "HJK" },
  ]);
  const [colorClass, setColorClass] = useState("");
  const [isWeekSubmitted, setIsWeekSubmitted] = useState(false);
  const [weeklyTotalHours, setWeeklyTotalHours] = useState("");
  const [monthlyTotalHours, setMonthlyTotalHours] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const [editableRows, setEditableRows] = useState(
    Array(currentWeek.length).fill(true)
  );

  const handleFreeze = (index) => {
    const updatedWeek = [...currentWeek];
    updatedWeek[index].status = "Holiday";

    setCurrentWeek(updatedWeek);

    setEditableRows((prevEditableRows) => {
      const updatedEditableRows = [...prevEditableRows];
      updatedEditableRows[index] = false;
      return updatedEditableRows;
    });
  };

  // added 24/3
    const activeProjects = allProCompData.filter((obj) => {
    const projectKey = Object.keys(obj)?.[0];
    return obj[projectKey].status === false;
  });

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
          setEmpname(response.data.name);
          setEmpid(response.data.empID);
          setDepartment(response.data.department.name);
          setCostcenter( response.data.costcenter
    ? `${response.data.costcenter.number}_${response.data.costcenter.name}`
    : "N/A");
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
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   const fetchPros = async () => {
  //     try {
  //       const response = await toast.promise(
  //         axios.get("${process.env.REACT_APP_BE_URL}/project/getprojectname/", {
  //           headers: {
  //             Accept: "application/json",
  //             Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
  //           },
  //         }),
  //         {
  //           pending: "Getting Project data..!",

  //         }
  //       );

  //       if (response.status === 200) {
  //         setPros(response.data.msg);
  //       }
  //     } catch (error) {
  //       toast.error("Error retrieving projects!", {
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
  //   fetchPros();
  // }, []);

  useEffect(() => {
    const fetchProsubs = async () => {
      try {
        const response = await toast.promise(
          axios.get(`${process.env.REACT_APP_BE_URL}/project/detail/`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
            },
          }),
          {
            pending: "Getting Projects..!",
          }
        );

        if (response.status === 200) {
          setAllProCompData(response.data.msg);
        }
      } catch (error) {
        toast.error("Error retrieving projects!", {
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
    fetchProsubs();
  }, []);

  const handleEditClick = (index) => {
    if (
      !isWeekSubmitted &&
      !currentWeek[index].isHoliday &&
      currentWeek[index].dayName !== "Saturday" &&
      currentWeek[index].dayName !== "Sunday"
    ) {
      setEditableRows((prevEditableRows) => {
        const updatedEditableRows = [...prevEditableRows];
        updatedEditableRows[index] = true;
        return updatedEditableRows;
      });
    } else {
      alert("Editing is not allowed on holidays, Saturdays, and Sundays.");
    }
  };

  useEffect(() => {
    setCurrentWeek(getWeekData(currentDate));
    const week = [...Array(7).keys()].map((i) => {
      setEditableRows((prevEditableRows) => {
        const updatedEditableRows = [...prevEditableRows];
        updatedEditableRows[i] = true;
        return updatedEditableRows;
      });
    });
    fetchCwData(getWeekData(currentDate));
    // insertIr(getWeekData(currentDate));
  }, [currentDate]);

  useEffect(() => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const week = [...Array(7).keys()].map((i) => {
      const day = addDays(weekStart, i);
      return {
        dayName: format(day, "EEEE"),
        date: format(day, "dd-MM-yyyy"),
        isCurrentDay: isToday(day),
        time: { hours: "00", minutes: "00" },
        project: "",
        projectSubcode: "",
        Activity: "",
        location: "",
        // bill: "",
        comment: "",
        status: "Open",
        isHoliday:
          isHoliday(format(day, "yyyy-MM-dd")) ||
          isSaturday(day) ||
          isSunday(day),
      };
    });
    week.forEach((day, index) => {
      if (day.isCurrentDay) setCurEditRow(index);
    });
    setCurrentWeek(week);
    // fetchCwData(week);
    // console.log("WEEK", week);
  }, []);

  const isHoliday = (dateString) => {
    return holidays.some((holiday) => holiday.date === dateString);
  };

  const handleBillChange = (index, e) => {
    const { value } = e.target;
    setCurrentWeek((currentWeek) => {
      const updatedWeek = [...currentWeek];
      updatedWeek[index].bill = value;
      return updatedWeek;
    });
  };

  const handleTimeChange = (index, e) => {
    const { name, value } = e.target;
    setCurrentWeek((currentWeek) => {
      const updatedWeek = [...currentWeek];
      if (name === "hours" || name === "minutes") {
        updatedWeek[index].time[name] = value;
      } else {
        updatedWeek[index][name] = value;
      }
      return updatedWeek;
    });
  };

  // const addNewRowBelow = (index) => {
  //   setCurrentWeek((currentWeek) => {
  //     const newRow = {
  //       time: { hours: "00", minutes: "00" },
  //       project: "",
  //       projectSubcode: "",
  //       Activity: "",
  //       location: "",
  //       // bill: "",
  //       comment: "",
  //       status: "Open",
  //       isHoliday: currentWeek[index].isHoliday,
  //     };
  //     currentWeek.splice(index + 1, 0, newRow);
  //     return [...currentWeek];
  //   });
  //   console.log([currentWeek]);
  // };
  const addNewRowBelow = (index) => {
    setCurrentWeek((currentWeek) => {
      const newRow = {
        time: { hours: "00", minutes: "00" },
        project: "",
        projectSubcode: "",
        Activity: "",
        location: "",
        comment: "",
        status: "Open",
        isHoliday: currentWeek[index].isHoliday,
      };
      const updatedWeek = [...currentWeek];
      updatedWeek.splice(index + 1, 0, newRow);
      return updatedWeek;
    });
    setEditableRows((prevEditableRows) => {
      const updatedEditableRows = [...prevEditableRows];
      updatedEditableRows.splice(index + 1, 0, true);
      return updatedEditableRows;
    });
  };

  const deleteRow = (index) => {
    setCurrentWeek((currentWeek) => {
      if (currentWeek.length > 1) {
        currentWeek.splice(index, 1);
      }
      return [...currentWeek];
    });
    alert("Delete Row");
  };

  const saveRow = (index) => {
    const row = currentWeek[index];
    if (
      row.time &&
      row.project &&
      row.projectSubcode &&
      row.Activity &&
      row.location &&
      // row.bill &&
      row.comment
    ) {
      const updatedWeek = [...currentWeek];
      updatedWeek[index].status = "Saved";
      setCurrentWeek(updatedWeek);
      setEditableRows((prevEditableRows) => {
        const updatedEditableRows = [...prevEditableRows];
        updatedEditableRows[index] = false;
        return updatedEditableRows;
      });
    } else {
      alert("Please fill all the fields before saving.");
    }
  };
  const submitWeek = (setSubmittedWeeks) => {
    let allFieldsFilled = true;
    const updatedWeek = currentWeek.map((day) => {
      if (
        day.time &&
        day.project &&
        day.projectSubcode &&
        day.Activity &&
        day.location &&
        day.comment &&
        day.status === "Holiday"
      ) {
        return { ...day, status: "Submitted", color: "green" };
      } else {
        allFieldsFilled = false;
        return day;
      }
    });

    if (!allFieldsFilled) {
      alert("Please ensure all days are marked as Holiday before submitting.");
    } else {
      setIsWeekSubmitted(true);
      setSubmittedWeeks((prevSubmittedWeeks) => [
        ...prevSubmittedWeeks,
        updatedWeek,
      ]);
    }
  };

  const goToPreviousWeek = () => {
    console.log("Previous week button clicked");
    const prevWeekDate = subWeeks(currentDate, 1);
    const prevWeekNo = getISOWeek(prevWeekDate);
    setCurrentDate(prevWeekDate);
    setCurrentWeekNo(prevWeekNo);
  };

  const goToNextWeek = () => {
    const nextWeekDate = addWeeks(currentDate, 1);
    const nextWeekNo = getISOWeek(nextWeekDate);
    if (nextWeekNo <= currentWeekNumber) {
      setCurrentDate(nextWeekDate);
      setCurrentWeekNo(nextWeekNo);
    }
  };

  const goToCurrentWeek = () => {
    setCurrentDate(new Date());
    setCurrentWeekNo(currentWeekNumber);
  };

  const getWeekData = (date) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    return [...Array(7).keys()].map((i) => {
      const day = addDays(weekStart, i);
      const isSaturday = format(day, "EEEE") === "Saturday";
      const isSunday = format(day, "EEEE") === "Sunday";
      return {
        dayName: format(day, "EEEE"),
        date: format(day, "dd-MM-yyyy"),
        isCurrentDay: isToday(day),
        isHoliday:
          isSaturday || isSunday || isHoliday(format(day, "yyyy-MM-dd")),
        time: { hours: "00", minutes: "00" },
        project: "",
        projectSubcode: "",
        location: "",
        // bill: "",
        comment: "",
        status: "Open",
      };
    });
  };

  const calculateTotalHours = () => {
    let totalHours = 0;
    let totalMinutes = 0;

    currentWeek.forEach((day) => {
      const hours = parseFloat(day.time.hours);
      const minutes = parseFloat(day.time.minutes);

      if (!isNaN(hours)) {
        totalHours += Math.floor(hours);
        totalMinutes += Math.round((hours - Math.floor(hours)) * 60);
      }

      if (!isNaN(minutes)) {
        totalMinutes += Math.floor(minutes);
      }
    });

    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    setTotalHours(`${totalHours}:${totalMinutes.toString().padStart(2, "0")}`);

    if (totalHours >= 50) {
      setColorClass("bg-green-500");
    } else if (totalHours >= 35) {
      setColorClass("bg-orange-500");
    } else if (totalHours >= 20) {
      setColorClass("bg-red-500");
    } else {
      setColorClass("");
    }
  };

  const checkCompletion = () => {
    if (
      currentWeek.length === 6 &&
      currentWeek.every(
        (entry) =>
          entry.time &&
          entry.project &&
          entry.projectSubcode &&
          entry.Activity &&
          entry.location &&
          entry.comment
      )
    ) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  };

  useEffect(() => {
    calculateTotalHours();
    checkCompletion();
  }, [currentWeek]);

  const calculateMonthlyTotalHours = () => {
    let totalHours = 0;

    currentWeek.forEach((day) => {
      const dayMonth = new Date(day.date).getMonth();
      if (dayMonth === currentMonth) {
        const hours = parseFloat(day.time.hours);
        const minutes = parseFloat(day.time.minutes);
        let dayTotalHours = hours + minutes / 60;
        totalHours += dayTotalHours;
      }
    });
    setMonthlyTotalHours(totalHours.toFixed(2));
  };

  useEffect(() => {
    calculateTotalHours();
    calculateMonthlyTotalHours();
    checkCompletion();
  }, [currentWeek, currentMonth]);

  const currentYear = new Date().getFullYear();
  const currentWeekNumber = getISOWeek(new Date());

  useEffect(() => {
    setCurrentWeekNo(currentWeekNumber);
  }, []);

  const getTableDataAsJSON = () => {
    const currentMonthData = [];
    const startDate = startOfMonth(new Date());
    const endDate = endOfMonth(new Date());
    let currentDate = startDate;
    while (currentDate <= endDate) {
      const day = {
        dayName: format(currentDate, "EEEE"),
        date: format(currentDate, "dd-MM-yyyy"),
        isCurrentDay: isToday(currentDate),
        isHoliday: isHoliday(format(currentDate, "yyyy-MM-dd")),
        time: { hours: "00", minutes: "00" },
        project: "",
        projectSubcode: "",
        Activity: "",
        location: "",
        comment: "",
        status: "Open",
      };

      currentMonthData.push(day);
      currentDate = addDays(currentDate, 1);
    }

    const tableData = currentMonthData.map((day) => ({
      DayName: day.dayName,
      Date: day.date,
      Time: `${day.time.hours.toString().padStart(2, "0")}:${day.time.minutes
        .toString()
        .padStart(2, "0")}`,
      Project: day.project,
      ProjectSubcode: day.projectSubcode,
      Activity: day.Activity,
      Location: day.location,
      Comment: day.comment,
      Status: day.status,
    }));
    // const tableData = currentWeek.map((day) => ({
    //   DayName: day.dayName,
    //   Date: day.date,
    //   Time: `${day.time.hours.toString().padStart(2, "0")}:${day.time.minutes
    //     .toString()
    //     .padStart(2, "0")}`,
    //   Project: day.project,
    //   ProjectSubcode: day.projectSubcode,
    //   Activity: day.Activity,
    //   Location: day.location,
    //   Comment: day.comment,
    //   Status: day.status,
    // }));

    return JSON.stringify(tableData, null, 2);
  };

  // const getTableDataAsJSON = () => {
  //   const tableData = currentWeek.map((day) => ({
  //     DayName: day.dayName,
  //     Date: day.date,
  //     Time: `${day.time.hours.toString().padStart(2, "0")}:${day.time.minutes
  //       .toString()
  //       .padStart(2, "0")}`,
  //     Project: day.project,
  //     ProjectSubcode: day.projectSubcode,
  //     Activity: day.Activity,
  //     Location: day.location,
  //     Comment: day.comment,
  //     Status: day.status,
  //   }));
  //   return JSON.stringify(tableData, null, 2);
  // };

  // const handleExportJSON = () => {
  //   const jsonData = getTableDataAsJSON();
  //   console.log(jsonData);
  // };

  const handleExportExcel = () => {
    const jsonData = getTableDataAsJSON();
    const tableData = JSON.parse(jsonData);
    const ws = utils.json_to_sheet(tableData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Table Data");
    writeFile(wb, "table_data.xlsx");
  };

  const insertIr = (data, wd) => {
    const clone = wd.map(eac => ({
      date: `${eac.date.split("-")[2]}-${eac.date.split("-")[1]}-${eac.date.split("-")[0]}`,
      year_week: `${currentYear}_${currentWeekNumber}`,
      data: []
    }));

    const dateMap = new Map();
    clone.forEach(ea => dateMap.set(ea.date, ea));

    data.forEach(eac => {
      const match = dateMap.get(eac.date);
      if (match) {
        match.data.push({
          ...eac,
          date: undefined,
          year_week: undefined
        });
      }
    });

    console.log("Processed", clone);
    setMasterData(clone);
    toast.info("Data Retrieved")
  };

  const fetchCwData = async (wd) => {
    try {
      const response = await toast.promise(
        axios.get(`${process.env.REACT_APP_BE_URL}/timesheet/retriveparticularweekdata/${`${currentYear}_${currentWeekNo}`}/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          },
        }),
        {
          pending: "Getting Weekly data..!",
        }
      );

      if (response.status === 200) {
        insertIr(response.data.msg, wd);
        // toast("Data Available");
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

  // const handleProSelection = (e, i) => {
  //   let clone = [...masterData];

  //   clone.forEach((ob, index) => {
  //     if (index === i) {
  //       ob.project.projectID = parseInt(e.target.value);
  //     }
  //   })
  //   setMasterData(clone);
  // };

  const getSubmitBtnBool = () => {
    let bool = false;
    masterData?.forEach(ea => {
      ea?.data.forEach(sub => {
        if (sub?.status?.id === 2 || sub?.status?.id === 3 || sub?.status?.id === 4) bool = true;
      });
    });
    return bool;
  };

  const getProgressBarStyles = () => {
    let st = "dk";
    masterData?.forEach(ea => {
      ea?.data.forEach(sub => {
        if (sub?.status?.id === null) return st = "Open"
        else if (sub?.status?.id === 1) return st = "Saved"
        else if (sub?.status?.id === 2) return st = "Submit"
        else if (sub?.status?.id === 3) return st = "ManagerReviewed"
        else if (sub?.status?.id === 4) return st = "AdminReviewed"
      });
    });

    switch (st) {
      case 'Open':
        return [{ width: '100%', backgroundColor: '#94a3b8' }]; //slate
      case 'Saved':
        return [{ width: '100%', backgroundColor: '#3B82F6', status: 'YET TO SUBMIT' }]; // blue-500
      case 'Submit':
        return [{ width: '100%', backgroundColor: '#F97316', status: 'MANAGER APPROVAL PENDING' }]; // orange-500
      case 'ManagerReviewed':
        return [
          { width: '50%', backgroundColor: '#F97316' }, // orange-500
          { width: '50%', backgroundColor: '#22C55E' }, // green-500
        ];
      case 'AdminReviewed':
        return [{ width: '100%', backgroundColor: '#22C55E', status: 'ADMIN APPROVED' }]; // green-500
      // case 'AdminReviewed': for rejected case
      //   return [{ width: '100%', backgroundColor: '#EF4444' }];
      case 'dk':
        return [{ width: '100%', backgroundColor: 'gray' }]; // red-500
      default:
        return [];
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await toast.promise(
        axios.post(`${process.env.REACT_APP_BE_URL}/timesheet/weekreport/`, {
          "year_week": `${currentYear}_${currentWeekNumber}`
        }, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          },
        }),
        {
          pending: "Submitting..!",
        }
      );

      if (response.status === 200) {
        toast.success("Submitted for Manager approval!", {
          position: "top-right",
          transition: Flip,
          autoClose: 1600,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error submitting!", {
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
    // Your submit logic here
  };
  // useEffect(() => {
  //   fetchCwData();
  // }, []);

  // useEffect(() => {
  //   console.log("Week", currentWeek, "MD", masterData);
  //   // console.log("CDate", currentDate);
  // }, [currentWeek, masterData]);

  useEffect(() => {
    const btnRef = currentWeekBtn;
    if (btnRef === null) return;
    btnRef.current.click();
  }, []);

  // useEffect(() => {
  //   setCurrentCalenderWeek(currentWeekNumber);
  //   console.log("Type CCW", typeof currentWeekNumber);
  //   console.log("CCW", currentWeekNumber);
  // }, []);

  return (
    // <div className="flex flex-1 max-h-screen bg-sky-50">
    //   <Dashboard />
    //   <main className="flex-1 p-2 bg-sky-50 border-5 shadow-sky-400 shadow-md w-fit">
    //     <Box className="timesheet-container  mx-auto p-8 bg-sky-500 rounded-lg shadow-xl font-['Poppins', 'sans-serif']">
    //       <Box className="timesheet-content bg-white p-4 rounded-lg shadow-md">
    //         <Grid container spacing={6}>
    //           <Grid item xs={12} sm={6} md={3}>
    //             <Box className="employee-info flex items-center text-gray-600">
    //               <FaUserAlt className="mr-2 text-[#5E35B1]" />
    //               <Typography variant="h6">Emp ID: <span className="font-bold">{empid}</span></Typography>
    //             </Box>
    //           </Grid>
    //           <Grid item xs={12} sm={6} md={3}>
    //             <Box className="employee-info flex items-center text-gray-600">
    //               <FaUserAlt className="mr-2 text-[#5E35B1]" />
    //               <Typography variant="h6">Emp Name: <span className="font-bold">{empname}</span></Typography>
    //             </Box>
    //           </Grid>
    //           <Grid item xs={12} sm={6} md={3}>
    //             <Box className="employee-info flex items-center text-gray-600">
    //               <FaClipboardList className="mr-2 text-[#5E35B1]" />
    //               <Typography variant="h6">Department: <span className="font-bold">{department}</span></Typography>
    //             </Box>
    //           </Grid>
    //           <Grid item xs={12} sm={6} md={3}>
    //             <Box className="employee-info flex items-center text-gray-600">
    //               <FaMoneyBillAlt className="mr-2 text-[#5E35B1]" />
    //               <Typography variant="h6">Cost Center: <span className="font-bold">{costcenter}</span></Typography>
    //             </Box>
    //           </Grid>
    //         </Grid>
    //         <Box className="timesheet-controls flex justify-between items-center mt-8">
    //           <Box className="week-selector flex items-center gap-2">
    //             <Button variant="contained" className="mr-4 bg-[#673AB7] hover:bg-[#512DA8] text-white" onClick={() => goToPreviousWeek()}>
    //               <FaCalendarAlt className="mr-2" />
    //               Previous Week
    //             </Button>
    //             <Button variant="contained" className="mr-4 bg-[#673AB7] hover:bg-[#512DA8] text-white" onClick={() => goToCurrentWeek()} ref={currentWeekBtn}>
    //               <FaCalendarAlt className="mr-2" />
    //               Current Week
    //             </Button>
    //             {/* <Typography className="font-bold text-gray-800">CW</Typography> */}
    //             <Button variant="contained" className="ml-4 bg-[#673AB7] hover:bg-[#512DA8] text-white" onClick={() => goToNextWeek()}>
    //               Next Week
    //               <FaCalendarAlt className="ml-2" />
    //             </Button>
    //           </Box>
    //           <Button variant="outlined" className="ml-4 bg-[#673AB7] hover:bg-[#512DA8] text-white border-b-2 rounded-lg shadow-lg">
    //             <b><em>{`${currentYear}_${currentWeekNumber}`}</em></b>
    //           </Button>
    //           <Box className="submit-button">
    //             <Button variant="contained" className="submit-btn bg-[#673AB7] hover:bg-[#512DA8] text-white" style={{ borderBottom: '1px solid black' }}>
    //               Submit
    //               <FaClipboardList className="ml-2" />
    //             </Button>
    //           </Box>
    //         </Box>
    //       </Box>
    //     </Box>
    //     <div className="overflow-y-scroll w-full max-h-screen">
    //       <Box margin="auto" p={4} width="full" height="full">
    //         <Typography variant="h4" fontWeight="bold" mb={4}>Weekly Timesheet</Typography>
    //         {masterData.length > 0 && masterData.map((eac) => (
    //           <DayCard
    //             key={eac?.date}
    //             date={eac?.date}
    //             eac={eac}
    //             onAddEntry={handleAddEntry}
    //             onUpdateEntry={handleUpdateEntry}
    //             onDeleteEntry={handleDeleteEntry}
    //             onSaveEntry={handleDataSave}
    //             allProCompData={allProCompData}
    //             handleChangeDd={handleDataUpdation}
    //             comp={masterData}
    //           />
    //         ))}
    //         <Card>
    //           <CardContent>
    //             <Box display="flex" justifyContent="space-between" alignItems="center">
    //               <Typography variant="h6" fontWeight="bold">Week Total</Typography>
    //               <Typography variant="h5" fontWeight="bold">{calculateWeekTotal()} hours</Typography>
    //             </Box>
    //           </CardContent>
    //         </Card>
    //       </Box>
    //     </div>
    //   </main>
    //   < ToastContainer />
    // </div>
    <div className="flex flex-col lg:flex-row max-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 overflow-clip">
      <Dashboard />
      <main className="flex-1 p-2 sm:p-3 md:p-4 h-screen overflow-hidden pt-16 lg:pt-2">
        {/* Header Card */}
        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl mb-2 sm:mb-3 md:mb-4 overflow-hidden">
          {/* Employee Info Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-2 sm:p-3 md:p-4">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <div className="flex items-center gap-2 text-white">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <FaRegIdCard className="text-white" fontSize={18} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-blue-100">Emp ID</p>
                    <p className="text-sm sm:text-base font-bold">{empid}</p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="flex items-center gap-2 text-white">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <FaUserCircle className="text-white" fontSize={18} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-blue-100">Emp Name</p>
                    <p className="text-sm sm:text-base font-bold">{empname}</p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="flex items-center gap-2 text-white">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <FcDepartment className="text-white" fontSize={18} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-blue-100">Cost Center</p>
                    <p className="text-sm sm:text-base font-bold">{costcenter}</p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          
          {/* Navigation Controls */}
          <div className="p-2 sm:p-3 md:p-4 flex flex-col lg:flex-row justify-between items-center gap-2 sm:gap-3">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              <button
                className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all flex items-center gap-1 sm:gap-2"
                onClick={goToPreviousWeek}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">PREVIOUS WEEK</span>
                <span className="sm:hidden">PREV</span>
              </button>
              <button
                className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base bg-white border-2 border-blue-500 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-50 transform hover:scale-105 transition-all flex items-center gap-1 sm:gap-2"
                onClick={goToCurrentWeek}
                ref={currentWeekBtn}
              >
                <FaCalendarAlt className="text-sm sm:text-base" />
                <span className="hidden sm:inline">CURRENT WEEK</span>
                <span className="sm:hidden">NOW</span>
              </button>
              <button
                className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all flex items-center gap-1 sm:gap-2"
                onClick={goToNextWeek}
              >
                <span className="hidden sm:inline">NEXT WEEK</span>
                <span className="sm:hidden">NEXT</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              {currentWeekNo === currentWeekNumber && !getSubmitBtnBool() &&
                <DoubleConfirmationDialog onSubmit={(e) => handleSubmit(e)} />
              }
              {currentWeekNo === currentWeekNumber && getSubmitBtnBool() &&
                <button
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg shadow-md flex items-center gap-1 sm:gap-2 ${getSubmitBtnBool() && 'animate-pulse cursor-not-allowed'}`}
                  disabled={getSubmitBtnBool()}
                >
                  {getSubmitBtnBool() ? <IoMdDoneAll className="text-base sm:text-lg" /> : <BiArchiveOut className="text-base sm:text-lg" />}
                  {getSubmitBtnBool() ? 'SUBMITTED' : 'SUBMIT'}
                </button>
              }
            </div>
          </div>
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
          {/* Calendar Week Card */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg sm:rounded-xl shadow-xl p-3 sm:p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-orange-100 uppercase tracking-wider mb-1">Calendar Week</p>
                <p className="text-3xl sm:text-4xl font-extrabold">{currentWeekNo}</p>
                <p className="text-xs font-medium text-orange-100 mt-2">
                  {masterData.length > 0 && `${masterData?.[0]?.date.split("-")?.[2]}.${masterData?.[0]?.date.split("-")?.[1]}.${masterData?.[0]?.date.split("-")?.[0]}`} - {masterData.length > 0 && `${masterData?.[masterData.length - 1]?.date.split("-")?.[2]}.${masterData?.[masterData.length - 1]?.date.split("-")?.[1]}.${masterData?.[masterData.length - 1]?.date.split("-")?.[0]}`}
                </p>
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FaCalendarAlt className="text-2xl sm:text-3xl" />
              </div>
            </div>
          </div>
          
          {/* Weekly Summary Card */}
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-lg sm:rounded-xl shadow-xl p-3 sm:p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-green-100 uppercase tracking-wider mb-1">Weekly Work Summary</p>
                <p className="text-3xl sm:text-4xl font-extrabold">{calculateWeekTotal()}</p>
                <p className="text-xs font-medium text-green-100 mt-2">Total Hours</p>
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FaClipboardList className="text-2xl sm:text-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-full h-max">
          <Box margin="auto" p={2} width="full" height="100vh" overflow="auto" style={{overflow: "scroll"}}>
            {masterData.length > 0 && masterData.map((eac) => (
              <DayCard
                key={eac?.date}
                date={eac?.date}
                eac={eac}
                onAddEntry={handleAddEntry}
                onUpdateEntry={handleUpdateEntry}
                onDeleteEntry={handleDeleteEntry}
                onSaveEntry={handleDataSave}
                allProCompData={allProCompData}
                handleChangeDd={handleDataUpdation}
                comp={masterData}
                preWeek={currentWeekNumber}
                curWeek={currentWeekNo}
              />
            ))}
          </Box>
        </div> */}
        {/* Status Progress Bar */}
        <div className="bg-white rounded-lg shadow-lg p-2 sm:p-3 mb-2 sm:mb-3">
          <div className="w-full bg-gray-200 rounded-full h-6 sm:h-7 overflow-hidden flex">
            {getProgressBarStyles().map((style, index) => (
              <div
                key={index}
                className="h-full transition-all duration-500 ease-in-out flex justify-center items-center tracking-widest font-bold text-white text-xs sm:text-sm"
                style={{
                  width: style.width,
                  backgroundColor: style.backgroundColor,
                }}
              >
                <p className="tracking-wider font-semibold text-xs sm:text-sm">{style?.status}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Timesheet Days Container */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-xl p-2" style={{ height: "calc(100vh - 380px)", overflowY: "auto" }}>
          <Box
            margin="auto"
            p={1}
            width="100%"
            height="100%"
            overflow="auto"
          >
            {masterData.length > 0 && masterData.map((eac) => (
              <DayCard
                key={eac?.date}
                date={eac?.date}
                eac={eac}
                onAddEntry={handleAddEntry}
                onUpdateEntry={handleUpdateEntry}
                onDeleteEntry={handleDeleteEntry}
                onSaveEntry={handleDataSave}
                allProCompData={allProCompData}
                costCenters={costCenters}
                handleChangeDd={handleDataUpdation}
                comp={masterData}
                preWeek={currentWeekNumber}
                curWeek={currentWeekNo}
                activeProjects={activeProjects}
              />
            ))}
          </Box>
        </div>

      </main>
    </div>

  );
};
export default Table1;
