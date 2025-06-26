const questions = [
    {
        question : "Qual o nome do guitarrista da banda Queen?",
        answers: [
            { id: 1, text: "Slash", correct:false },
            { id: 2, text: "Jimmy Page", correct:false },
            { id: 3, text: "Angus Young", correct:false },
            { id: 4, text: "Brian May", correct:true },
            { id: 5, text: "Joe Walsh", correct:false }
        ]


    },
    {
        question : "Qual desses roqueiros morreu de causas naturais?",
        answers: [
            { id: 1, text: "Kurt Cobain(Nirvana)", correct:false },
            { id: 2, text: "Chester Bennington(Link Park)", correct:false },
            { id: 3, text: "Ian Curtis(Joy Division)", correct:false },
            { id: 4, text: "Paul Hester(Crowded House)", correct:false },
            { id: 5, text: "Michael Nesmith(Monkees)", correct:true }
        ]


    },
    {
        question : "De acordo com a revista Forbes, qual a maior banda de rock da história?",
        answers: [
            { id: 1, text: "Beatles", correct:false },
            { id: 2, text: "Led Zeppelin", correct:true },
            { id: 3, text: "Metallica", correct:false },
            { id: 4, text: "Pink Floyd", correct:false },
            { id: 5, text: "Queen", correct:false }
        ]


    },
    {
        question : "Qual dessas lendas do rock teve um irmão que nasceu morto?",
        answers: [
            { id: 1, text: "Elvis Presley", correct:true },
            { id: 2, text: "Steven Tyler", correct:false },
            { id: 3, text: "Freddie Mercury", correct:false },
            { id: 4, text: "Paul Mccartney", correct:false },
            { id: 5, text: "Axel Rose", correct:false }
        ]


    },
    {
        question : "Qual dessas bandas possui dois irmãos como integrantes?",
        answers: [
            { id: 1, text: "AC/DC", correct:true},
            { id: 2, text: "Radiohead", correct:false },
            { id: 3, text: "Gorillaz", correct:false },
            { id: 4, text: "KISS", correct:false },
            { id: 5, text: "Aerosmith", correct:false }
        ]


    },
    {
        question : "Qual show de rock foi adicionado ao Guinness Book como o show com maior público de todos os tempos?",
        answers: [
            { id: 1, text: "AC/DC", correct:false },
            { id: 2, text: "Metallica", correct:false },
            { id: 3, text: "Rod Stewart", correct:true },
            { id: 4, text: "Queen", correct:false },
            { id: 5, text: "The Rolling Stones", correct:false }
        ]


    },
    {
        question : "Quando é o dia Mundial do Rock?",
        answers: [
            { id: 1, text: "11 de Julho", correct:false },
            { id: 2, text: "12 de Julho", correct:false },
            { id: 3, text: "13 de Julho", correct:true },
            { id: 4, text: "14 de Julho", correct:false },
            { id: 5, text: "15 de Julho", correct:false }
        ],


    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container"); // Você precisa ter um contêiner principal com esse id
const userNameInput = document.getElementById("username");
const timerElement = document.getElementById("time");


let userName = "";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 7;
let totalElapsedTime = 0;
let questionStartTime;


function startTimer() {
  timeLeft = 7;
  timerElement.innerHTML = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerHTML = timeLeft;


    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeOut();
    }
  }, 1000);
}
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("timer").style.display = "block";
  nextButton.innerHTML = "Próxima";
  showQuestion();
  totalElapsedTime = 0;
}

function handleTimeOut() {
  const answers = questions[currentQuestionIndex].answers;
  const correctAnswer = answers.find(answer => answer.correct);
  const timeTaken = (Date.now() - questionStartTime) / 1000;
totalElapsedTime += timeTaken;
  Array.from(answerButtons.children).forEach(button => {
    if (button.textContent === correctAnswer.text) {
      button.classList.add("correct");
    } else {
      button.classList.add("disabled");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("button");
    answerButtons.appendChild(button);


    button.dataset.id = answer.id;
    if (answer.correct) {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
  });
  questionStartTime = Date.now();
  startTimer();
}
function resetState() {
  clearInterval(timer);
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


function selectAnswer(e) {
  clearInterval(timer);
  const timeTaken = (Date.now() - questionStartTime) / 1000; // em segundos
  totalElapsedTime += timeTaken;
  answers = questions[currentQuestionIndex].answers;
  const correctAnswer = answers.filter((answer) => answer.correct == true)[0];
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }
  else {
    selectedBtn.classList.add("incorrect");
  }
 
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");  
}
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

  function showScore() {
  resetState();
  clearInterval(timer);
  document.getElementById("timer").style.display = "none";
 
  const mediaTempo = (totalElapsedTime/questions.length).toFixed(2);


  questionElement.innerHTML = `${userName}, você acertou ${score} de ${questions.length}!<br>
  Média de tempo por pergunta: ${mediaTempo} segundos`;
 
  nextButton.innerHTML = "Jogue Novamente";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startBtn.addEventListener("click", () => {
  const name = userNameInput.value.trim();
  if (name === "") {
    alert("Por favor, digite seu nome para começar.");
    return;
  }

  userName = name;
  startScreen.style.display = "none";
  quizContainer.style.display = "block";

startQuiz();
});
