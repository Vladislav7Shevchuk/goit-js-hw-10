import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0];

    if (selectedTime < new Date()) {
      refs.btnStart.disabled = true;
      alert('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
    }
  },
};

flatpickr(refs.input, options);

refs.btnStart.disabled = true; // Від початку кнопка неактивна
let selectedTime = null;
let timerId = null;

refs.btnStart.addEventListener('click', () => {
  refs.btnStart.disabled = true;
  refs.input.disabled = true; // Забороняємо змінювати дату після старту

  timerId = setInterval(() => {
    const timeLeft = selectedTime - new Date();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      refs.input.disabled = false;
      return;
    }

    updateTimerUI(convertMs(timeLeft));
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerUI({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

// refs.btnStart.disabled = true; // Від початку кнопка неактивна
// let selectedTime = null;
// let timerId = null;

// flatpickr(refs.input, {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     selectedTime = selectedDates[0];

//     if (selectedTime < new Date()) {
//       refs.btnStart.disabled = true;
//       alert('Please choose a date in the future');
//     } else {
//       refs.btnStart.disabled = false;
//     }
//   },
// });

// refs.btnStart.addEventListener('click', () => {
//   refs.btnStart.disabled = true;
//   refs.input.disabled = true; // Забороняємо змінювати дату після старту

//   timerId = setInterval(() => {
//     const timeLeft = selectedTime - new Date();

//     if (timeLeft <= 0) {
//       clearInterval(timerId);
//       refs.input.disabled = false;
//       return;
//     }

//     updateTimerUI(convertMs(timeLeft));
//   }, 1000);
// });

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   return {
//     days: Math.floor(ms / day),
//     hours: Math.floor((ms % day) / hour),
//     minutes: Math.floor((ms % hour) / minute),
//     seconds: Math.floor((ms % minute) / second),
//   };
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// function updateTimerUI({ days, hours, minutes, seconds }) {
//   refs.days.textContent = addLeadingZero(days);
//   refs.hours.textContent = addLeadingZero(hours);
//   refs.minutes.textContent = addLeadingZero(minutes);
//   refs.seconds.textContent = addLeadingZero(seconds);
// }
