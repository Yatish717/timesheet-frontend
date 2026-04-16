import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Landing from './Pages/Landing';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Userprofile from './Pages/Userprofile';
import Demo from './Pages/Demo';
import Leave1 from './Pages/Leave';
import Atten1 from './Pages/Attendance';
import Project1 from './Pages/Project1';
// import Table from './Pages/Table1';

// import Aspl5 from './Pages/Table1';
import { Table } from 'antd';
import Table1 from './Pages/Table1';
import Empdetails from './Pages/Empdetails';
import Createuser from './Pages/Createuser';
import Tablem from './Pages/Tablem';
import TableA from './Pages/TableA';
import Costcenter from './Pages/Costcenter';
import Forgot from './Pages/Fpassword';
import Test from './Pages/Test';
import PrivateRoute from './Pages/PrivateRoute';
import ManProEmp from './Pages/ManProEmp';
import WeeEmpAppr from './Pages/WeeEmpAppr';
import Month from './Pages/Month';
import Create1 from './Pages/Create';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Graph from './Pages/graph';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Forgot" element={<Forgot />} />
      <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
      <Route path="/user" element={<PrivateRoute element={Userprofile} />} />
      <Route path="/empdetails" element={<PrivateRoute element={Empdetails} />} />
      <Route path="/createuser" element={<PrivateRoute element={Createuser} />} />
      <Route path="/tablem" element={<PrivateRoute element={Tablem} />} />
      <Route path="/tablemanProEmp" element={<PrivateRoute element={ManProEmp} />} />
      <Route path="/tablea" element={<PrivateRoute element={TableA} />} />
      <Route path="/costcenter" element={<PrivateRoute element={Costcenter} />} />
      <Route path="/Demo" element={<PrivateRoute element={Demo} />} />
      <Route path="/Leave1" element={<PrivateRoute element={Leave1} />} />
      <Route path="/Atten1" element={<PrivateRoute element={Atten1} />} />
      <Route path="/project1" element={<PrivateRoute element={Project1} />} />
      <Route path="/table1" element={<PrivateRoute element={Table1} />} />
      <Route path="/weeklydataapproval" element={<PrivateRoute element={WeeEmpAppr} />} />
      <Route path="/Month" element={<PrivateRoute element={Month} />} />
      <Route path="/Create1" element={<PrivateRoute element={Create1} />} />
      <Route path="/graph" element={<PrivateRoute element={Graph} />} />
      {/* <Route path="/table1" element={<Table1/>}/> */}
      {/* <Route path="/Aspl5" element={<Aspl5/>}/> */}
      {/* <Route path="/AddTableRows" element={<AddTableRows/>}/> */}
      {/* <Route path="/datecomponent" element={<DateComponent/>}/> */}
      <Route path="/testRoute" element={<Test />} />
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      limit={3}
    />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
