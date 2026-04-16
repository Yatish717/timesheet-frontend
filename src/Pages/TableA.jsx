import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Table1 from "./Table1";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { GoRepoPush } from "react-icons/go";

const TableA = () => {
  const dummyData = [
    {
      manager: "Manager1",
      projectName: "SS",
      projectCode: "ABC123",
      employees: ["Rudresh", "Bindu", "Karunya", "Shreyas", "jithesh"],
    },
    {
      manager: "Manager2",
      projectName: "OD",
      projectCode: "DEF456",
      employees: ["Employee1", "Employee2", "Employee3", "Employee4"],
    },
    {
      manager: "Manager3",
      projectName: "DMS",
      projectCode: "GHI789",
      employees: ["Poornima", "Pooja", "Hemanth"],
    },
    {
      manager: "Manager4",
      projectName: "OCR",
      projectCode: "JKL012",
      employees: ["Shadab", "Anusha", "Amit", "Keshva"],
    },
    {
      manager: "Manager5",
      projectName: "playment tool",
      projectCode: "MNO345",
      employees: ["emp1", "emp2", "emp3", "emp4"],
    },
    {
      manager: "Manager6",
      projectName: "playment tool",
      projectCode: "PQR678",
      employees: ["emp5", "emp6", "emp7", "emp8", "emp9", "emp10"],
    },
  ];

  const [selectedData, setSelectedData] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleRowClick = (data) => {
    setSelectedData(data);
  };

  const handleEmployeeClick = (employee) => {
    alert(`Selected Employee: ${employee}`);
    setSelectedEmployee(employee);
  };

  const getEmployeeLink = (manager) => {
    return `/table1?manager=${encodeURIComponent(manager)}`;
  };

  return (
    <div className="w-screen flex bg-sky-200">
      <Dashboard />

      <main className="p-3 bg-sky-100 h-max border shadow-md w-full">
        <div className="bg-gray-400 w-full h-12 flex gap-5">
          <h1 className="text-xl font-semibold">Manager's Details</h1>
        </div>
        <br />

        <div className="flex">
          <table className="border border-black bg-sky-50 table-fixed ml-20 table-auto">
            <thead>
              <tr>
                <th className="w-8 bg-zinc-500 px-4 py-2 border-2 text-amber-500 border-black">
                  ManagerName
                </th>
                <th className="w-8 bg-zinc-500 px-4 py-2 border-2 text-amber-500 border-black">
                  ProjectName
                </th>
                <th className="w-10 bg-zinc-500 px-4 py-2 border-2 text-amber-500 border-black">
                  ProjectCode
                </th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(item)}
                  style={{ cursor: "pointer" }}
                  className="border-2 border-black hover:bg-slate-400"
                >
                  <td className="w-8 border-2 border-black px-2 py-2">
                    {item.manager}
                  </td>
                  <td className="w-8 border-2 border-black text-center px-2 py-2">
                    {item.projectName}
                  </td>
                  <td className="w-10 border-2 border-black text-center px-2 py-2">
                    {item.projectCode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedData && (
          <Box className="mt-4 w-full bg-white border-2 border-black shadow-lg p-4">
            <h2 className="flex justify-center text-2xl bg-gray-200">TimeSheet</h2>
            <br />
            <div className="flex justify-center font-bold">
              <Link to={getEmployeeLink(selectedData.manager)}>
                <div className="flex">
                  <p>Manager's TimeSheet :</p>
                  <button className="bg-red-200 ml-2">{selectedData.manager}</button>
                </div>
              </Link>
            </div>
            <br />
            <div className="justify-center mr-8">
              <p className="flex justify-center">Employee's TimeSheet</p>
              <br />
              <table className="border border-black bg-slate-100 table-fixed ml-20">
                <thead>
                  <tr>
                    <th className="w-4 bg-zinc-500 px-2 py-2 border-2 text-amber-500 border-black">
                      Employees
                    </th>
                    <th className="w-4 bg-zinc-500 px-2 py-2 border-2 text-amber-500 border-black">
                      ProjectCode
                    </th>
                    <th className="w-4 bg-zinc-500 px-2 py-2 border-2 text-amber-500 border-black">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedData.employees.map((employee, index) => (
                    <tr
                      key={index}
                      style={{ cursor: "pointer" }}
                      className="hover:bg-slate-400"
                    >
                      <td className="border-2 border-black px-2 py-2">
                        <a
                          href={getEmployeeLink(employee)}
                          onClick={() => handleEmployeeClick(employee)}
                        >
                          {employee}
                        </a>
                      </td>
                      <td className="border-2 border-black px-2 py-2">
                        ps12345
                      </td>
                      <td className="border-2 border-black px-2 py-2">
                        NO
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Box>
        )}
      </main>
    </div>
  );
};

export default TableA;
