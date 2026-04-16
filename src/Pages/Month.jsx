/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useMemo } from "react";
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
  getWeekYear,
  getISOWeeksInYear,
  getWeeksInMonth,
  getISOWeek,
  endOfWeek,
  eachDayOfInterval,
  getMonth,
  getYear,
  getDate,
} from "date-fns";

import { SlOptionsVertical } from "react-icons/sl";
import { TbFreezeRow } from "react-icons/tb";
import Dashboard from "./Dashboard";
import { FaArrowCircleDown } from "react-icons/fa";
import { utils, writeFile } from "xlsx";
import { CiSaveDown1 } from "react-icons/ci";
import { CiLogout, CiEdit } from "react-icons/ci";
import { toast, Zoom, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  AiOutlineCalendar,
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineSave,
} from "react-icons/ai";
import { TextareaAutosize, Typography, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Box, Chip, Modal } from "@mui/material";
import { Card } from "@mui/material";
import { Select } from "@mui/material";
import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardContent } from "@mui/material";
import { IconButton } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  FaCalendarAlt,
  FaClipboardList,
  FaUserAlt,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { Fullscreen } from "lucide-react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { cleanString } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const colorPalette = [
  "#bbdefb",
  "#c8e6c9",
  "#fff9c4",
  "#ffcdd2",
  "#e1bee7",
  "#f8bbd0",
  "#c5cae9",
  "#b2dfdb",
  "#90caf9",
  "#a5d6a7",
  "#fff59d",
  "#ffab91",
  "#ce93d8",
  "#f48fb1",
  "#9fa8da",
  "#80cbc4",
];

const colorForEven = "#bbdefb";
const colorForOdd = "#c8e6c9";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  cursor: "pointer",
}));

