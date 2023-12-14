
class Game {
    constructor(level) {
        this.level = level;
        this.isEnd = false;
        this.score = 0;
        switch (level) {
            case GAME_LEVEL.EASY:
                this.coefficient = 0.25;
                break;
            case GAME_LEVEL.NORMAL:
                this.coefficient = 0.5;
                break;
            case GAME_LEVEL.HARD:
                this.coefficient = 1;
                break;
        }
        this.standartPrintBlock = document.getElementById('standart_print');
        this.listOfPrintsBlock = document.getElementById('list_of_prints');
    }

    running() {
        if (!this.isEnd) {
            this.showPrints();
        }
        else {
            this.end();
        }
    }

    end() {
        this.standartPrintBlock.innerHTML = "";
        this.listOfPrintsBlock.innerHTML = "";
        descriptoin.innerHTML =
            `Игра окочена, вы набрали ${this.score} очков
        <a href="history_screen.html">
            <div class="history_button">
                    История игр
            </div>
        </a>`;
        const result = {
            score: this.score,
            user_name: sessionStorage.getItem('username'),
            level: this.level,
            date: new Date().toLocaleString(),
        }

        let history = JSON.parse(localStorage.getItem('gameHistory')) || [];
        history.push(result);
        console.log(result);
        localStorage.setItem('gameHistory', JSON.stringify(history));
    }

    showPrints() {
        this.standartPrintBlock.innerHTML = "";
        this.listOfPrintsBlock.innerHTML = "";
        const rightIndex = getRandomInt(0, PRINTS.length - 1);
        let print;
        switch (this.level) {
            case GAME_LEVEL.EASY:
                print = new FirstLevelPrint(rightIndex);
                break;
            case GAME_LEVEL.NORMAL:
                print = new SecondLevelPrint(rightIndex);
                break;
            case GAME_LEVEL.HARD:
                print = new ThirdLevelPrint(rightIndex);
                break;
        }
        console.log(print);
        this.standartPrintBlock.appendChild(print.createPrint());
        const arrayPrints = [];
        let onePrint = print.createRightPrint();
        onePrint.addEventListener('click', () => this.handlerRightAnswer());
        onePrint.addEventListener("dragenter", handlerDragenter);
        onePrint.addEventListener("dragover", handlerDragover);
        onePrint.addEventListener("drop", () => this.handlerRightAnswer());
        arrayPrints.push(onePrint);
        for (let i = 0; i < 3; i++) {
            onePrint = print.createWrongPrint();
            onePrint.addEventListener('click', () => this.handlerWrongAnswer());
            onePrint.addEventListener("dragenter", handlerDragenter);
            onePrint.addEventListener("dragover", handlerDragover);
            onePrint.addEventListener("drop", () => this.handlerWrongAnswer());
            arrayPrints.push(onePrint);
        }

        shuffleArray(arrayPrints);

        arrayPrints.forEach((div) => {
            this.listOfPrintsBlock.appendChild(div);
        })
    }


}

class GameOnTime extends Game {
    constructor(level) {
        super(level);
        this.timeStart = Date.now() + (60 * 1000);
        console.log("init game on time")
        const scoreboard = document.createElement('div');
        scoreboard.classList.add('scoreboard');

        const timeBlock = document.createElement('div');
        timeBlock.classList.add('time_block');
        timeBlock.textContent = "Время: " + Math.floor((this.timeStart - Date.now()) / 1000);

        const scoreBlock = document.createElement('div');
        scoreBlock.classList.add('score_block');
        scoreBlock.textContent = "Очки: " + this.score;

        scoreboard.appendChild(timeBlock);
        scoreboard.appendChild(scoreBlock);
        descriptoin.appendChild(scoreboard);

        this.scoreBlock = document.querySelector('.score_block');
        this.timeBlock = document.querySelector('.time_block');
    }

    start() {
        setTimeout(() => { this.refreshTime() }, 100);
        this.running();
    }

    refreshTime() {
        const timeLeft = Math.floor((this.timeStart - Date.now()) / 1000);
        if (timeLeft < 0) {
            this.isEnd = true;
            var list = this.listOfPrintsBlock.querySelectorAll('div');
            list.forEach(function(element) {
                element.classList.add('shake');
            })
        }
        else {
            this.timeBlock.textContent = "Время: " + timeLeft;
            setTimeout(() => { this.refreshTime() }, 100);
        }
    }

    handlerRightAnswer() {
        console.log("right answer");
        this.score = this.score + this.coefficient * 40;
        this.scoreBlock.textContent = "Очки: " + this.score;
        this.running();
    }

    handlerWrongAnswer() {
        console.log("wrong answer");
        this.timeStart = this.timeStart - 5000;
        this.running();
    }
}

class GameOnDurability extends Game {
    constructor(level) {
        super(level);
        console.log("init game on durability")
        const scoreboard = document.createElement('div');
        scoreboard.classList.add('scoreboard');

        const scoreBlock = document.createElement('div');
        scoreBlock.classList.add('score_block');
        scoreBlock.textContent = "Очки: " + this.score;

        scoreboard.appendChild(scoreBlock);
        descriptoin.appendChild(scoreboard);

        this.scoreBlock = document.querySelector('.score_block');
    }

    start() {
        this.running();
    }

    handlerRightAnswer() {
        console.log("right answer");
        this.score = this.score + this.coefficient * 40;
        this.scoreBlock.textContent = "Очки: " + this.score;
        this.running();
    }

    handlerWrongAnswer() {
        this.isEnd = true;
        console.log("wrong answer");
        this.running();
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function handlerDragenter(event) {
    event.preventDefault();
}

function handlerDragover(event) {
    event.preventDefault();
}