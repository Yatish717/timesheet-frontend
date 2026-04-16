import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flip, ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import axios from "axios";
import loginText from "../assests/login_text.png";
import companyLogo from "./Anmerkung.png";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const subBtn = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    companyCode: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = async () => {
    if (loginData.email === "" || loginData.password === "") {
      toast.warn("Fields can't be empty!", {
        position: "top-right",
        transition: Flip,
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const response = await toast.promise(
        axios.post(`${process.env.REACT_APP_BE_URL}/user/login/`, loginData, {
          headers: {
            Accept: "application/json",
          },
        }),
        {
          pending: "Getting you in..!",
          success: "Entering Fourth Dimension...",
        }
      );

      if (response.status === 200) {
        const userRole = response?.data.role;
        // sessionStorage.setItem("userRole", userRole);
        sessionStorage.setItem("userToken", response.data.token.access);
        sessionStorage.setItem("Admin", response.data.token.is_admin);
        sessionStorage.setItem("Manager", response.data.token.is_manager);
        sessionStorage.setItem("Employee", response.data.token.is_employee);
        navigate("/user");
      }
    } catch (error) {
      toast.error("An error occurred!", {
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

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        subBtn.current.click();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [value, setValue] = useState(new Date());
  const [clockSize, setClockSize] = useState(320);

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const updateClockSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setClockSize(200);
      } else if (width < 768) {
        setClockSize(240);
      } else if (width < 1024) {
        setClockSize(280);
      } else if (width < 1280) {
        setClockSize(320);
      } else if (width < 1536) {
        setClockSize(360);
      } else {
        setClockSize(400);
      }
    };

    updateClockSize();
    window.addEventListener('resize', updateClockSize);
    return () => window.removeEventListener('resize', updateClockSize);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left Panel - Clock Section */}
      <div className="w-full lg:w-3/5 xl:w-2/3 relative flex justify-center items-center text-white bg-gradient-to-r from-slate-200 via-slate-400 to-slate-500 min-h-[40vh] lg:min-h-screen">
        {/* Company Logo at Top Left */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 z-10">
          <img
            src={companyLogo}
            alt="Company Logo"
            className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 w-auto object-contain drop-shadow-lg"
          />
        </div>
        
        {/* Analog Clock */}
        <div className="scale-75 sm:scale-90 md:scale-100">
          <Clock
            value={value}
            size={clockSize}
            hourHandWidth={5}
            renderNumbers={true}
          />
        </div>
      </div>
      
      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-2/5 xl:w-1/3 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-6 xl:px-8 py-8 sm:py-10 md:py-12 bg-gradient-to-r from-sky-300 via-sky-600 to-sky-950 min-h-[60vh] lg:min-h-screen">
        
        <div className="w-full max-w-sm lg:max-w-md mx-auto">
          {/* Login Header Image */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <img
              src={loginText}
              alt="Login"
              className="w-24 sm:w-28 md:w-32 h-auto bg-blend-lighten border-y-2 p-1"
            />
          </div>
          
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl">
            <div className="mb-4 sm:mb-5 md:mb-6">
              <label
                htmlFor="companyCode"
                className="block text-sm sm:text-base md:text-lg font-medium text-gray-700"
              >
                Company Code
              </label>
              <input
                id="companyCode"
                name="companyCode"
                type="text"
                required
                className="w-full p-2 sm:p-2.5 md:p-3 mt-1.5 sm:mt-2 border rounded-md outline-none focus:ring-2 focus:ring-sky-500 text-sm sm:text-base"
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4 sm:mb-5 md:mb-6">
              <label
                htmlFor="email"
                className="block text-sm sm:text-base md:text-lg font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                className="w-full p-2 sm:p-2.5 md:p-3 mt-1.5 sm:mt-2 border rounded-md outline-none focus:ring-2 focus:ring-sky-500 text-sm sm:text-base"
                onChange={handleChange}
              />
            </div>
           


           
            <label
              htmlFor="password"
              className="block text-sm sm:text-base md:text-lg font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mb-4 sm:mb-5 md:mb-6 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="p-2 sm:p-2.5 md:p-3 text-sm sm:text-base border border-[#ccc] rounded-md w-full h-[44px] sm:h-[48px] md:h-[52px] pr-10"
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye className="w-4 h-4 sm:w-5 sm:h-5" /> : <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 md:py-3.5 text-base sm:text-lg md:text-xl font-semibold text-white bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200"
              onClick={handleClick}
              ref={subBtn}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
