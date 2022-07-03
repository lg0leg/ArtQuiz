let quizType = 'artist';

const artistQuizButton = document.querySelector('#artist-quiz-button');
const pictturesQuizButton = document.querySelector('#pictures-quiz-button');
const settingsButton = document.querySelector('#button-settings-main');
const settingsModal = document.querySelector('#settings-modal');
const switcher = document.querySelector('#switcher');
let isSwitcherOn = true;

artistQuizButton.addEventListener('click', () => {
  quizType = 'artist';
  setLocalStorage();
});

pictturesQuizButton.addEventListener('click', () => {
  quizType = 'pictures';
  setLocalStorage();
});

switcher.addEventListener('click', () => {
  switcher.classList.toggle('switch-btn-on');
  isSwitcherOn = switcher.classList.contains('switch-btn-on') ? true : false;
});

settingsButton.addEventListener('click', () => {
  settingsModal.classList.toggle('settings-modal-active');
});

function setLocalStorage() {
  localStorage.setItem('quizType', quizType);
}

window.addEventListener('beforeunload', setLocalStorage);
