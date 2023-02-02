import { useState, useEffect } from 'react';
import { setCount } from './SetCountDown';
const Countdown = (countDownDate) => {
  console.log('countDownDatecountDownDate', countDownDate);
  const [time, setTime] = useState({
    d: '0',
    h: '0',
    m: '0',
    s: '0',
  });
  useEffect(() => {
    let x = setInterval(() => {
      setCount(countDownDate ? countDownDate.countDownDate : 0, setTime, x);
    }, 1000);
    return () => {
      clearInterval(x);
    };
  }, [countDownDate.countDownDate]);

  return (
    <div
      style={{ width: '100%', margin: '0 auto' }}
      className='countdown-clock b-firstchild-color'
    >
      <div>
        <p className=''>{time.d}</p>
        <p className=''>Day</p>
      </div>
      <div>
        <p className=''>{time.h}</p>
        <p className=''>Hour</p>
      </div>
      <div>
        <p className=''> {time.m}</p>
        <p className=''>Min</p>
      </div>
      <div>
        <p className=''> {time.s}</p>
        <p className=''>Sec</p>
      </div>
    </div>
  );
};

export default Countdown;
