class Game { 
    constructor(level) {
        this.level = level;
        this.isEnd = false;
        this.score = 0;
    }
}

class GameOnTime extends Game{
    constructor(level) {
        super(level);
        this.timeStart = Date.now();
        console.log("init game on time")
    }
}

class GameOnDurability extends Game{
    constructor(level) {
        super(mode, level);
        this.isMistake = false; 
        console.log("init game on durability")
    }
}