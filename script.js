const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which programming language is used for web development?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correct: 2
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        showResult();
        return;
    }
    
    const question = quizData[currentQuestion];
    questionEl.textContent = question.question;
    
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectOption(index));
        optionsEl.appendChild(optionDiv);
    });
    
    selectedOption = null;
    nextBtn.disabled = false;
}

function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[index].classList.add('selected');
    selectedOption = index;
}

function nextQuestion() {
    if (selectedOption === null) {
        alert('Please select an answer!');
        return;
    }
    
    if (selectedOption === quizData[currentQuestion].correct) {
        score++;
    }
    
    currentQuestion++;
    loadQuestion();
}

function showResult() {
    const percentage = (score / quizData.length) * 100;
    resultEl.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your Score: ${score} out of ${quizData.length}</p>
        <p>Percentage: ${percentage}%</p>
        ${percentage >= 70 ? '<p>🎉 Great job!</p>' : '<p>📚 Keep practicing!</p>'}
    `;
    nextBtn.style.display = 'none';
}

nextBtn.addEventListener('click', nextQuestion);

loadQuestion();
