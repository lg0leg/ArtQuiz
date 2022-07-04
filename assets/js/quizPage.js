import images from './images.js';

const artistBlock = document.querySelector('#guess-artist-block');
const pictureBlock = document.querySelector('#guess-picture-block');
const artistBlockImg = document.querySelector('#guess-artist-block-picture');
const artistBlockAuthor1 = document.querySelector('#guess-artist-block-author-1');
const artistBlockAuthor2 = document.querySelector('#guess-artist-block-author-2');
const artistBlockAuthor3 = document.querySelector('#guess-artist-block-author-3');
const artistBlockAuthor4 = document.querySelector('#guess-artist-block-author-4');
const pictureBlockAuthor = document.querySelector('#guess-picture-block-author-name');
const pictureBlockImg1 = document.querySelector('#guess-picture-block-img-1');
const pictureBlockImg2 = document.querySelector('#guess-picture-block-img-2');
const pictureBlockImg3 = document.querySelector('#guess-picture-block-img-3');
const pictureBlockImg4 = document.querySelector('#guess-picture-block-img-4');
const answerDotsBlock = document.querySelector('#correct-answer-dots');
const answerDotsItem = document.querySelectorAll('.answer-dots-item');
const blackScreenFilter = document.querySelector('#black-screen');
const modalWrapper = document.querySelector('#modal-wrapper');
const modalAfterEveryAnswer = document.querySelector('#modal-after-every-answer');
const correctPictureImg = document.querySelector('#correct-picture-img');
const correctIcon = document.querySelector('#correct-or-wrong-icon');
const correctTitlePicture = document.querySelector('#correct-title-picture');
const correctAuthorPicture = document.querySelector('#correct-author-picture');
const modalAfterLastAnswer = document.querySelector('#modal-after-last-answer');
const correctAnswersCounter = document.querySelector('#correct-answers-counter');
const artistButton1 = document.querySelector('#guess-artist-block-button-1');
const artistButton2 = document.querySelector('#guess-artist-block-button-2');
const artistButton3 = document.querySelector('#guess-artist-block-button-3');
const artistButton4 = document.querySelector('#guess-artist-block-button-4');
const picturesButton1 = document.querySelector('#guess-pictures-block-button-1');
const picturesButton2 = document.querySelector('#guess-pictures-block-button-2');
const picturesButton3 = document.querySelector('#guess-pictures-block-button-3');
const picturesButton4 = document.querySelector('#guess-pictures-block-button-4');
const modalButtonNextQ = document.querySelector('#modal-after-every-button-next');
const exitButton = document.querySelector('#exit-button');
let isSoundOn = 'false';

const audio = new Audio();
audio.src = '../assets/audio/click.mp3';
audio.volume = 0.4;

let quizType;
let quizCategorie;
let numFirstQ;
let numLastQ;
let numCurrentQ = 1;
let correctAnswer = 'no';
let numRightAnswer;
let numPressedButton;
let picNum;
let totalCorrectAnswers = 0;
let quizResultArr = [
  {
    portrait: '0',
    landscape: '0',
    stillLife: '0',
    impressionism: '0',
    expressionism: '0',
    avantgarde: '0',
    renaissance: '0',
    surrealism: '0',
    kitsch: '0',
    minimalism: '0',
    interior: '0',
    nude: '0',
  },
  {
    portrait: '0',
    landscape: '0',
    stillLife: '0',
    impressionism: '0',
    expressionism: '0',
    avantgarde: '0',
    renaissance: '0',
    surrealism: '0',
    kitsch: '0',
    minimalism: '0',
    interior: '0',
    nude: '0',
  },
];

let setQ = new Set();

function fillArrayQuestions() {
  for (let index = 0; index < 240; index++) {
    setQ.add(index);
  }
}

fillArrayQuestions();

function getLocalStorage() {
  if (localStorage.getItem('quizType')) {
    quizType = localStorage.getItem('quizType');
  }
  if (localStorage.getItem('quizCategorie')) {
    quizCategorie = localStorage.getItem('quizCategorie');
  }
  if (localStorage.getItem('quizResultArr')) {
    quizResultArr = JSON.parse(localStorage.getItem('quizResultArr'));
  }
  if (localStorage.getItem('isSound')) {
    let a = localStorage.getItem('isSound');
    isSoundOn = a;
  }
}

function setLocalStorage() {
  localStorage.setItem('quizResultArr', JSON.stringify(quizResultArr));
}

getLocalStorage();
window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

/*Меняет центральный блок под тип викторины*/

function setQuizType(quizType) {
  if (quizType == 'artist') {
    artistBlock.classList.remove('visually-hidden');
    pictureBlock.classList.add('visually-hidden');
  } else {
    artistBlock.classList.add('visually-hidden');
    pictureBlock.classList.remove('visually-hidden');
  }
}

setQuizType(quizType);

/*Устанавливает диапазон объектов из images для генерации вопросов под каждую категорию*/

