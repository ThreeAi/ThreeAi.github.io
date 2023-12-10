const standardBlock = document.getElementById("standart_print");
const listOfPrints = document.getElementById("list_of_prints");
let game;

function cleanBoard() {
    standardBlock.innerHTML = "";
    listOfPrints.innerHTML = "";
}

function initGame() {
    if(sessionStorage.getItem('mode') === GAME_MODE.TIME) {
        game = new GameOnTime(sessionStorage.getItem('level'));
        game.start();

    }
    else {
        game = new GameOnDurability(sessionStorage.getItem('level'));
        game.start();
    }
}