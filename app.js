const Questions = [
  {
    question: "What is the capital of France?",
    correct_answer: "Paris",
    incorrect_answers: ["London", "Berlin", "Madrid"],
  },
  {
    question: "Which planet is known as the Red Planet?",
    correct_answer: "Mars",
    incorrect_answers: ["Venus", "Jupiter", "Saturn"],
  },
  {
    question: "Who wrote 'Hamlet'?",
    correct_answer: "William Shakespeare",
    incorrect_answers: ["Charles Dickens", "Leo Tolstoy", "Mark Twain"],
  },
];

let currentQuesIndex = 0;
let score = 0;

const ques = document.getElementById("ques");
const opt = document.getElementById("opt");
function loadQues() {
  if (currentQuesIndex < Questions.length) {
    let currentQues = Questions[currentQuesIndex].question;
    ques.innerText = currentQues;
    opt.innerHTML = "";

    const correct_answer = Questions[currentQuesIndex].correct_answer;
    const incorrect_answers = Questions[currentQuesIndex].incorrect_answers;

    let options = [correct_answer, ...incorrect_answers];
    options = options.sort(() => Math.random() - 0.5);
    options.forEach((option) => {
      const optionLable = document.createElement("label");
      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = "option";
      optionInput.value = option;
      optionLable.innerText = option;
      opt.appendChild(optionInput);
      opt.appendChild(optionLable);
    });
  } else {
    ques.innerText = "Quiz Completed!";
  }
}

function nextQues() {
  if (currentQuesIndex < Questions.length - 1) {
    currentQuesIndex++;
    loadQues();
  } else {
    ques.innerText = "Quiz Completed!";
    opt.innerHTML = "";
    document.getElementById("btn").remove();
    loadScore();
  }
}

function loadScore() {
  const totalScore = document.getElementById("score");
  totalScore.textContent = `Your score is ${score} out of ${Questions.length}`;
  totalScore.innerHTML += `<button onclick="location.reload()">Restart Quiz</button>`;
  Questions.forEach((ques, index) => {
    totalScore.innerHTML += `<p>Q${index + 1}: ${ques.question} <br> Correct Answer: ${ques.correct_answer}</p>`;
  });
}
function checkAns() {
  const selectedOption = document
    .getElementById("opt")
    .querySelector('input[name="option"]:checked');
  if (selectedOption) {
    if (selectedOption.value === Questions[currentQuesIndex].correct_answer) {
      score++;
    }
  } else {
    alert("Please select an option");
    return;
  }

  nextQues();
}

loadQues();
