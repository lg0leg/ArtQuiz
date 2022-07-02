let quizType = 'artist';

const artistQuizButton = document.querySelector('#artist-quiz-button');
const pictturesQuizButton = document.querySelector('#pictures-quiz-button')

artistQuizButton.addEventListener('click', () => {
    quizType = 'artist';
    setLocalStorage();
});

pictturesQuizButton.addEventListener('click', () => {
    quizType = 'pictures';
    setLocalStorage();
});

function setLocalStorage() {
    localStorage.setItem('quizType', quizType);
}

window.addEventListener('beforeunload', setLocalStorage);

