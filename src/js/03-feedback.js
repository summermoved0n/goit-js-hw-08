import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('.feedback-form input');

getText();

form.addEventListener('submit', onFormSubmit);

form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(evt) {
  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  const formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(formData);
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
