const flip = (container, number) => {
  const currentNumber = container.dataset.number;
  const baseTop = container.querySelector('.base .top');
  const baseBottom = container.querySelector('.base .bottom');
  const flaps = container.querySelectorAll('.flap');
  const front = container.querySelector('.front');
  const back = container.querySelector('.back');

  container.dataset.number = number;
  front.dataset.content = currentNumber;
  back.dataset.content = number;

  baseTop.innerHTML = number;

  flaps.forEach((flap) => { flap.classList.add('show'); });

  setTimeout(() => {
    flaps.forEach((flap) => { flap.classList.remove('show'); });
    baseBottom.innerHTML = number;
  }, 600);
};

const set = (container, number) => {
  const base = container.querySelectorAll('.base div');
  container.dataset.number = number;
  base.forEach((div) => { div.innerHTML = number; });
};

const update = (key, time, shouldFlip) => {
  let currentTime = String(time).padStart(2, '0');

  const container1 = document.querySelector(`.${key}-1`);
  const container2 = document.querySelector(`.${key}-2`);

  const number1 = currentTime.charAt(0);
  const number2 = currentTime.charAt(1);

  if (container1.dataset.number !== number1) {
    shouldFlip ? flip(container1, number1) : set(container1, number1);
  }
  if (container2.dataset.number !== number2) {
    shouldFlip ? flip(container2, number2) : set(container2, number2);
  }
};

// Initialize countdown to end of current month
let targetDate = (() => {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  console.log(`Initial target date: ${date}`);
  return date;
})();

const getRemainingTime = () => {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };

  const totalSeconds = Math.floor(diff / 1000);
  const d = Math.floor(totalSeconds / (60 * 60 * 24));
  const h = Math.floor((totalSeconds / 3600) % 24);
  const m = Math.floor((totalSeconds / 60) % 60);
  const s = totalSeconds % 60;

  return { d, h, m, s, done: false };
};

const setTime = (shouldFlip) => {
  const { d, h, m, s, done } = getRemainingTime();

  console.log(`Time left → Days: ${d}, Hours: ${h}, Minutes: ${m}, Seconds: ${s}`);

  update('day', d, shouldFlip);
  update('hour', h, shouldFlip);
  update('minute', m, shouldFlip);
  update('second', s, shouldFlip);

  if (done) {
    console.log("Countdown finished. Resetting to next month's end...");
    const now = new Date();
    targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    console.log(`New target date: ${targetDate}`);
  }
};

setTime(false); // Initial load
const timerInterval = setInterval(() => {
  setTime(true);
}, 1000);
