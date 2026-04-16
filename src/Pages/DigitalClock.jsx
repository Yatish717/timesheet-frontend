import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => num.toString().padStart(2, '0');

  const hours = formatTime(time.getHours());
  const minutes = formatTime(time.getMinutes());
  const seconds = formatTime(time.getSeconds());

  return (
    <div className="flex items-center justify-center bg-transparent p-4 rounded-lg">
      <div className="text-black text-center">
        {/* <h2 className="text-xl mb-4 font-bold">Digital Clock</h2> */}
        <div className="flex space-x-2">
          <TimeUnit value={hours} label="" />
          <TimeUnit value={minutes} label="" />
          <TimeUnit value={seconds} label="" />
        </div>
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="bg-white bg-opacity-20 rounded-lg p-2 mb-2">
      <span className="font-mono text-4xl font-bold">{value}</span>
    </div>
    <span className="text-xs font-semibold tracking-wide">{label}</span>
  </div>
);

export default DigitalClock;