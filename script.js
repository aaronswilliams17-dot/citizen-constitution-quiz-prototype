let quizData = [];
let currentQuestion = null;
let selectedAnswer = null;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const submitBtn = document.getElementById("submitBtn");

const resultSection = document.getElementById("result-section");
const resultEl = document.getElementById("result");
const explanationEl = document.getElementById("explanation");
const sourceEl = document.getElementById("source");
const nextBtn = document.getElementById("nextBtn");

fetch("data/quiz-bank.json")
  .then(res => res.json())
  .then(data => {
    quizData = data;
    loadQuiz();
  });

function loadQuiz() {
  resultSection.classList.add("hidden");
  submitBtn.disabled = true;
  selectedAnswer = null;

  // Simulated "daily AI selection"
  const index = Math.floor(Math.random() * quizData.length);
  currentQuestion = quizData[index];

  questionEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach((choice, i) => {
    const label = document.createElement("label");
    label.className = "choice";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "choice";
    input.value = i;

    input.addEventListener("change", () => {
      selectedAnswer = i;
      submitBtn.disabled = false;
    });

    label.appendChild(input);
    label.append(" " + choice);
    choicesEl.appendChild(label);
  });
}

submitBtn.addEventListener("click", () => {
  if (selectedAnswer === null) return;

  const correct = selectedAnswer === currentQuestion.correctIndex;
  resultEl.textContent = correct ? "Correct ✅" : "Incorrect ❌";

  explanationEl.textContent = currentQuestion.explanation;
  sourceEl.textContent = currentQuestion.source;

  resultSection.classList.remove("hidden");
});

nextBtn.addEventListener("click", loadQuiz);
