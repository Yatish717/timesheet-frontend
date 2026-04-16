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
import { FaArrowCircleDown, FaRegIdCard, FaUser, FaUserCircle, FaCalendarAlt, FaClipboardList } from "react-icons/fa";
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
import { FaUserAlt, FaMoneyBillAlt } from 'react-icons/fa';
import { Fullscreen } from "lucide-react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from "@mui/material/colors";
import { FcApproval, FcApprove, FcDepartment, FcDisapprove } from "react-icons/fc";
import { animate } from "framer-motion";
import { IoMdDoneAll } from "react-icons/io";
import { BiArchiveOut } from "react-icons/bi";
import DoubleConfirmationDialog from './DoubleConfirmationDialog';
import { useLocation } from "react-router-dom";
import { Approval } from "@mui/icons-material";

const colorPalette = [
    '#bbdefb', '#c8e6c9', '#fff9c4', '#ffcdd2',
    '#e1bee7', '#f8bbd0', '#c5cae9', '#b2dfdb',
    '#90caf9', '#a5d6a7', '#fff59d', '#ffab91',
    '#ce93d8', '#f48fb1', '#9fa8da', '#80cbc4'
];

const colorForEven = '#bbdefb';
const colorForOdd = '#c8e6c9';

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
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

const DayCard = ({ date, eac, onAddEntry, onUpdateEntry, onDeleteEntry, onSaveEntry, allProCompData, handleChangeDd, comp, preWeek, curWeek }) => {
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
    
      const progress = Math.min(((totalHours + totalMin / 60) / 9) * 100, 100);  // 9-hour working
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
                        <Typography variant="h6" display="flex" alignItems="center" className={`${isToday(date) ? 'bg-slate-300' : 'bg-white'} p-1 `}>
                            <AiOutlineCalendar fontSize="small" style={{ marginRight: 6 }} />
                            {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="subtitle1" fontWeight="bold" style={{ marginRight: 16 }}>
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
                        <Box display="flex" alignItems="center" mb={1} p={1} borderRadius={1} className="bg-gray-100" boxShadow={2}>
                            {/* <CheckCircleIcon style={{ color: '#fff', marginRight: 8 }} />  */}
                            <Chip
                                label={ea?.status?.statusName}
                               className="bg-gray-200 text-gray-700 font-bold"
                                style={{
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
                                    disabled
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
                                    disabled
                                    onChange={(e) => handleChangeDd(e, index, date)}>
                                    {[...Array(60).keys()].map((minute) => {
                                        if (minute % 5 === 0 && minute !== 10 && minute !== 20 && minute !== 30 && minute !== 40 && minute !== 50)
                                            return (
                                                <MenuItem key={minute} value={minute}>
                                                    {minute}
                                                </MenuItem>
                                            )
                                    })}
                                </Select>
                            </FormControl>

                          <FormControl className="w-48" style={{ marginRight: 8 }}>
    <InputLabel>Cost Center</InputLabel>
    <Select
        value={ea?.employee_costcenter?.id || ""}
        label="Cost Center"
        disabled
    >
        <MenuItem value={ea?.employee_costcenter?.id}>
            {ea?.employee_costcenter
                ? `${ea.employee_costcenter.number} - ${ea.employee_costcenter.name}`
                : "N/A"}
        </MenuItem>
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
                                    disabled
                                    onChange={(e) => handleChangeDd(e, index, date)}
                                >
                                    <MenuItem key={"first"} value="" disabled>
                                        Select
                                    </MenuItem>
                                    {allProCompData.map((obj) => {
                                        const projectKey = Object.keys(obj)?.[0];
                                        const project = obj?.[projectKey];
                                        const projectID = project?.projectID;
                                        const projectName = project?.projectName;
                                        return (
                                            <MenuItem key={projectID} value={projectID}>
                                                {projectName}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl className="w-48" style={{ marginRight: 8 }}>
                                <InputLabel id="demo-simple-select-label">Subcode</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={ea?.projectsubcode?.id}
                                    label="Select Sub Project"
                                    name="projectsubcode"
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                disabled
                            />
                            {/* {curWeek === preWeek && (ea?.status?.statusName === "Save" || ea?.status?.statusName === "Open") && <div className="flex flex-col"><IconButton onClick={() => onSaveEntry(date, index, ea?.id)}>
                                <AiOutlineSave fontSize="big" className="hover:bg-orange-400 rounded-full" />
                            </IconButton>
                                <IconButton onClick={() => onDeleteEntry(date, index, ea?.id)}>
                                    <AiOutlineDelete fontSize="big" className="hover:bg-red-600 rounded-full" />
                                </IconButton></div>} */}
                        </Box>))}
                    {/* {curWeek === preWeek && getBtnBool() && <Button onClick={() => onAddEntry(date)} startIcon={<AiOutlinePlus />} variant="contained" color="primary" style={{ marginTop: 16 }}>
                        Add Entry
                    </Button>} */}
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

const WeeEmpAppr = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const pId = params.get("pID");
    const eId = params.get("eID");
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

    const [onApp, setOnApp] = useState(false);
    const [onRej, setOnRej] = useState(false);

    const handleDataUpdation = (e, ind, date) => {
        const clone = [...masterData];

        const targetDateData = clone.find(sub => sub.date === date);
        if (!targetDateData) return;

        const targetData = targetDateData.data[ind];
        const { name, value } = e.target;

        if (["project", "projectsubcode", "project_subcode_activity"].includes(name)) {
            const key = name === "project" ? "projectID" : "id";
            targetData[name][key] = value;
        } else if (name === "hours" || name === "minutes") {
            let [hr, mn] = targetData.hours ? targetData.hours.toString().split(".") : [0, 0];
            hr = name === "hours" ? value : parseInt(hr);
            mn = name === "minutes" ? value : parseInt(mn);
            // if (mn === undefined) {
            //   name === "minutes" ? mn = value : mn = 0;
            // }else name === "minutes" ? mn = value : mn = parseInt(mn);
            // targetData.hours = parseFloat(`${hr}.${mn === undefined ? 0 : mn}`);
            // targetData.hours = hr+`.`+mn;
            if (mn === undefined || mn === NaN || mn === 0) targetData.hours = hr + 0.0;
            else targetData.hours = parseFloat(`${hr}.${mn}`);
        } else {
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
                        "hours": 0.0,
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
                        "employee": "",
                        "employee_costcenter": {
                            "id": null,
                            "name": "",
                            "number": ""
                        }
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
                        pending: "Saving data..!",
                    }
                );

                if (response.status === 201 && response.data.msg === "Timesheet data saved....") {
                    toast.success("Saved!!!", {
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
                    toast.success("Updated!!!", {
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
    // const [empname, setEmpname] = useState("");
    // const [empid, setEmpid] = useState("");
    // const [department, setDepartment] = useState("");
    // const [costcenter, setCostcenter] = useState("");
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
                    // setEmpname(response.data.name);
                    // setEmpid(response.data.empID);
                    // setDepartment(response.data.department.name);
                    // setCostcenter(response.data.costcenter.name);
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
                // console.log(error);
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
        const prevWeekDate = subWeeks(currentDate, 1);
        const prevWeekNo = getISOWeek(prevWeekDate);
        if (prevWeekNo >= 1) {
            setCurrentDate(prevWeekDate);
            setCurrentWeekNo(prevWeekNo);
        }
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
        if (data[`${currentYear}_${currentWeekNo}`].length === 0) toast.info("No Data Available");
        const clone = wd.map(eac => ({
            date: `${eac.date.split("-")[2]}-${eac.date.split("-")[1]}-${eac.date.split("-")[0]}`,
            year_week: `${currentYear}_${currentWeekNumber}`,
            data: []
        }));

        const dateMap = new Map();
        clone.forEach(ea => dateMap.set(ea.date, ea));

        data[`${currentYear}_${currentWeekNo}`].forEach(eac => {
            const match = dateMap.get(eac.date);
            if (match) {
                match.data.push({
                    ...eac,
                    
                    date: undefined,
                    year_week: undefined
                });
            }
        });

        // console.log("Processed", clone);
        setMasterData(clone);
        toast.info("User Data Retrieved");
    };

    const fetchCwData = async (wd) => {
        try {
            const response = await toast.promise(
                axios.get(`${process.env.REACT_APP_BE_URL}/timesheet/managergetdataweek/${pId}/${eId}/${`${currentYear}_${currentWeekNo}`}/`, {
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

    const handleApproval = async (par) => {
        if (par === "Acc") {
            try {
                const response = await toast.promise(
                    axios.post(`${process.env.REACT_APP_BE_URL}/timesheet/managerapprove/`, {
                        "employee_id": eId,
                        "approve": "True",
                        "year_week": `${currentYear}_${currentWeekNo}`
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
                    toast.success("Accepted", {
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
                toast.error("Error Accepting!", {
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
        } else if (par === "Rej") {
            try {
                const response = await toast.promise(
                    axios.post(`${process.env.REACT_APP_BE_URL}/timesheet/managerapprove/`, {
                        "employee_id": eId,
                        "approve": "False",
                        "year_week": `${currentYear}_${currentWeekNo}`
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
                    toast.success("Rejected!", {
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
                toast.error("Error Rejecting!", {
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
                else if (sub?.status?.id === 1) return st = "Save"
                else if (sub?.status?.id === 2) return st = "Submit"
                else if (sub?.status?.id === 3) return st = "ManagerReviewed"
                else if (sub?.status?.id === 4) return st = "AdminReviewed"
            });
        });

        switch (st) {
            case 'Open':
                return [{ width: '100%', backgroundColor: '#94a3b8' }]; //slate
            case 'Save':
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

    useEffect(() => {
        console.log("PID", pId);
        console.log("EID", eId);
    }, []);

    return (
        <div className="flex flex-col lg:flex-row max-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 overflow-clip">
            <Dashboard />
            <main className={`flex-1 p-3 sm:p-4 md:p-6 h-screen overflow-hidden pt-16 lg:pt-3 transition-all duration-300 ${onApp && 'bg-gradient-to-br from-green-50 via-emerald-50 to-green-100'} ${onRej && 'bg-gradient-to-br from-red-50 via-rose-50 to-red-100'}`}>
                {/* Header Card */}
                <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl mb-3 sm:mb-4 overflow-hidden">
                    {/* Employee Info Header with Gradient */}
                    <div className={`p-3 sm:p-4 md:p-5 transition-all duration-300 ${onApp ? 'bg-gradient-to-r from-green-500 to-emerald-400' : onRej ? 'bg-gradient-to-r from-red-500 to-rose-400' : 'bg-gradient-to-r from-blue-500 to-sky-400'}`}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <div className="flex items-center gap-2 text-white">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                        <FaRegIdCard className="text-white" fontSize={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm font-medium text-blue-100">Emp ID</p>
                                        <p className="text-base sm:text-lg font-bold">{eId && eId}</p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
          
                    {/* Navigation Controls */}
                    <div className="p-3 sm:p-4 md:p-5 flex flex-col lg:flex-row justify-between items-center gap-3">
                        <div className="flex flex-wrap gap-3">
                            <button
                                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all flex items-center gap-2"
                                onClick={goToPreviousWeek}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                PREVIOUS WEEK
                            </button>
                            <button
                                className="px-5 py-2.5 bg-white border-2 border-blue-500 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-50 transform hover:scale-105 transition-all flex items-center gap-2"
                                onClick={goToCurrentWeek}
                                ref={currentWeekBtn}
                            >
                                <FaCalendarAlt />
                                CURRENT WEEK
                            </button>
                            <button
                                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all flex items-center gap-2"
                                onClick={goToNextWeek}
                            >
                                NEXT WEEK
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button
                                className={`px-6 py-2.5 font-bold rounded-lg shadow-md flex items-center gap-2 transform hover:scale-105 transition-all ${onApp ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'}`}
                                onClick={() => handleApproval("Acc")}
                                onMouseEnter={() => setOnApp(true)}
                                onMouseLeave={() => setOnApp(false)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Approve
                            </button>
                            <button
                                className={`px-6 py-2.5 font-bold rounded-lg shadow-md flex items-center gap-2 transform hover:scale-105 transition-all ${onRej ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white' : 'bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600'}`}
                                onClick={() => handleApproval("Rej")}
                                onMouseEnter={() => setOnRej(true)}
                                onMouseLeave={() => setOnRej(false)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Reject
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                    {/* Calendar Week Card */}
                    <div className={`rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 text-white transition-all duration-300 ${onApp ? 'bg-gradient-to-br from-green-400 to-emerald-500' : onRej ? 'bg-gradient-to-br from-red-400 to-rose-500' : 'bg-gradient-to-br from-orange-400 to-orange-500'}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-orange-100 uppercase tracking-wider mb-1 sm:mb-2">Calendar Week</p>
                                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold">{currentWeekNo}</p>
                                <p className="text-xs sm:text-sm font-medium text-orange-100 mt-2 sm:mt-3">
                                    {masterData.length > 0 && `${masterData?.[0]?.date.split("-")?.[2]}.${masterData?.[0]?.date.split("-")?.[1]}.${masterData?.[0]?.date.split("-")?.[0]}`} - {masterData.length > 0 && `${masterData?.[masterData.length - 1]?.date.split("-")?.[2]}.${masterData?.[masterData.length - 1]?.date.split("-")?.[1]}.${masterData?.[masterData.length - 1]?.date.split("-")?.[0]}`}
                                </p>
                            </div>
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <FaCalendarAlt className="text-2xl sm:text-3xl md:text-4xl" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Weekly Summary Card */}
                    <div className={`rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 text-white transition-all duration-300 ${onApp ? 'bg-gradient-to-br from-green-500 to-emerald-600' : onRej ? 'bg-gradient-to-br from-red-500 to-rose-600' : 'bg-gradient-to-br from-green-400 to-green-500'}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-green-100 uppercase tracking-wider mb-1 sm:mb-2">Weekly Work Summary</p>
                                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold">{calculateWeekTotal()}</p>
                                <p className="text-xs sm:text-sm font-medium text-green-100 mt-2 sm:mt-3">Total Hours</p>
                            </div>
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <FaClipboardList className="text-2xl sm:text-3xl md:text-4xl" />
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
                {/* <div className="w-full bg-transparent rounded-full h-4 overflow-hidden flex justify-center mt-2">
                    {getProgressBarStyles().map((style, index) => (
                        <div
                            key={index}
                            className="h-full transition-all duration-300 ease-in-out flex justify-center items-center tracking-widest shadow-md"
                            style={{
                                width: style.width,
                                backgroundColor: style.backgroundColor,
                                // float: 'center',
                            }}
                        ><p className="tracking-widest font-mono italic font-bold">{style?.status}</p></div>
                    ))}
                </div> */}
                {/* Days Container with Scroll */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-xl overflow-hidden" style={{ height: "calc(100vh - 420px)" }}>
                    <Box
                        p={2}
                        width="100%"
                        height="100%"
                        sx={{ overflowY: "auto" }}
                    >
                        {masterData.length > 0 && masterData.map((eac) => (
                            <DayCard
                                key={eac?.date}
                                date={eac?.date}
                                eac={eac}
                                // onAddEntry={handleAddEntry}
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
                </div>

            </main>
        </div>
    );
};
export default WeeEmpAppr;
