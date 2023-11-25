document.querySelector('.accept').addEventListener('click', () => processString());
const listItems = document.querySelector('.list_items');
const upperBlock = document.querySelector('.upper_block');
const resultText = document.querySelector('.output_block');

function processString() {
    const inputString = document.querySelector('.input_string').value.trim();

    if (inputString === '') {
        alert('Введите строку для обработки');
        return;
    }

    const wordsArray = inputString.split('-').map(word => word.trim());
    const words = wordsArray.filter(word => !/^\d+$/.test(word) && word !== "").sort();
    const numbers = wordsArray.filter(word => /^\d+$/.test(word)).sort();

    listItems.innerHTML = '';
    upperBlock.innerHTML = '';
    resultText.innerHTML = '';

    words.forEach((word, index) => {
        const wordElement = createBlock(word, `a${index + 1}`);
        listItems.appendChild(wordElement);
    });

    numbers.forEach((number, index) => {
        const wordElement = createBlock(number, `n${index + 1}`);
        listItems.appendChild(wordElement);
    });

    listItems.querySelectorAll('.block').forEach((dragItem) => {
        dragItem.addEventListener("dragstart", handlerDragstart);
        dragItem.addEventListener("dragend", handlerDragend);
        dragItem.addEventListener("dragover", handlerDragdrop);
        dragItem.addEventListener("dragenter", () => {
            droppedItem = dragItem;
        })
        dragItem.addEventListener("dragleave", () => {
            droppedItem = null;
        })
    })
}

function createBlock(content, key) {
    const block = document.createElement('div');
    block.textContent = key + " " + content;
    block.classList.add('block');
    block.setAttribute('data-word', content);
    block.draggable = true;
    return block;
}

let draggedItem = null;
let droppedItem = null;

listItems.addEventListener("dragenter", handlerDragenter);
listItems.addEventListener("dragover", handlerDragover);
listItems.addEventListener("drop", handlerDragdrop);

upperBlock.addEventListener("dragenter", handlerDragenter);
upperBlock.addEventListener("dragover", handlerDragover);
upperBlock.addEventListener("drop", handlerDragdrop);

function handlerDragstart(event) {
    this.classList.add("selected");
    draggedItem = this;
}

function handlerDragend(event) {
    this.classList.remove("selected");
    draggedItem = null;
}

function handlerDragenter(event) {
    event.preventDefault();
}

function handlerDragover(event) {
    event.preventDefault();
}

function handlerDragdrop(event) {
    if (droppedItem) {
        if (droppedItem.parentElement === draggedItem.parentElement) {
            const children = Array.from(droppedItem.parentElement.children);
            const draggedIndex = children.indexOf(draggedItem);
            const droppedIndex = children.indexOf(droppedItem);

            if (draggedIndex > droppedIndex) {
                draggedItem.parentElement.insertBefore(draggedItem, droppedItem);
            }
            else {
                draggedItem.parentElement.insertBefore(draggedItem, droppedItem.nextElementSibling);
            }
        }
        else {
            this.insertBefore(draggedItem, droppedItem);
        }
    }
    else {
        this.append(draggedItem);
    }
    showResults();
}

function showResults() {
    const arrayWords = Array.from(upperBlock.children);
    let string = "";
    arrayWords.forEach((block) => {
        string += block.dataset.word;
        string += ' ';
    })
    resultText.innerHTML = string;
}