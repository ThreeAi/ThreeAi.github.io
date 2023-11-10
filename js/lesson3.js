const questions = [
    {
        question: "Вопрос: А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        answers: [
            { text: "Полдеревни, зараз", correct: true },
            { text: "Пол деревни, за раз", correct: false },
            { text: "Пол-деревни, за раз", correct: false }
        ],
        description: "Правильно! Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом."
    },
    {
        question: "Вопрос: А эти слова как пишутся?",
        answers: [
            { text: "Капучино и эспрессо", correct: true },
            { text: "Капуччино и эспрессо", correct: false },
            { text: "Каппуччино и экспресо", correct: false }
        ],
        description: "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо»."
    },
    {
        question: "Вопрос: Как нужно писать?",
        answers: [
            { text: "Чересчур", correct: true },
            { text: "Черезчур", correct: false },
            { text: "Черес-чур", correct: false }
        ],
        description: "Да! Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур»."
    },
    {
        question: "Вопрос: Где допущена ошибка?",
        answers: [
            { text: "Эпелепсия", correct: true },
            { text: "Аккордеон", correct: false },
            { text: "Белиберда", correct: false }
        ],
        description: "Верно! Это слово пишется так: «эпИлепсия»."
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
        const descriptionBlock = document.createElement("div");
        descriptionBlock.textContent = question.description;
        descriptionBlock.classList.add("answer_block");
        answersContainer.children[0].appendChild(descriptionBlock);
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
    displayListQuestion(correct);
    setTimeout(animateSlideDown, 7000);
    // setInterval(answersContainer.innerHTML = '', 20000);
    // displayQuestion(currentQuestion);
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

function animateSlideDown()
{
    const children = Array.from(answersContainer.children[0].children);
    for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        console.log(child);
        child.classList.add('animated_slideDown');
        child.style.animationDelay = `${children.length - 1 - i}s`;
    }
    answersContainer.children[0].classList.add('animated_slideDown');
    answersContainer.children[0].style.animationDelay = `${children.length - 1 - i}s`;
    console.log(answersContainer.children[0]);
    setTimeout(delite, (children.length + 1) * 1000);
    setTimeout(displayQuestion, (children.length + 1) * 1000);
}

function delite()
{
    answersContainer.innerHTML = '';
}


function showResults() {
    resultContainer.textContent = `Вы ответили правильно на ${correctAnswers} из ${questions.length} вопросов.`;
}

displayQuestion();