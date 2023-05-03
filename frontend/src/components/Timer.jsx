import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Timer = ({ time }) => {
  const [timerDetails, setTimerDetails] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });

  const { hours, minutes, seconds } = timerDetails;

  useEffect(() => {
    console.log("running");
    const targetDate = new Date(time).getTime() + 24 * 60 * 60 * 1000;
    const now = new Date().getTime();
    const diff = targetDate - now;
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeout(() => {
      if (diff > 0) {
        setTimerDetails({
          hours: ("0" + hours).slice(-2),
          minutes: ("0" + minutes).slice(-2),
          seconds: ("0" + seconds).slice(-2),
        });
      }
    }, 1000);
    //eslint-disable-next-line
  }, [seconds]);

  return <div>{`${hours} : ${minutes} : ${seconds}`}</div>;
};

export default Timer;
