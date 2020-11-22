const containerEl = document.querySelector(".container");
const questionNumberEl = document.querySelector(".question_number");
const questionsQuantityEl = document.querySelector(".questions_quantity");

let currentQuestionIndex = 0;
let correctAnswers = 0;

const questionsURL = "https://opentdb.com/api.php?amount=10";

const getQuestions = async () => {
  const { results } = await fetch(questionsURL).then((resp) => resp.json());

  return results;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const addResultElement = (correctAnswers, questionsQuantity) => {
  containerEl.classList.add("result");
  containerEl.innerHTML = `
    <h1>${correctAnswers}/${questionsQuantity}</h1>
    <p>correct answers</p>
    <button>Start again</button>
  `;
};

const createQuestionEl = ({ question, correct_answer, incorrect_answers }) => {
  const rawAnswers = [correct_answer, ...incorrect_answers];
  const answers = shuffleArray(shuffleArray(rawAnswers));
  const wrapper = document.createElement("div");
  wrapper.classList.add("question");

  wrapper.innerHTML = `
    <h4>${question}</h4>
    <ul class="options"></ul>
  `;
  answers.forEach((answer) => {
    wrapper.querySelector(
      ".options"
    ).innerHTML += `<li class="option" data-value="${answer}">${answer}</li>`;
  });

  return wrapper;
};

const removeCurrentQuestionEl = () => {
  const questionEl = document.querySelector(".question");

  if (questionEl) {
    questionEl.remove();
  }
};

const setCurrentQuestionPosition = () => {
  questionNumberEl.innerText = currentQuestionIndex + 1;
};

const handleAnswerSelect = (questions) => {
  if (currentQuestionIndex < questions.length) {
    setTimeout(() => {
      addNewQuestionToDOM(questions);
    }, 1000);
  } else {
    removeCurrentQuestionEl();
    addResultElement(correctAnswers, questions.length);
  }
};

const addNewQuestionToDOM = (questions) => {
  setCurrentQuestionPosition();
  removeCurrentQuestionEl();

  const currentQuestion = questions[currentQuestionIndex];
  const questionEl = createQuestionEl(currentQuestion);

  questionEl.addEventListener("click", ({ target }) => {
    const targetValue = target.dataset.value;

    if (targetValue) {
      const isCorrectAnswer = targetValue === currentQuestion.correct_answer;
      const answerClass = isCorrectAnswer ? "success" : "error";

      target.classList.add(answerClass);
      correctAnswers += isCorrectAnswer; // boolean in math converts to 1 or 0
      currentQuestionIndex += 1;

      handleAnswerSelect(questions);
    }
  });

  containerEl.appendChild(questionEl);
};

const init = async () => {
  const questions = await getQuestions();
  questionsQuantityEl.innerText = questions.length;

  addNewQuestionToDOM(questions);
};

init();