function setRangeForCategories(quizType, quizCategorie) {
  if (quizCategorie == 'portrait') {
    numFirstQ = 0;
    numLastQ = 9;
  } else if (quizCategorie == 'landscape') {
    numFirstQ = 10;
    numLastQ = 19;
  } else if (quizCategorie == 'stillLife') {
    numFirstQ = 20;
    numLastQ = 29;
  } else if (quizCategorie == 'impressionism') {
    numFirstQ = 30;
    numLastQ = 39;
  } else if (quizCategorie == 'expressionism') {
    numFirstQ = 40;
    numLastQ = 49;
  } else if (quizCategorie == 'avantgarde') {
    numFirstQ = 50;
    numLastQ = 59;
  } else if (quizCategorie == 'renaissance') {
    numFirstQ = 60;
    numLastQ = 69;
  } else if (quizCategorie == 'surrealism') {
    numFirstQ = 70;
    numLastQ = 79;
  } else if (quizCategorie == 'kitsch') {
    numFirstQ = 80;
    numLastQ = 89;
  } else if (quizCategorie == 'minimalism') {
    numFirstQ = 90;
    numLastQ = 99;
  } else if (quizCategorie == 'interior') {
    numFirstQ = 100;
    numLastQ = 109;
  } else if (quizCategorie == 'nude') {
    numFirstQ = 110;
    numLastQ = 119;
  }

  if (quizType == 'pictures') {
    numFirstQ += 120;
    numLastQ += 120;
  }
}

setRangeForCategories(quizType, quizCategorie);

/*Удаляет вопросы текущей категории из сета*/

function deleteQuestionsNumFromSet() {
  for (let index = numFirstQ; index < numLastQ + 1; index++) {
    setQ.delete(index);
  }
}

deleteQuestionsNumFromSet();

/*Заполняет центральный блок для первого типа викторины*/

function setContentArtistBlock(imageNum, author1, author2, author3, author4) {
  artistBlockImg.src = `../assets/img/${imageNum}.jpg`;
  artistBlockAuthor1.innerHTML = images[author1].author;
  artistBlockAuthor2.innerHTML = images[author2].author;
  artistBlockAuthor3.innerHTML = images[author3].author;
  artistBlockAuthor4.innerHTML = images[author4].author;
}

/*Заполняет центральный блок для второго типа викторины*/

function setContentPictureBlock(authorName, img1, img2, img3, img4) {
  pictureBlockAuthor.innerHTML = images[authorName].author;
  pictureBlockImg1.src = `../assets/img/${img1}.jpg`;
  pictureBlockImg2.src = `../assets/img/${img2}.jpg`;
  pictureBlockImg3.src = `../assets/img/${img3}.jpg`;
  pictureBlockImg4.src = `../assets/img/${img4}.jpg`;
}

/*Добавляет/убирает заливку у буллетов*/

function setFillAnswerDots(numCurrentQ, correctAnswer) {
  if ((correctAnswer = 'yes')) {
    answerDotsItem[numCurrentQ - 1].classList.add('pink');
  }
}

function clearFillAnswerDots() {
  answerDotsItem.forEach((item) => item.classList.remove('pink'));
  answerDotsItem.forEach((item) => item.classList.remove('active-dot'));
}

/*Переключают видимость блоков, z-index блокирует нижние слои*/

function toggleBlackFilter() {
  blackScreenFilter.classList.toggle('visually-hidden');
}

function toggleModalVisible() {
  modalWrapper.classList.toggle('visually-hidden');
}

/*Добавляет модальное окно после каждого ответа*/

function setContentModalEvery(picNum, correctAnswer) {
  toggleBlackFilter();
  toggleModalVisible();
  correctPictureImg.src = `../assets/img/${picNum}.jpg`;
  if (correctAnswer == 'yes') {
    correctIcon.src = `../assets/app-img/correct_answer_icon.png`;
    afterAnswerSound(isSoundOn, correctAnswer);
  } else {
    correctIcon.src = `../assets/app-img/wrong_answer_icon.png`;
    afterAnswerSound(isSoundOn, correctAnswer);
  }
  correctTitlePicture.innerHTML = images[picNum].name;
  let str = images[picNum].author + ', ' + images[picNum].year;
  correctAuthorPicture.innerHTML = str;
  modalAfterEveryAnswer.classList.remove('visually-hidden');
  setTimeout(() => {
    modalAfterEveryAnswer.classList.remove('fade');
  }, 100);
}

function modalEveryOff() {
  modalAfterEveryAnswer.classList.add('fade');
  setTimeout(() => {
    modalAfterEveryAnswer.classList.add('visually-hidden');
    toggleModalVisible();
    toggleBlackFilter();
  }, 300);
}

/*Добавляет модальное окно после последнего ответа*/

function setContentModalLast(totalCorrectAnswers) {
  toggleBlackFilter();
  toggleModalVisible();
  correctAnswersCounter.innerHTML = totalCorrectAnswers;
  modalAfterLastAnswer.classList.remove('visually-hidden');
  setTimeout(() => {
    victorySound(isSoundOn);
  }, 300);
}

function modalLastOff() {
  modalAfterLastAnswer.classList.add('visually-hidden');
  toggleModalVisible();
  toggleBlackFilter();
}

/*Обработчики для кнопок*/

