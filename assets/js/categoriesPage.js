let quizCategorie = 'portrait';
let quizType;
let quizResultArr;

const settingsButton = document.querySelector('#button-settings-categories');
const settingsModal = document.querySelector('#settings-modal');
const switcher = document.querySelector('#switcher');
let isSwitcherOn = true;

const categoriesContainer = document.querySelector('#categoriesContainer');

categoriesContainer.addEventListener('click', (event) => {
  quizCategorie = event.target.id;
  setLocalStorage();
});

function setLocalStorage() {
  localStorage.setItem('quizCategorie', quizCategorie);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('quizType')) {
    quizType = localStorage.getItem('quizType');
  }
  if (localStorage.getItem('quizResultArr')) {
    quizResultArr = JSON.parse(localStorage.getItem('quizResultArr'));
  }
}

getLocalStorage();
window.addEventListener('load', getLocalStorage);

function setQuizresult(quizType, quizResultArr) {
  let i;
  if (quizType == 'artist') {
    i = 0;
  } else {
    i = 1;
  }
  document.querySelector('#portrait-result').innerHTML = quizResultArr[i].portrait;
  document.querySelector('#landscape-result').innerHTML = quizResultArr[i].landscape;
  document.querySelector('#stillLife-result').innerHTML = quizResultArr[i].stillLife;
  document.querySelector('#impressionism-result').innerHTML = quizResultArr[i].impressionism;
  document.querySelector('#expressionism-result').innerHTML = quizResultArr[i].expressionism;
  document.querySelector('#avantgarde-result').innerHTML = quizResultArr[i].avantgarde;
  document.querySelector('#renaissance-result').innerHTML = quizResultArr[i].renaissance;
  document.querySelector('#surrealism-result').innerHTML = quizResultArr[i].surrealism;
  document.querySelector('#kitsch-result').innerHTML = quizResultArr[i].kitsch;
  document.querySelector('#minimalism-result').innerHTML = quizResultArr[i].minimalism;
  document.querySelector('#interior-result').innerHTML = quizResultArr[i].interior;
  document.querySelector('#nude-result').innerHTML = quizResultArr[i].nude;
}

setQuizresult(quizType, quizResultArr);

function setFilterForPassed(quizType, quizResultArr) {
  let i;
  if (quizType == 'artist') {
    i = 0;
  } else {
    i = 1;
  }
  if (quizResultArr[i].portrait > 0) {
    document.querySelector('#portrait').classList.add('img-black-filter');
  }
  if (quizResultArr[i].landscape > 0) {
    document.querySelector('#landscape').classList.add('img-black-filter');
  }
  if (quizResultArr[i].stillLife > 0) {
    document.querySelector('#stillLife').classList.add('img-black-filter');
  }
  if (quizResultArr[i].impressionism > 0) {
    document.querySelector('#impressionism').classList.add('img-black-filter');
  }
  if (quizResultArr[i].expressionism > 0) {
    document.querySelector('#expressionism').classList.add('img-black-filter');
  }
  if (quizResultArr[i].avantgarde > 0) {
    document.querySelector('#avantgarde').classList.add('img-black-filter');
  }
  if (quizResultArr[i].renaissance > 0) {
    document.querySelector('#renaissance').classList.add('img-black-filter');
  }
  if (quizResultArr[i].surrealism > 0) {
    document.querySelector('#surrealism').classList.add('img-black-filter');
  }
  if (quizResultArr[i].kitsch > 0) {
    document.querySelector('#kitsch').classList.add('img-black-filter');
  }
  if (quizResultArr[i].minimalism > 0) {
    document.querySelector('#minimalism').classList.add('img-black-filter');
  }
  if (quizResultArr[i].interior > 0) {
    document.querySelector('#interior').classList.add('img-black-filter');
  }
  if (quizResultArr[i].nude > 0) {
    document.querySelector('#nude').classList.add('img-black-filter');
  }
}

switcher.addEventListener('click', () => {
  switcher.classList.toggle('switch-btn-on');
  isSwitcherOn = switcher.classList.contains('switch-btn-on') ? true : false;
});

settingsButton.addEventListener('click', () => {
  settingsModal.classList.toggle('settings-modal-active');
});

setFilterForPassed(quizType, quizResultArr);
