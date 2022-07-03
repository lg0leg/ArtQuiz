let quizType = 'artist';

const artistQuizButton = document.querySelector('#artist-quiz-button');
const pictturesQuizButton = document.querySelector('#pictures-quiz-button');
const settingsButton = document.querySelector('#button-settings-main');
const settingsModal = document.querySelector('#settings-modal');
const switcher = document.querySelector('#switcher');
let isSwitcherOn = 'false';

const audio = new Audio();
audio.src = '../assets/audio/click.mp3';
audio.volume = 0.5;

function playAudio(isSwitcherOn) {
  if (isSwitcherOn == 'true') {
    audio.play();
  }
}

function checkSwitcher(isSwitcherOn) {
  if (isSwitcherOn == 'true') {
    switcher.classList.add('switch-btn-on');
    isSwitcherOn = 'true';
  } else {
    switcher.classList.remove('switch-btn-on');
    isSwitcherOn = 'false';
  }
}

/*обработчики*/

artistQuizButton.addEventListener('click', (e) => {
  e.preventDefault();
  quizType = 'artist';
  setLocalStorage();
  playAudio(isSwitcherOn);
  setTimeout(() => {
    document.location.href = './html/categories.html';
  }, 200);
});

pictturesQuizButton.addEventListener('click', (e) => {
  e.preventDefault();
  quizType = 'pictures';
  setLocalStorage();
  playAudio(isSwitcherOn);
  setTimeout(() => {
    document.location.href = './html/categories.html';
  }, 200);
});

switcher.addEventListener('click', () => {
  switcher.classList.toggle('switch-btn-on');
  isSwitcherOn = switcher.classList.contains('switch-btn-on') ? 'true' : 'false';
  setLocalStorage();
});

settingsButton.addEventListener('click', () => {
  settingsModal.classList.toggle('settings-modal-active');
  playAudio(isSwitcherOn);
});

/*ls*/

function setLocalStorage() {
  localStorage.setItem('quizType', quizType);
  localStorage.setItem('isSound', isSwitcherOn);
}

function getLocalStorage() {
  if (localStorage.getItem('isSound')) {
    let a = localStorage.getItem('isSound');
    isSwitcherOn = a;
    checkSwitcher(a);
  }
}

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);
