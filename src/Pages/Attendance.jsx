import { useState } from "react";
import React from "react";
import Dashboard from "./Dashboard";
import { GrView } from "react-icons/gr";

const Atten1 = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  const handleGetData = () => {
    // Example logic to generate dummy data
    const daysInMonth = new Date(year, month, 0).getDate();
    const data = Array.from({ length: daysInMonth }, (_, i) => {
      const currentDate = new Date(year, month - 1, i + 1);
      const day = currentDate.toLocaleDateString("en-US", { weekday: "long" });
      return {
        date: currentDate.toLocaleDateString("en-US"),
        day: day,
        punchIn: "", // Add your logic to fetch punch in time
        punchOut: "", // Add your logic to fetch punch out time
        attendanceStatus: "", // Add your logic to determine attendance status
      };
    });
    setAttendanceData(data);
  };
  // const attendanceData = [
  //   {
  //     date: "2024-05-01",
  //     day: "Monday",
  //     punchIn: "09:00 AM",
  //     punchOut: "05:00 PM",
  //     ActualHrsfor: "9:00",
  //     StdHrsworkedfor: "9:10",
  //     mode: "Auto",
  //     attendanceStatus: "Present",
  //     attendenceDetails: "present",
  //   },
  //   {
  //     date: "2024-05-02",
  //     day: "Tuesday",
  //     punchIn: "09:15 AM",
  //     punchOut: "05:10 PM",
  //     ActualHrsfor: "9:10",
  //     StdHrsworkedfor: "9:10",
  //     mode: "Auto",
  //     attendanceStatus: "Present",
  //     attendenceDetails: "present",
  //   },
  // ];
  return (
    <div className="flex w-full">
      <Dashboard />
      <main className="flex-1 p-3 bg-gray-300 h-max border  shadow-md w-full">
        <h1 className="text-2xl gap-4 flex justify-center font-bold">
          Employee Attandance View
        </h1>
        <br />
        <hr></hr>
        <br />
        <div className="p-4">
          <div className="mb-4 flex  gap-8">
            <div>
              <label className="block text-gray-700 text-2xl font-bold mb-2">
                Employee ID
              </label>
              <input
                type="text"
                name="Name"
                // value={inputs.Name}
                // onChange={handleInputChange}
                className="w-48 bg-gray-100 border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-2xl font-bold mb-2">
                Employee Name
              </label>
              <input
                type="text"
                name="Name"
                // value={inputs.Name}
                // onChange={handleInputChange}
                className="w-48 bg-gray-100 border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-2xl font-bold mb-2">
                Year
              </label>
              <select
                name="Year"
                className="w-40 bg-gray-100 border text-xl rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Year</option>

                {Array.from({ length: 30 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-2xl font-bold mb-2">
                Month
              </label>
              <select
                name="Month"
                className="w-40 bg-gray-100 border text-xl rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-18 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Get Data
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Download
              </button>
            </div>
          </div>
          <br />
          <br />
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-800">
              <thead>
                <tr>
                  <th className="border border-gray-800 p-3">Date</th>
                  <th className="border border-gray-800 p-3">Day</th>
                  <th className="border border-gray-800 p-3">Punch In</th>
                  <th className="border border-gray-800 p-3">Punch Out</th>
                  <th className="border border-gray-800 p-3">Actual Hrs for</th>
                  <th className="border border-gray-800 p-3">
                    Std Hrs worked for
                  </th>
                  <th className="border border-gray-800 p-3">Mode</th>
                  <th className="border border-gray-800 p-3">
                    Attendance Status
                  </th>
                  <th className="border border-gray-800 p-3">
                    Attendance Details
                  </th>
                  <th className="border border-gray-800 p-3">View</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((data, index) => (
                  <tr key={index}>
                    <td className="border border-gray-800 p-3">{data.date}</td>
                    <td className="border border-gray-800 p-3">{data.day}</td>
                    <td className="border border-gray-800 p-3">
                      {data.punchIn}
                    </td>
                    <td className="border border-gray-800 p-3">
                      {data.punchOut}
                    </td>
                    <td className="border border-gray-800 p-3">
                      {data.ActualHrsfor}
                    </td>
                    <td className="border border-gray-800 p-3">
                      {data.StdHrsworkedfor}
                    </td>
                    <td className="border border-gray-800 p-3">{data.mode}</td>
                    <td className="border border-gray-800 p-3">
                      {data.attendanceStatus}
                    </td>
                    <td className="border border-gray-800 p-3">
                      {data.attendenceDetails}
                    </td>
                    <td className="border border-gray-800 p-3 text-2xl ">
                      <GrView />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Atten1;