artistButton1.addEventListener('click', () => {
  checkAnswer(0);
});

artistButton2.addEventListener('click', () => {
  checkAnswer(1);
});

artistButton3.addEventListener('click', () => {
  checkAnswer(2);
});

artistButton4.addEventListener('click', () => {
  checkAnswer(3);
});

picturesButton1.addEventListener('click', () => {
  checkAnswer(0);
});

picturesButton2.addEventListener('click', () => {
  checkAnswer(1);
});

picturesButton3.addEventListener('click', () => {
  checkAnswer(2);
});

picturesButton4.addEventListener('click', () => {
  checkAnswer(3);
});

modalButtonNextQ.addEventListener('click', () => {
  setNextQuestion();
  justClickSound(isSoundOn);
});

exitButton.addEventListener('click', (e) => {
  e.preventDefault();
  justClickSound(isSoundOn);
  setTimeout(() => {
    document.location.href = './categories.html';
  }, 200);
});

/*Запускает викторину*/

function startQuiz(quizType) {
  if (quizType == 'artist') {
    makeQuestionArtistType(numCurrentQ);
  } else {
    makeQuestionPicturesType(numCurrentQ);
  }
}

startQuiz(quizType);

/*Случайное число по количеству вопросов*/

function getRandomAns() {
  let num = Math.floor(Math.random() * 240);
  return num;
}

/*numCurrentQ это число от 1 до 10, номер текущего вопроса (не от 0)*/
/*Генерирует рандомные варианты ответа, проверяет чтобы авторы не повторялись, 
устанавливает правильный вариант и заменяет им один из случайных*/

function makeQuestionArtistType(numCurrentQ) {
  let imageNum = numFirstQ - 1 + numCurrentQ;
  picNum = imageNum;
  answerDotsItem[numCurrentQ - 1].classList.add('active-dot');

  const arrOptions = [];
  const setUnique = [images[imageNum].author];

  while (arrOptions.length < 4) {
    let num = getRandomAns();
    if (setQ.has(num) && setUnique.indexOf(images[num].author) == '-1') {
      setQ.delete(num);
      arrOptions.push(num);
      setUnique.push(images[num].author);
    }
  }

  numRightAnswer = Math.floor(Math.random() * 4);
  arrOptions.splice(numRightAnswer, 1, imageNum);

  let author1 = arrOptions[0];
  let author2 = arrOptions[1];
  let author3 = arrOptions[2];
  let author4 = arrOptions[3];

  setContentArtistBlock(imageNum, author1, author2, author3, author4);
}

/*authorName это тоже число*/

function makeQuestionPicturesType(numCurrentQ) {
  let authorName = numFirstQ - 1 + numCurrentQ;
  picNum = authorName;
  answerDotsItem[numCurrentQ - 1].classList.add('active-dot');

  const arrOptions = [];
  const setUnique = [images[authorName].author];

  while (arrOptions.length < 4) {
    let num = getRandomAns();
    if (setQ.has(num) && setUnique.indexOf(images[num].author) == '-1') {
      setQ.delete(num);
      arrOptions.push(num);
      setUnique.push(images[num].author);
    }
  }

  numRightAnswer = Math.floor(Math.random() * 4);
  arrOptions.splice(numRightAnswer, 1, authorName);

  let img1 = arrOptions[0];
  let img2 = arrOptions[1];
  let img3 = arrOptions[2];
  let img4 = arrOptions[3];

  setContentPictureBlock(authorName, img1, img2, img3, img4);
}

/*Проверяет выбранный вариант*/

function checkAnswer(numPressedButton) {
  if (numPressedButton == numRightAnswer) {
    correctAnswer = 'yes';
    totalCorrectAnswers += 1;
    setFillAnswerDots(numCurrentQ, correctAnswer);
  } else {
    correctAnswer = 'no';
  }
  setTimeout(() => {
    setContentModalEvery(picNum, correctAnswer);
  }, 200);
  // setContentModalEvery(picNum, correctAnswer);

  numCurrentQ += 1;
}

/*Переходит к следующему вопросу либо завершает викторину, обновляет local storage*/

function setNextQuestion() {
  if (numCurrentQ == '11') {
    modalEveryOff();
    setContentModalLast(totalCorrectAnswers);
    let a, b;
    if (quizType == 'artist') {
      a = 0;
      b = quizCategorie;
    } else {
      a = 1;
      b = quizCategorie;
    }
    quizResultArr[a][b] = totalCorrectAnswers;
  } else {
    modalEveryOff();
    startQuiz(quizType);
  }
}

/*звуки для кнопок*/

function justClickSound(isSoundOn) {
  if (isSoundOn == 'true') {
    audio.src = '../assets/audio/click.mp3';
    audio.play();
  }
}

function victorySound(isSoundOn) {
  if (isSoundOn == 'true') {
    audio.src = '../assets/audio/final.mp3';
    audio.play();
  }
}

function afterAnswerSound(isSoundOn, isCorrect) {
  if (isSoundOn == 'true') {
    audio.src = isCorrect == 'yes' ? '../assets/audio/correct.mp3' : '../assets/audio/wrong.mp3';
    audio.play();
  }
}
