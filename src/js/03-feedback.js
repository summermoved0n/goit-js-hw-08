import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('.feedback-form input');
let formData = {};

getText();

form.addEventListener('submit', onFormSubmit);

input.addEventListener(
  'input',
  throttle(e => {
    (formData.email = e.target.value),
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, 500)
);

textarea.addEventListener(
  'input',
  throttle(e => {
    (formData.message = e.target.value),
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, 500)
);


function onFormSubmit(e) {
  e.preventDefault();
  console.log({
    email: input.value,
    message: textarea.value,
  });
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function getText() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    input.value = savedMessage.email || '';
    textarea.value = savedMessage.message || '';
  }
}
