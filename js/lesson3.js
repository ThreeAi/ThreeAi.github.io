const questions = [
    {
        question: "Вопрос: А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        answers: [
            { text: "Полдеревни, зараз", correct: true },
            { text: "Пол деревни, за раз", correct: false },
            { text: "Пол-деревни, за раз", correct: false }
        ]
    },
    {
        question: "Вопрос: А эти слова как пишутся?",
        answers: [
            { text: "Капучино и эспрессо", correct: true },
            { text: "Капуччино и эспрессо", correct: false },
            { text: "Каппуччино и экспресо", correct: false }
        ]
    },
    {
        question: "Вопрос: Как нужно писать?",
        answers: [
            { text: "Чересчур", correct: true },
            { text: "Черезчур", correct: false },
            { text: "Черес-чур", correct: false }
        ]
    },
    {
        question: "Вопрос: Где допущена ошибка?",
        answers: [
            { text: "Эпелепсия", correct: true },
            { text: "Аккордеон", correct: false },
            { text: "Белиберда", correct: false }
        ]
    }
];

const questionsContainer = document.getElementById("questions");
const resultContainer = document.getElementById("count_questions");
const answersContainer = document.getElementById("answers");
let currentQuestion = 0;
let correctAnswers = 0;

shuffleArray(questions);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("question-block");
    questionBlock.textContent = `${currentQuestion + 1}  ${questions[currentQuestion].question}`;
    selectQuestion(questionBlock);
    answersContainer.appendChild(questionBlock);
}

function selectQuestion(questionBlock) {
    const question = questions[currentQuestion];
    shuffleArray(question.answers);

    question.answers.forEach((answer, answerIndex) => {
        const answerBlock = document.createElement("div");
        answerBlock.textContent = answer.text;
        answerBlock.classList.add("answer_block");
        answerBlock.addEventListener("click", () => checkAnswer(answerIndex));
        questionBlock.appendChild(answerBlock);
    });
}

function checkAnswer(answerIndex) {
    const question = questions[currentQuestion];
    const answer = question.answers[answerIndex];
    let correct;
    if (answer.correct) {
        correctAnswers++;
        answersContainer.children[0].children[answerIndex].classList.add("correct");
        correct = true;
    } else {
        answersContainer.children[0].children[answerIndex].classList.add("incorrect");
        correct = false;
    }
    answersContainer.children[0].style.pointerEvents='none';
    currentQuestion++;
    if (currentQuestion < questions.length) {
        nextQuestion(correct);
    } else {
        displayListQuestion(correct);
        showResults();
    }
}

function nextQuestion(correct) {
    const nextButton = document.createElement("div");
    nextButton.classList.add("answer_block");
    nextButton.textContent = `Следующий вопрос`;
    nextButton.addEventListener("click", () => {
        answersContainer.innerHTML = '';
        displayListQuestion(correct);
        displayQuestion(currentQuestion);
        });
    answersContainer.appendChild(nextButton);
}

function displayListQuestion(correct) {
    const shortQuestion = document.createElement("div");
    const marker = document.createElement("img");
    if (correct) {
        shortQuestion.classList.add("correct");
        marker.src = "../images/correct.png";
    }   
    else {
        shortQuestion.classList.add("incorrect");
        marker.src = "../images/incorrect.png";
    }
    shortQuestion.classList.add('hidden_block');
    shortQuestion.textContent = `${currentQuestion} ${questions[currentQuestion - 1].question}`;
    shortQuestion.appendChild(marker);
    questionsContainer.appendChild(shortQuestion);
}

function showResults() {
    resultContainer.textContent = `Вы ответили правильно на ${correctAnswers} из ${questions.length} вопросов.`;
}

displayQuestion();