const DayCard = ({
  date,
  eac,
  onUpdateEntry,
  onDeleteEntry,
  onSaveEntry,
  allProCompData,
  handleChangeDd,
  comp,
  preWeek,
  curWeek,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

 
let totalMinutes = 0;

eac?.data?.forEach(entry => {
  if (!entry.hours) return;

  const [hr, mn] = entry.hours.split(":");

  totalMinutes += (parseInt(hr) * 60) + parseInt(mn);
});

const totalHours = Math.floor(totalMinutes / 60);
const totalMin = totalMinutes % 60;

const dayTotal = `${totalHours} Hrs ${totalMin} Mn`;

  const progress = Math.min((dayTotal / 8) * 100, 100); // 8-hour working
  const [colored, setColored] = useState(false);

  function getRandomLightColor(ea) {
    if (!colored) {
      return colorPalette[Math.floor(Math.random() * 11)];
    } else if (ea?.id === null) {
      return colorPalette[Math.floor(Math.random() * 11)];
    }
    if (!colored) setColored(true);
    return "#a5d6a7";
  }

  const retWorkedHrs = (t) => {
    return dayjs().hour(Math.trunc(t)).minute(t.toString().split(".")?.[1]);
  };

  const retMn = (data) => {
    if (data) {
      return parseInt(data.toString().split(".")?.[1]);
    } else {
      return 0;
    }
  };

  return (
    <StyledCard>
      <StyledCardHeader
        onClick={() => setIsExpanded(!isExpanded)}
        title={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              display="flex"
              alignItems="center"
              className={`${
                isToday(date)
                  ? "bg-slate-300 shadow-lg border rounded-md"
                  : "bg-white"
              } p-1 `}
            >
              <AiOutlineCalendar fontSize="small" style={{ marginRight: 8 }} />
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                style={{ marginRight: 16 }}
              >
                {dayTotal} 
              </Typography>
              {isExpanded ? <AiOutlineDown /> : <AiOutlineUp />}
            </Box>
          </Box>
        }
      />
      <LinearProgress
        variant="determinate"
        value={progress}
        style={{ margin: "0 16px" }}
      />
      {isExpanded && (
        <CardContent>
          {eac?.data.length > 0 &&
            eac.data.map((ea, index) => (
              <Box
                display="flex"
                alignItems="center"
                mb={1}
                p={1}
                borderRadius={1}
               className='bg-gray-100'
                boxShadow={2}
              >
                {/* <CheckCircleIcon style={{ color: '#fff', marginRight: 8 }} />  */}
                <Chip
                  label={ea?.status?.statusName}
                  className="bg-gray-200 text-gray-700 font-bold"
                  style={{
                    
                     
                    padding: "4px 12px",
                    marginRight: "10px",
                  }}
                />

                <FormControl className="w-24" style={{ marginRight: 8 }}>
                  <InputLabel id="demo-simple-select-hours-label">
                    Hours
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-hours-label"
                    id="select-hours"
                    value={ea?.hours ? dayjs(`1970-01-01T${ea.hours}`).hour() : 0}
                    label="Enter Hours"
                    name="hours"
                    onChange={(e) => handleChangeDd(e, index, date)}
                    disabled
                  >
                    {[...Array(12).keys()].map((hour) => (
                      <MenuItem key={hour} value={hour}>
                        {hour}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl className="w-24" style={{ marginRight: 8 }}>
                  <InputLabel id="demo-simple-select-minutes-label">
                    Min
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-minutes-label"
                    id="select-minutes"
                     value={ea?.hours ? dayjs(`1970-01-01T${ea.hours}`).minute() : 0}
                    label="Enter Min"
                    name="minutes"
                    onChange={(e) => handleChangeDd(e, index, date)}
                    disabled
                  >
                    {[...Array(60).keys()].map((minute) => {
                      if (
                        minute % 5 === 0 &&
                        minute !== 10 &&
                        minute !== 20 &&
                        minute !== 30 &&
                        minute !== 40 &&
                        minute !== 50
                      )
                        return (
                          <MenuItem key={minute} value={minute}>
                            {minute}
                          </MenuItem>
                        );
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
  <Select labelId="demo-simple-select-label"
                    id="demo-simple-select" value={ea?.project?.projectName}  label="Select Project"
                    name="project" disabled>
    <MenuItem value={ea?.project?.projectName}>
      {ea?.project?.projectName}
    </MenuItem>
  </Select>
</FormControl>


                <FormControl className="w-48" style={{ marginRight: 8 }}>
  <InputLabel id="demo-simple-select-label">Subcode</InputLabel>
  <Select  labelId="demo-simple-select-label"
                    id="demo-simple-select" label="Select Sub Project"
                    name="projectsubcode" value={ea?.projectsubcode?.projectSubcode} disabled>
    <MenuItem value={ea?.projectsubcode?.projectSubcode}>
      {ea?.projectsubcode?.projectSubcode}
    </MenuItem>
  </Select>
</FormControl>




               <FormControl className="w-40" style={{ marginRight: 8 }}>
  <InputLabel id="demo-simple-select-label">Activity</InputLabel>
  <Select  labelId="demo-simple-select-label"
                    id="demo-simple-select"  label="Select Activity"
                    name="project_subcode_activity" value={ea?.project_subcode_activity?.name} disabled>
    <MenuItem value={ea?.project_subcode_activity?.name}>
      {ea?.project_subcode_activity?.name}
    </MenuItem>
  </Select>
</FormControl>


                <FormControl className="w-40" style={{ marginRight: 8 }}>
                  <InputLabel id="demo-simple-select-label">
                    Location
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ea?.location}
                    label="Select Location"
                    name="location"
                    onChange={(e) => handleChangeDd(e, index, date)}
                    disabled
                  >
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
              </Box>
            ))}
        </CardContent>
      )}
    </StyledCard>
  );
};

const Month = () => {
  const currentWeekBtn = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const eId = params.get("empID");
  

  const [onApp, setOnApp] = useState(false);
  const [onRej, setOnRej] = useState(false);

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

useEffect(() => {
  const fetchEmployee = async () => {
    try {

      const response = await axios.get(
        `${process.env.REACT_APP_BE_URL}/user/allprofile/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );

      if (response.status === 200) {

        const emp = response.data.msg.find(
          (user) => user.empID === eId
        );

        if (emp) {
          setEmpname(emp.name);
          setDepartment(emp.department__name);
          setCostcenter(
  `${emp.costcenter__number}_${emp.costcenter__name}`
);
        }

      }

    } catch (error) {
      console.log("Error fetching employee", error);
    }
  };

  if (eId) {
    fetchEmployee();
  }

}, [eId]);


  useEffect(() => {
    updateCalendar(currentDate);
  }, [currentDate]);

  useEffect(() => {
    console.log("EID", eId);
   
  }, [eId]);

  const updateCalendar = (date) => {
    const startMonth = startOfMonth(date);
    const endMonth = endOfMonth(date);
    const startCalendar = startOfWeek(startMonth, { weekStartsOn: 1 });
    const endCalendar = endOfWeek(endMonth, { weekStartsOn: 1 });

    const days = [];
    let day = startCalendar;
    while (day <= endCalendar) {
      days.push(day);
      day = addDays(day, 1);
    }
    setCalendarDays(days);
  };

  const formatDate = (date) => {
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getWeekNumber = (date) => {
    return getISOWeek(date);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  const [selectedWeek, setSelectedWeek] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDateClick = (day) => {
    // '2024/09/22' format for getISOWeek
    const weekNumber = getISOWeek(day);
    console.log("Date", day, "Week Number", weekNumber);

    if (isCurrentMonth(day)) {
      setSelectedDate(day); // Set the clicked date
      setIsPopupOpen(true);
      fetchWeekData(weekNumber, getWeekData(day)); // Open the modal
    }

    if (!day) return;

    setSelectedDate(day);
    const weekDays = getWeekForDate(day);
    setSelectedWeek(weekDays);
  };

  const handleClosePopup = () => {
    setSelectedDate(null);
    setIsPopupOpen(false);
  };

  const getWeekForDate = (date) => {
    if (!date) return [];
    const selectedWeek = weeks.find((week) =>
      week.days.some((day) => isSameDay(day, date))
    );
    return selectedWeek ? selectedWeek.days : [];
  };

  const isSameDay = (day1, day2) => {
    return (
      day1.getFullYear() === day2.getFullYear() &&
      day1.getMonth() === day2.getMonth() &&
      day1.getDate() === day2.getDate()
    );
  };

  const closePopup = () => {
    setSelectedDate(null);
  };

  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    const weekStart = calendarDays[i];
    const weekNumber = getWeekNumber(weekStart);
    weeks.push({
      days: calendarDays.slice(i, i + 7),
      weekNumber: weekNumber,
    });
  }


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




  const getWeekDays = (date) => {
    return eachDayOfInterval({
      start: startOfWeek(new Date(date), { weekStartsOn: 1 }),
      end: endOfWeek(new Date(date), { weekStartsOn: 1 }),
    }).map((date) => {
      const formattedDate = format(date, "yyyy-MM-dd");
      return (
        masterData.find((day) => day.date === formattedDate) || {
          date: formattedDate,
          entries: [],
        }
      );
    });
  };

  const getTimesheetForWeek = (weekDays) => {
    return weekDays.reduce((acc, day) => {
      acc[day.date] = day.entries || [];
      return acc;
    }, {});
  };

  const [totalHours, setTotalHours] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  // const [currentDate, setCurrentDate] = useState(new Date());
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
    // fetchWeekData(week);
    // console.log("WEEK", week);
  }, []);

  const isHoliday = (dateString) => {
    return holidays.some((holiday) => holiday.date === dateString);
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

    return JSON.stringify(tableData, null, 2);
  };

  const handleExportExcel = () => {
    const jsonData = getTableDataAsJSON();
    const tableData = JSON.parse(jsonData);
    const ws = utils.json_to_sheet(tableData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Table Data");
    writeFile(wb, "table_data.xlsx");
  };

  const insertIr = (data, wd) => {
    const clone = wd.map((eac) => ({
      date: `${eac.date.split("-")[2]}-${eac.date.split("-")[1]}-${
        eac.date.split("-")[0]
      }`,
      year_week: `${currentYear}_${currentWeekNumber}`,
      data: [],
    }));

    const dateMap = new Map();
    clone.forEach((ea) => dateMap.set(ea.date, ea));

    data.forEach((eac) => {
      const match = dateMap.get(eac.date);
      if (match) {
        match.data.push({
          ...eac,
          date: undefined,
          year_week: undefined,
        });
      }
    });

    console.log("Processed data for MASTER", clone);
    setMasterData(clone);
  };

  const fetchWeekData = async (wn, p2) => {
    console.log(empid, currentYear, wn);
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await toast.promise(
        axios.get(
          `${process.env.REACT_APP_BE_URL}/timesheet/adminretriveweek/${eId}/${currentYear}_${wn}/`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
          }
        ),
        {
          pending: "Fetching weekly data...",
          success: "Data fetched successfully!",
          error: "Failed to fetch data.",
        }
      );

      if (response) console.log(response);

      if (response.status === 200) {
        insertIr(response.data.msg, p2);
        // setMasterData(response.data.msg);
      }
    } catch (error) {
      console.error("Error fetching week data:", error);
    }
  };

  // const handleApproval = async (par, date) => {
  //   //yyyy-mm-dd format
  //   // console.log("Clicked", onApp, onRej)
  //   console.log("Start End Month Dates", weeks)
  //   const isApproval = par === "Acc";
  //   const approvalStatus = isApproval ? "True" : "False";
  //   // console.log(formatDate(weeks?.[2]?.days?.[0]))
  //   // console.log(getMonth(weeks?.[2]?.days?.[0]))
  //   // console.log(getYear(weeks?.[2]?.days?.[0]))

  //   // const retEndDate = (data) => {
  //   //   let cM = getMonth(data?.[2]?.days?.[0]) + 1
  //   //   data?.[data.length - 1]?.days.forEach((eac, index) => {
  //   //     console.log(cM, getMonth(eac) + 1)
  //   //     if (getMonth(eac) + 1 > cM) {
  //   //       console.log("caught", getMonth(eac) + 1, cM, index)
  //   //       // if (index - 1 >= 0) {
  //   //       //   console.log(`${getYear(eac)}-${cM < 10 ? `0${cM}` : cM}-${getDate(data?.[data.length - 1]?.days?.[index - 1])}`)
  //   //       //   return
  //   //       // }
  //   //     }
  //   //     return;
  //   //   })
  //   // }
  //   const retEndDate = (data) => {
  //     if (!data || data.length === 0) return;

  //     let firstDay = null;
  //     let lastDay = null;

  //     data?.forEach((week) => {
  //       week?.days.forEach((day) => {
  //         const dayMonth = getMonth(day) + 1;

  //         if (!firstDay || getDate(day) < getDate(firstDay)) {
  //           firstDay = day;
  //         }
  //         if (!lastDay || getDate(day) > getDate(lastDay)) {
  //           lastDay = day;
  //         }
  //       });
  //     });

  //     const startDate = `${getYear(firstDay)}-${(getMonth(firstDay) + 1).toString().padStart(2, '0')}-${getDate(firstDay).toString().padStart(2, '0')}`;
  //     const endDate = `${getYear(lastDay)}-${(getMonth(lastDay) + 1).toString().padStart(2, '0')}-${getDate(lastDay).toString().padStart(2, '0')}`;

  //     console.log("Start Date of Month:", startDate);
  //     console.log("End Date of Month:", endDate);
  //   };
  //   const { startDate, endDate } = retEndDate(weeks);
  //   if (!startDate || !endDate) {
  //     console.error("Error: Could not determine start or end date.");
  //     return;
  //   }

  //   // retEndDate(weeks)
  //   if(par==='acc'){
  //     if (par === "Acc") {
  //       try {
  //         const response = await toast.promise(
  //           axios.post(`${process.env.REACT_APP_BE_URL}/timesheet/adminapprove/`, {
  //             "approve": approvalStatus,
  //             "week_start_date":startDate,
  //             "week_end_date":endDate,
  //             "employee_id": eId,
  //             headers: {
  //               Accept: "application/json",
  //               Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
  //             },
  //           }),
  //           {
  //             pending: isApproval ? "Submitting Approval..." : "Submitting Rejection...",
  //           }
  //         );

  //         if (response.status === 200) {
  //           toast.success("Accepted", {
  //             position: "top-right",
  //             transition: Flip,
  //             autoClose: 1600,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "light",
  //           });
  //           window.location.reload();
  //         }
  //       } catch (error) {
  //         toast.error("Error Accepting!", {
  //           position: "top-right",
  //           transition: Zoom,
  //           autoClose: 2500,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //         console.log(error);
  //       }
  // } else if (par === "Rej")
  //   {
  //     try {
  //       const response = await toast.promise(
  //         axios.post(`${process.env.REACT_APP_BE_URL}/timesheet/adminapprove/`, {
  //          "approve": approvalStatus,
  //           "week_start_date":startDate,
  //           "week_end_date":endDate,
  //           "employee_id": eId,
  //           headers: {
  //             Accept: "application/json",
  //             Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
  //           },
  //         }),
  //         {
  //           pending: "Submitting..!",
  //         }
  //       );

  //       if (response.status === 200) {
  //         toast.success("Rejected!", {
  //           position: "top-right",
  //           transition: Flip,
  //           autoClose: 1600,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //         window.location.reload();
  //       }
  //     } catch (error) {
  //       toast.error("Error Rejecting!", {
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
  //       console.log(error);
  //     }
  //   }

  //   }
  //   // console.log("End Date", retEndDate(weeks))
  //   // //     const { startOfWeek, endOfWeek } = getWeekDates(date);

  //   //     console.log("startOfWeek:", startOfWeek);
  //   //     console.log("endOfWeek:", endOfWeek);
  //     //   if (par === "Acc") {
  //     //   try {
  //     //     const response = await toast.promise(
  //     //       axios.post(`${process.env.REACT_APP_BE_URL}/timesheet/adminapprove/`, {
  //     //         "approve": approvalStatus,
  //     //         "week_start_date":startOfWeek,
  //     //         "week_end_date":endOfWeek,
  //     //         "employee_id": eId,
  //     //         headers: {
  //     //           Accept: "application/json",
  //     //           Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
  //     //         },
  //     //       }),
  //     //       {
  //     //         pending: isApproval ? "Submitting Approval..." : "Submitting Rejection...",
  //     //       }
  //     //     );

  //     //     if (response.status === 200) {
  //     //       toast.success("Accepted", {
  //     //         position: "top-right",
  //     //         transition: Flip,
  //     //         autoClose: 1600,
  //     //         hideProgressBar: false,
  //     //         closeOnClick: true,
  //     //         pauseOnHover: true,
  //     //         draggable: true,
  //     //         progress: undefined,
  //     //         theme: "light",
  //     //       });
  //     //       window.location.reload();
  //     //     }
  //     //   } catch (error) {
  //     //     toast.error("Error Accepting!", {
  //     //       position: "top-right",
  //     //       transition: Zoom,
  //     //       autoClose: 2500,
  //     //       hideProgressBar: false,
  //     //       closeOnClick: true,
  //     //       pauseOnHover: true,
  //     //       draggable: true,
  //     //       progress: undefined,
  //     //       theme: "light",
  //     //     });
  //     //     console.log(error);
  //     //   }
  //     // } else if (par === "Rej")
  //     // {
  //     //   try {
  //     //     const response = await toast.promise(
  //     //       axios.post(`${process.env.REACT_APP_BE_URL}/timesheet/adminapprove/`, {
  //     //        "approve": approvalStatus,
  //     //         "week_start_date":startOfWeek,
  //     //         "week_end_date":endOfWeek,
  //     //         "employee_id": eId,
  //     //         headers: {
  //     //           Accept: "application/json",
  //     //           Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
  //     //         },
  //     //       }),
  //     //       {
  //     //         pending: "Submitting..!",
  //     //       }
  //     //     );

  //     //     if (response.status === 200) {
  //     //       toast.success("Rejected!", {
  //     //         position: "top-right",
  //     //         transition: Flip,
  //     //         autoClose: 1600,
  //     //         hideProgressBar: false,
  //     //         closeOnClick: true,
  //     //         pauseOnHover: true,
  //     //         draggable: true,
  //     //         progress: undefined,
  //     //         theme: "light",
  //     //       });
  //     //       window.location.reload();
  //     //     }
  //     //   } catch (error) {
  //     //     toast.error("Error Rejecting!", {
  //     //       position: "top-right",
  //     //       transition: Zoom,
  //     //       autoClose: 2500,
  //     //       hideProgressBar: false,
  //     //       closeOnClick: true,
  //     //       pauseOnHover: true,
  //     //       draggable: true,
  //     //       progress: undefined,
  //     //       theme: "light",
  //     //     });
  //     //     console.log(error);
  //     //   }
  //     // }
  // };

  // const handleApproval = async (par, weeks, eId) => {
  //   const isApproval = par === "Acc";
  //   const approvalStatus = isApproval ? "True" : "False";

  //   // Function to calculate start and end dates
  //   const retEndDate = (data) => {
  //     if (!data || data.length === 0) {
  //       console.error("Error: weeks data is empty or undefined");
  //       return {}; // Return an empty object if data is invalid
  //     }

  //     let firstDay = null;

  //     data.forEach((week) => {
  //       week?.days.forEach((day) => {
  //         if (!firstDay || getDate(day) < getDate(firstDay)) {
  //           firstDay = day;
  //         }
  //       });
  //     });

  //     if (!firstDay) {
  //       console.error("Error: Could not determine first or last day.");
  //       return {}; // Return empty object if dates couldn't be calculated
  //     }

  //     // const startDate = `${getYear(firstDay)}-${(getMonth(firstDay) + 1).toString().padStart(2, '0')}-${getDate(firstDay).toString().padStart(2, '0')}`;
  //     // const endDate = `${getYear(lastDay)}-${(getMonth(lastDay) + 1).toString().padStart(2, '0')}-${getDate(lastDay).toString().padStart(2, '0')}`;
  //     const monthStart = startOfMonth(firstDay);
  //     const monthEnd = endOfMonth(firstDay);

  //     // Format the dates to YYYY-MM-DD
  //     const startDate = format(monthStart, 'yyyy-MM-dd');
  //     const endDate = format(monthEnd, 'yyyy-MM-dd');
  //     return { startDate, endDate };
  //   };

  //   // Get the start and end dates
  //   const { startDate, endDate } = retEndDate(weeks);

  //   // If startDate or endDate are not defined, return early to prevent further errors
  //   if (!startDate || !endDate) {
  //     console.error("Error: Could not determine start or end date.");
  //     return;
  //   }

  //   // Proceed with the API call
  //   const submitApproval = async () => {
  //     try {
  //       console.log({
  //         approve: approvalStatus,
  //         week_start_date: startDate,
  //         week_end_date: endDate,
  //         employee_id: eId,
  //       });

  //       const response = await toast.promise(
  //         axios.post(`${process.env.REACT_APP_BE_URL}/timesheet/adminapprove/`, {
  //           approve: approvalStatus,
  //           week_start_date: startDate,
  //           week_end_date: endDate,
  //           employee_id: eId,
  //         }, {
  //           headers: {
  //             Accept: "application/json",
  //             Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
  //           },
  //         }),
  //         {
  //           pending: isApproval ? "Submitting Approval..." : "Submitting Rejection...",
  //         }
  //       );

  //       if (response.status === 200) {
  //         console.log(response.data);
  //         const successMessage = isApproval ? "Accepted" : "Rejected!";
  //         toast.success(successMessage, {
  //           position: "top-right",
  //           transition: Flip,
  //           autoClose: 1600,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //         // window.location.reload();
  //       }
  //     } catch (error) {
  //       const errorMessage = isApproval ? "Error Accepting!" : "Error Rejecting!";
  //       toast.error(errorMessage, {
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
  //       console.error("Error:", error);
  //     }
  //   };

  //   submitApproval();
  // };
  const handleApproval = async (par, weeks, eId) => {
    const isApproval = par === "Acc";
    const approvalStatus = isApproval ? "True" : "False";

    // Function to calculate start and end dates
    const retEndDate = (data) => {
      if (!data || data.length === 0) {
        console.error("Error: weeks data is empty or undefined");
        return {}; // Return an empty object if data is invalid
      }

      let firstDay = null;

      data.forEach((week) => {
        week?.days.forEach((day) => {
          if (!firstDay || getDate(day) < getDate(firstDay)) {
            firstDay = day;
          }
        });
      });

      if (!firstDay) {
        console.error("Error: Could not determine first day.");
        return {}; // Return empty object if dates couldn't be calculated
      }

      const startDate = format(startOfMonth(firstDay), "yyyy-MM-dd");
      const endDate = format(endOfMonth(firstDay), "yyyy-MM-dd");
      return { startDate, endDate };
    };

    // Get the start and end dates
    const { startDate, endDate } = retEndDate(weeks);

    if (!startDate || !endDate) {
      console.error("Error: Could not determine start or end date.");
      return;
    }

    // Proceed with the API call
    const submitApproval = async () => {
      try {
        const response = await toast.promise(
          axios.post(
            `${process.env.REACT_APP_BE_URL}/timesheet/adminapprove/`,
            {
              approve: approvalStatus,
              week_start_date: startDate,
              week_end_date: endDate,
              employee_id: eId,
            },
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
              },
            }
          ),
          {
            pending: `Submitting ${isApproval ? "Approval" : "Rejection"}...`,
          }
        );

        if (response.status === 200) {
          toast.success(isApproval ? "Accepted!" : "Rejected!", {
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
          // window.location.reload(); // Uncomment if you need to refresh the page
        }
      } catch (error) {
        toast.error(`Error ${isApproval ? "Accepting" : "Rejecting"}!`, {
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
        console.error("Error:", error);
      }
    };

    // Call the submit function
    submitApproval();
  };

  useEffect(() => {
    console.log("Week", currentWeek, "MD", masterData);
    // console.log("CDate", currentDate);
  }, [currentWeek, masterData]);

  useEffect(() => {
    const btnRef = currentWeekBtn;
    if (btnRef === null) return;
    btnRef.current.click();
  }, []);

  const getWeekDates = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const end = endOfWeek(date, { weekStartsOn: 1 });
    return { start, end };
  };

  const [filteredData, setFilteredData] = React.useState([]);

  React.useEffect(() => {
    if (selectedDate) {
      const { start, end } = getWeekDates(new Date(selectedDate));
      const filtered = masterData.filter((eac) => {
        const eacDate = new Date(eac?.date);
        return eacDate >= start && eacDate <= end;
      });
      setFilteredData(filtered);
    }
  }, [selectedDate, masterData]);

  const [checkedWeeks, setCheckedWeeks] = useState([]);

  const handleWeekCheckboxChange = (weekIndex) => {
    setCheckedWeeks((prevCheckedWeeks) =>
      prevCheckedWeeks.includes(weekIndex)
        ? prevCheckedWeeks.filter((index) => index !== weekIndex)
        : [...prevCheckedWeeks, weekIndex]
    );
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Dashboard />
      <main className="flex-1 p-6 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 overflow-y-auto">
        {/* Header Card with Employee Info */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-6">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Monthly Timesheet Approval
            </h1>
            
            {/* Employee Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                <div className="bg-white rounded-full p-2">
                  <FaUserAlt className="text-blue-500" size={18} />
                </div>
                <div>
                  <p className="text-blue-400 text-xs">Emp ID</p>
                  <p className="text-blue-400 font-bold">{eId}</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                <div className="bg-white rounded-full p-2">
                  <FaUserAlt className="text-blue-500" size={18} />
                </div>
                <div>
                  <p className="text-blue-400 text-xs">Emp Name</p>
                  <p className="text-blue-400 font-bold">{empname}</p>
                </div>
              </div>
              
              {/* <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                <div className="bg-white rounded-full p-2">
                  <FaClipboardList className="text-blue-500" size={18} />
                </div>
                <div>
                  <p className="text-blue-400 text-xs">Department</p>
                  <p className="text-blue-400 font-bold">{department}</p>
                </div>
              </div>
               */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                <div className="bg-white rounded-full p-2">
                  <FaMoneyBillAlt className="text-blue-500" size={18} />
                </div>
                <div>
                  <p className="text-blue-400 text-xs">Cost Center</p>
                  <div className="relative group max-w-[180px]">
  <p className="text-blue-400 font-bold truncate cursor-pointer">
    {costcenter}
  </p>

  <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-black text-white text-xs px-3 py-1 rounded shadow-lg z-50 whitespace-nowrap">
    {costcenter}
  </div>
</div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="p-6 bg-gray-50">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              {/* Navigation Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={goToPreviousMonth}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-5 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-md flex items-center gap-2"
                >
                  <FaCalendarAlt size={16} />
                  PREVIOUS MONTH
                </button>
                <button
                  onClick={goToCurrentMonth}
                  ref={currentWeekBtn}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-5 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-md flex items-center gap-2"
                >
                  <FaCalendarAlt size={16} />
                  CURRENT MONTH
                </button>
                <button
                  onClick={goToNextMonth}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-5 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-md flex items-center gap-2"
                >
                  NEXT MONTH
                  <FaCalendarAlt size={16} />
                </button>
              </div>

              {/* Period Display */}
              <div className="bg-white border-2 border-blue-200 text-blue-600 py-2.5 px-6 rounded-lg font-bold shadow-sm">
                {currentYear}_{currentWeekNumber}
              </div>

              {/* Approval Buttons */}
              <div className="flex gap-3">
                <button
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-lg flex items-center gap-2"
                  onClick={() => handleApproval("Acc", weeks, eId)}
                  onMouseEnter={() => setOnApp(true)}
                  onMouseLeave={() => setOnApp(false)}
                >
                  Approve 🏅
                </button>

                <button
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-lg flex items-center gap-2"
                  onClick={() => handleApproval("Rej", weeks, eId)}
                  onMouseEnter={() => setOnRej(true)}
                  onMouseLeave={() => setOnRej(false)}
                >
                  Reject 🥷
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-4 flex justify-between items-center">
            <button
              onClick={goToPreviousMonth}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white">
              {formatDate(currentDate)}
            </h2>
            <button
              onClick={goToNextMonth}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="overflow-y-auto max-h-[600px]">
            <div className="grid grid-cols-8 gap-0 min-w-[800px]">
              {/* Header Row */}
              <div className="font-bold text-center p-3 bg-gradient-to-r from-gray-100 to-gray-200 border-b-2 border-gray-300 sticky top-0 z-10">
                Week
              </div>
              {weekdays &&
                weekdays.map((day) => (
                  <div
                    key={day}
                    className="font-bold text-center p-3 bg-gradient-to-r from-gray-100 to-gray-200 border-b-2 border-gray-300 sticky top-0 z-10"
                  >
                    {day}
                  </div>
                ))}

              {/* Calendar Grid */}
              {weeks &&
                weeks.map((week, weekIndex) => (
                  <React.Fragment key={weekIndex}>
                    <div className="font-bold text-center p-3 bg-gradient-to-r from-blue-50 to-sky-50 border border-gray-200 flex items-center justify-center gap-2 min-h-[100px]">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        onChange={() => handleWeekCheckboxChange(weekIndex)}
                      />
                      <span className="text-gray-700">{week.weekNumber}</span>
                    </div>
                    {week.days &&
                      week.days.map((day, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`p-4 border border-gray-200 text-center cursor-pointer transition-all min-h-[100px] flex items-center justify-center ${
                            isCurrentMonth(day)
                              ? isToday(day)
                                ? "bg-gradient-to-br from-blue-400 to-sky-400 text-white font-bold shadow-lg scale-105"
                                : "bg-white hover:bg-blue-50 hover:shadow-md"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                          onClick={() => handleDateClick(day)}
                        >
                          <div className="text-center">
                            <span
                              className={`text-lg ${
                                isToday(day) ? "font-bold" : ""
                              }`}
                            >
                              {day.getDate()}
                            </span>
                          </div>
                        </div>
                      ))}
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>

        {/* Timesheet Details Modal */}
        <Modal
          open={isPopupOpen}
          onClose={handleClosePopup}
          className="flex items-center justify-center"
        >
          <Box
            className="bg-white rounded-lg p-4 w-full overflow-auto"
            height="80vh"
          >
            <Typography variant="h4" fontWeight="bold" mb={2} mt={2}>
              Timesheet for week of{" "}
              {selectedDate && format(new Date(selectedDate), "MMMM d, yyyy")}
            </Typography>
            <Box margin="auto" p={4} width="full" height="80vh">
              {selectedDate &&
                getWeekDays(selectedDate).map((dayData) => (
                  <DayCard
                    key={dayData.date}
                    date={dayData.date}
                    eac={dayData}
                    // onAddEntry={handleAddEntry}
                    // onUpdateEntry={handleUpdateEntry}
                    // onDeleteEntry={handleDeleteEntry}
                    // onSaveEntry={handleDataSave}
                    allProCompData={allProCompData}
                    // handleChangeDd={handleDataUpdation}
                    // comp={masterData}
                    preWeek={currentWeekNumber}
                    curWeek={currentWeekNo}
                  />
                ))}

              <Card className="mt-4">
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Week Total
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                       {selectedDate &&
  calculateWeekTotal(filteredData)
} 
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Button
                onClick={handleClosePopup}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </main>
    </div>
  );
};
export default Month;
