const containerEl = document.querySelector(".container");
const questionNumberEl = document.querySelector(".question_number");
const questionsQuantityEl = document.querySelector(".questions_quantity");
let currentQuestionIndex = 0;

const questionsURL = "https://opentdb.com/api.php?amount=10";

const getQuestions = async () => {
  const { results } = await fetch(questionsURL).then((resp) => resp.json());

  return results;
};

const createQuestionEl = ({ question, correct_answer, incorrect_answers }) => {
  const answers = [correct_answer, ...incorrect_answers];
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

const init = async () => {
  const questions = await getQuestions();

  const question = createQuestionEl(questions[currentQuestionIndex]);
  containerEl.appendChild(question);
};

init();
