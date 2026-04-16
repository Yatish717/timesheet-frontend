import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Forgot = () => {
  const [empId, setEmpId] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [otpFormVisible, setOtpFormVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "Empid") {
      setEmpId(value);
    } else if (name === "Otp") {
      setOtp(value);
    } else if (name === "Password") {
      setPassword(value);
    } else if (name === "Cpassword") {
      setCpassword(value);
    }
  };

  const handleSubmit = () => {
    if (empId.trim() === "") {
      toast.error("Please enter your Employee ID.");
    } else {
      toast.success("OTP is generating...");
      setOtpFormVisible(true);
    }
  };

  const handleSubmit1 = () => {
    if (
      empId.trim() === "" ||
      otp.trim() === "" ||
      password.trim() === "" ||
      cpassword.trim() === ""
    ) {
      toast.error("Please enter all the inputs");
    } else if (password !== cpassword) {
      toast.error("Passwords do not match");
    } else {
      toast.success("New password is created");
    }
  };

  return (
    <div className=" bg-gradient-to-r from-sky-300 via-sky-600 to-sky-950 h-screen w-full ">
      <div className=" bg-gradient-to-r from-sky-100 via-sky-200 to-sky-300 ">
        <main className=" bg-gradient-to-r from-sky-100 via-sky-200 to-sky-300 ">
          {!otpFormVisible ? (
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6/12 h-1/3 bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400  border-2 border-black shadow-lg p-4 rounded  shadow-cyan-50/50">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="flex justify-center font-bold"
              >
                <h1 className="text-2xl font-bold">Forgot Password</h1>
              </Typography>

              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                className="flex justify-center mt-6"
              >
                <div className="flex gap-2 mt-10">
                  <label className="block text-gray-700 font-bold text-2xl mb-2">
                    Employee ID:
                  </label>
                  <input
                    type="text"
                    name="Empid"
                    value={empId}
                    onChange={handleInputChange}
                    className="w-96 bg-gray-100 border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </Typography>
              <br />
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                className="flex justify-center"
              >
                <button
                  type="submit"
                  className="flex w-40 justify-center border-2 rounded-md bg-sky-100 px-3 py-2.5 text-xl font-semibold leading-6 text-black shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </Typography>
            </Box>
          ) : (
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6/12 h-2/5  bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400 border-2 border-black shadow-lg p-4 rounded  shadow-cyan-50/50">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="flex justify-center font-bold"
              >
                <h1 className="text-2xl font-bold">Forgot Password</h1>
              </Typography>

              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                className="flex justify-center mt-6"
              >
                <div className="flex gap-2 mt-10">
                  <label className="block text-gray-700 font-bold text-2xl mb-2">
                    OTP:
                  </label>
                  <input
                    type="text"
                    name="Otp"
                    value={otp}
                    onChange={handleInputChange}
                    className="w-96 bg-gray-100 border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                className="flex justify-center mt-6"
              >
                <div className="flex gap-2 mt-10">
                  <label className="block text-gray-700 font-bold text-2xl mb-2">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="Password"
                    value={password}
                    onChange={handleInputChange}
                    className="w-96 bg-gray-100 border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                className="flex justify-center mt-6"
              >
                <div className="flex gap-2 mt-10">
                  <label className="block text-gray-700 font-bold text-2xl mb-2">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    name="Cpassword"
                    value={cpassword}
                    onChange={handleInputChange}
                    className="w-96 bg-gray-100 border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </Typography>
              <br />
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                className="flex justify-center"
              >
                <div className="flex justify-between gap-4 p-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-lime-400 via-lime-600  to-lime-800 text-white text-center items-center p-2 gap-3 rounded-lg shadow-lg shadow-white  w-56 h-12 text-xl"
                    onClick={handleSubmit1}
                  >
                    Submit
                  </button>
                  <h2 className="bg-gradient-to-r from-sky-400 via-sky-600  to-sky-800 text-white text-center items-center p-2 gap-3 rounded-lg shadow-lg shadow-white  w-56 h-12 text-xl">
                    <a
                      href="/Login"
                      className="font-medium text-2xl text-white items-center  hover:text-blue-200"
                    >
                      <Link to="/login">Back to Login</Link>
                    </a>
                  </h2>
                </div>
              </Typography>
            </Box>
          )}
        </main>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Forgot;
