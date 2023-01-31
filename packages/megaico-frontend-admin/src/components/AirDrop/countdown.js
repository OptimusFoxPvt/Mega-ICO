import { useState, useEffect } from "react";
import { setCount } from "../IcoDistribution/TokenSaleProgress/SetCountDown";
const Countdown = (countDownDate) => {
  const [time, setTime] = useState({
    d: "0",
    h: "0",
    m: "0",
    s: "0",
  });
  useEffect(() => {
    let x = setInterval(() => {
      setCount(countDownDate.countDownDate, setTime, x);
    }, 1000);
    return () => {
      clearInterval(x);
    };
  }, []);

  return (
    <div className="row col-12 countdown-clock">
      <div>
        <span className="countdown-time countdown-time-first">{time.d}</span>
        <span className="countdown-text">Day</span>
      </div>
      <div>
        <span className="countdown-time">{time.h}</span>
        <span className="countdown-text">Hour</span>
      </div>
      <div>
        <span className="countdown-time">{time.m}</span>
        <span className="countdown-text">Min</span>
      </div>
      <div>
        <span className="countdown-time countdown-time-last">{time.s}</span>
        <span className="countdown-text">Sec</span>
      </div>
    </div>
  );
};

export default Countdown;
