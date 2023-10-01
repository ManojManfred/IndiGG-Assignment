const quizData = [
    {
        question: "What is the kernel in the Linux operating system?",
        options: ["The core of the operating system", "A user interface", "A file system", "An application"],
        correctAnswer: "The core of the operating system"
    },
    {
        question: "Which command is used to list files and directories in a directory in Linux?",
        options: ["ls", "dir", "list", "show"],
        correctAnswer: "ls"
    },
    {
        question: "What does the command 'pwd' stand for?",
        options: ["Print Working Directory", "Path of Working Directory", "Previous Working Directory", "Print Directory"],
        correctAnswer: "Print Working Directory"
    },
    {
        question: "In Linux, what is the purpose of the 'sudo' command?",
        options: ["Switch user", "Superuser do", "System update", "Secure user access"],
        correctAnswer: "Superuser do"
    },
    {
        question: "Which file is used to store user-specific configuration in Linux?",
        options: [".bashrc", ".config", ".settings", ".preferences"],
        correctAnswer: ".bashrc"
    },
    {
        question: "What is the purpose of the 'chmod' command in Linux?",
        options: ["Change modification", "Change mode", "Change owner", "Change directory"],
        correctAnswer: "Change mode"
    },
    {
        question: "What is the package manager used in Ubuntu and other Debian-based systems?",
        options: ["RPM", "YUM", "APT", "Dpkg"],
        correctAnswer: "APT"
    },
    
];


let currentQuestion = 0;
let score = 0;
let timers = [];
let timeRemaining = 0;
const timeLimit = 180; 

const startInstructions = document.getElementById('start-instructions');
const questionArea = document.querySelector('.question-area');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const results = document.getElementById('results');
const timerDisplay = document.getElementById('timer-display');

const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    startInstructions.style.display = 'none';
    questionArea.style.display = 'block';
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'block';
    timeRemaining = timeLimit;
    initializeTimers(); 
    displayQuestion();
    startTimer();
}

function initializeTimers() {
    // Initialize a timer for each question
    timers = Array(quizData.length).fill(timeLimit);
}

function displayQuestion() {
    const q = quizData[currentQuestion];
    questionArea.innerHTML = `<div class="question">
        <p>${currentQuestion + 1}. ${q.question}</p>
    </div>`;

    q.options.forEach((option, i) => {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `q${currentQuestion}`;
        input.value = option;
        input.id = `q${currentQuestion}o${i}`;

        const label = document.createElement('label');
        label.setAttribute('for', `q${currentQuestion}o${i}`);
        label.textContent = option;

        questionArea.appendChild(input);
        questionArea.appendChild(label);
    });
}

nextBtn.addEventListener('click', showNextQuestion);

function showNextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);

    if (selectedOption) {
        const userAnswer = selectedOption.value;
        const correctAnswer = quizData[currentQuestion].correctAnswer;
        if (userAnswer === correctAnswer) {
            score++;
        }
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        displayQuestion();
        startTimer();
    } else {
       
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    }
}

submitBtn.addEventListener('click', showResults);

function showResults() {
    results.style.display = 'block';
    questionArea.style.display = 'none';
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'none';

    const scorePercentage = Math.floor((score / quizData.length) * 100);
    results.innerHTML = `<p>Your final score is: ${score}/${quizData.length} (${scorePercentage}%)</p>`;
    clearInterval(timers[currentQuestion]);
}

function startTimer() {
    timerDisplay.style.display = 'block';
    updateTimerDisplay();
    timers[currentQuestion] = setInterval(() => {
        if (timers[currentQuestion] <= 0) {
            clearInterval(timers[currentQuestion]);
            
            showResultsForQuestion(currentQuestion);
        } else {
            timers[currentQuestion]--;
            updateTimerDisplay();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timers[currentQuestion] / 60);
    const seconds = timers[currentQuestion] % 60;
    timerDisplay.textContent = `Time remaining: ${minutes}m ${seconds}s`;
}

function resetTimer() {
    clearInterval(timers[currentQuestion]);
    timerDisplay.style.display = 'none';
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeRemaining = 0; 
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'block';
    results.style.display = 'none';
    startQuiz();
}

startInstructions.style.display = 'block';
questionArea.style.display = 'none';
submitBtn.style.display = 'none';
nextBtn.style.display = 'none';
results.style.display = 'none';
timerDisplay.style.display = 'none';
