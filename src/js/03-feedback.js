import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('.feedback-form input');
const formData = {};

getText();

form.addEventListener('submit', onFormSubmit);

form.addEventListener('input', throttle((e) => {
  formData[e.target.name] = e.target.value
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500));

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function getText() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    input.value = savedMessage.email;
    textarea.value = savedMessage.message;
  }
}
