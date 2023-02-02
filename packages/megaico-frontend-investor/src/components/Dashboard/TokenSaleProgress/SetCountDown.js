export const setCount = (countDownDate, setTime, x) => {
  let now = new Date().getTime();
  let distance = countDownDate - now;
  if (distance >= 0) {
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setTime({ d: days, h: hours, m: minutes, s: seconds });
  }
  if (distance < 0) {
    clearInterval(x);
    return;
  }
};
