import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('.feedback-form input[name="email"]'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(storageformData, 500));
refs.email.addEventListener('input', throttle(storageformData, 500));
let formData = {};
populateTextarea();

function onFormSubmit(e){
  e.preventDefault();

  console.log(formData);
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};

};
function storageformData(e){
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    formData = JSON.parse(storedData)
    let { email, message } = refs.form.elements;
    email.value = formData.email + "";
    message.value = formData.message + "";
  }

}



// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
