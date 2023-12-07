const standardBlock = document.getElementById("standart_print");
const listOfPrints = document.getElementById("list_of_prints");

function initGame() {
    if(sessionStorage.getItem('mode') === GAME_MODE.TIME) {
        const game = new GameOnTime(sessionStorage.getItem('level'));
    }
    else {
        const game = new GameOnDurability(sessionStorage.getItem('level'));
    }
}