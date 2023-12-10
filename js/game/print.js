class Print {
    constructor(numberPrint) {
        this.numberPrint = numberPrint;
        this.src = PRINTS[numberPrint];
    }

    createPrint() {
        const object = document.createElement('div');
        object.classList.add('print');

        const print = document.createElement('img');
        print.src = this.src;
        print.width = 150;
        print.style.height = 'auto';
        object.appendChild(print);

        return (object);
    }

    getImg(src, width) {
        const print = document.createElement('img');
        print.src = src;
        print.width = width;
        print.style.height = 'auto';
        const randomScaleX = Math.random() * (1 - 0.5) + 0.5;
        const randomScaleY = Math.random() * (1 - 0.5) + 0.5;
        const randomRotation = Math.random() * 360;
        print.style.transform = `scaleX(${randomScaleX}) scaleY(${randomScaleY}) rotate(${randomRotation}deg)`;
        return print;
    }
}

class FirstLevelPrint extends Print {
    constructor(numberPrint) {
        super(numberPrint);
    }

    createRightPrint() {
        const object = document.createElement('div');
        object.classList.add('print');
        object.appendChild(this.getImg(PRINTS[this.numberPrint], 150));
        return object;
    }

    createWrongPrint() {
        let randomIndex = getRandomInt(0, PRINTS.length - 1);
        while (randomIndex == this.numberPrint) {
            randomIndex = getRandomInt(0, PRINTS.length - 1);
        }
        const object = document.createElement('div');
        object.classList.add('print');
        object.appendChild(this.getImg(PRINTS[randomIndex], 150));
        return object;
    }

}

class SecondLevelPrint extends Print {

    createRightPrint() {
        const object = document.createElement('div');
        object.classList.add('print_grid');
        const arrayImgs = [];
        arrayImgs.push(this.getImg(PRINTS[this.numberPrint], 75))
        for (let i = 0; i < 3; i++) {
            arrayImgs.push(this.getImg(PRINTS[getRandomInt(0, PRINTS.length - 1)], 75));
        }
        shuffleArray(arrayImgs);
        arrayImgs.forEach(img => {
            object.appendChild(img);
        });

        return object;
    }

    createWrongPrint() {
        const object = document.createElement('div');
        object.classList.add('print_grid');
        const arrayImgs = [];
        for (let i = 0; i < 4; i++) {
            let randomIndex = getRandomInt(0, PRINTS.length - 1);
            while (randomIndex == this.numberPrint) {
                randomIndex = getRandomInt(0, PRINTS.length - 1);
            }
            arrayImgs.push(this.getImg(PRINTS[randomIndex], 75));
        }
        arrayImgs.forEach(img => {
            object.appendChild(img);
        });

        return object;
    }
}

class ThirdLevelPrint extends Print {
    createRightPrint() {
        const object = document.createElement('div');
        object.classList.add('print_grid');
        const arrayImgs = [];
        arrayImgs.push(this.getImg(PRINTS[this.numberPrint], 75))
        for (let i = 0; i < 3; i++) {
            arrayImgs.push(this.getImg(PRINTS[getRandomInt(0, PRINTS.length - 1)], 75));
        }
        shuffleArray(arrayImgs);
        const wheelPrint = this.getImg(WHEELS[getRandomInt(0, WHEELS.length - 1)], 150);
        wheelPrint.classList.add('wheels');
        arrayImgs.push(wheelPrint);
        arrayImgs.forEach(img => {
            object.appendChild(img);
        });

        return object;
    }

    createWrongPrint() {
        const object = document.createElement('div');
        object.classList.add('print_grid');
        const arrayImgs = [];
        for (let i = 0; i < 4; i++) {
            let randomIndex = getRandomInt(0, PRINTS.length - 1);
            while (randomIndex == this.numberPrint) {
                randomIndex = getRandomInt(0, PRINTS.length - 1);
            }
            arrayImgs.push(this.getImg(PRINTS[randomIndex], 75));
        }
        const wheelPrint = this.getImg(WHEELS[getRandomInt(0, WHEELS.length - 1)], 180);
        wheelPrint.classList.add('wheels');
        arrayImgs.push(wheelPrint);
        arrayImgs.forEach(img => {
            object.appendChild(img);
        });

        return object;
    }
}

