console.log("init_game is connect");
const userName = document.getElementById("user_name").textContent.trim();
const modeForm = document.getElementById("mode_form");
const levelForm = document.getElementById("level_form");
const descriptoin = document.querySelector(".description");

modeForm.addEventListener("change", handleModeForm);
levelForm.addEventListener("change", handleLevelForm);
sessionStorage.setItem('mode', GAME_MODE.TIME);
sessionStorage.setItem('level', 'easy_level');

function handleModeForm(event) {
    event.preventDefault();
    mode = event.target.value;
    sessionStorage.setItem('mode', mode);
    console.log(sessionStorage.getItem('mode'));
    createStartButton();
}

function handleLevelForm(event) {
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
            desc = 'В этом режиме вам нужно выбрать как можно больше следов похожих на эталлоный до первой ошибки \n';
            break;
        case 'time':
            desc = 'В этом режиме вам нужно выбрать как можно больше следов похожих на эталлоный за 1 минуту \n';
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