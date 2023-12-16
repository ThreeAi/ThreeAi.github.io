console.log("init_game is connect");
const userName = document.getElementById("user_name");
const modeForm = document.getElementById("mode_form");
const levelForm = document.getElementById("level_form");
const descriptoin = document.querySelector(".description");

userName.textContent = sessionStorage.getItem('username');
modeForm.addEventListener("change", handleModeForm);
levelForm.addEventListener("change", handleLevelForm);
sessionStorage.setItem('mode', GAME_MODE.TIME);
sessionStorage.setItem('level', 'easy_level');


function handleModeForm(event) {
    cleanBoard();
    event.preventDefault();
    mode = event.target.value;
    sessionStorage.setItem('mode', mode);
    console.log(sessionStorage.getItem('mode'));
    createStartButton();
}

function handleLevelForm(event) {
    cleanBoard();
    event.preventDefault();
    level = event.target.value;
    sessionStorage.setItem('level', level);
    console.log(sessionStorage.getItem('level'));
    createStartButton();
}
console.log(sessionStorage.getItem('mode'));
console.log(sessionStorage.getItem('level'));
createStartButton();

function createStartButton() {
    descriptoin.innerHTML='';
    const text = document.createElement('div');
    let desc = "";
    switch (sessionStorage.getItem('mode')) {
        case 'durability':
            desc = 'В этом режиме вам нужно выбрать как можно больше картинок с эталлоным следом до первой ошибки \n';
            break;
        case 'time':
            desc = 'В этом режиме вам нужно выбрать как можно больше картинок с эталлоным следом за 1 минуту \n';
    }
    text.textContent = desc;
    descriptoin.appendChild(text);
    const button = document.createElement('div');
    button.classList.add('submit_button');
    button.textContent = 'Старт';

    button.addEventListener('click', function () {
        descriptoin.innerHTML='';
        console.log('start');
        initGame();
    });

    descriptoin.appendChild(button);

}