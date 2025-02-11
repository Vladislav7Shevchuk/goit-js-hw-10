import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('[name="delay"]'),
};

function res(delay, isFulfilled) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(refs.input.value);

  const isFulfilled =
    document.querySelector('[name="state"]:checked').value === 'fulfilled';

  res(delay, isFulfilled)
    .then(message => {
      iziToast.success({
        title: 'Success',
        message: message,
        position: 'topRight',
      });
    })
    .catch(message => {
      iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight',
      });
    });
  refs.input.value = '';
});
