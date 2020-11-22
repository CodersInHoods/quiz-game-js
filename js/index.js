const containerEl = document.querySelector(".container");
const questionNumberEl = document.querySelector(".question_number");
const questionsQuantityEl = document.querySelector(".questions_quantity");

// Mock question object
const mockQuestion = {
  category: "General Knowledge",
  type: "multiple",
  difficulty: "medium",
  question: "Which essential condiment is also known as Japanese horseradish?",
  correct_answer: "Wasabi ",
  incorrect_answers: ["Mentsuyu", "Karashi", "Ponzu"],
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

// Mock DOM question element
containerEl.appendChild(createQuestionEl(mockQuestion));
