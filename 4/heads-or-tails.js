#!/usr/bin/env node

const readline = require('readline');
const input = readline.createInterface(process.stdin);
const fs = require('fs');

class Coin {
    constructor() {
        this.side = this.#dropIt();
    }
    get side() {
        return this._side;
    }
    set side(fun) {
        this._side = fun;
    }
    #dropIt() {
        return Math.floor(Math.random() * 2) + 1;
    }
}

function guessTheNumber(value) {
    const coin = new Coin();
    const c = parseInt(value);
    if ( c === 1 || c === 2 ) {
        if (c == coin.side) {
            console.log("Победа!");
            return "win";
        } else {
            console.log("Победил компьютер");
            return "lose";
        }
    } else {
        console.log("Нужно ввести 1 или 2");
    }
}

function syncFileWrite(filename, data) {
    fs.writeFileSync(filename, data);
}

function syncFileRead(filename) {
    let result = fs.readFileSync(filename, 'utf8');
    return result;
}

let logFN = process.argv[2];
let stat;
if (logFN) {
    console.log("Логгирование игры ведется в файл: " + logFN);
    let str;
    if (fs.existsSync('./' + logFN)) {
        str = syncFileRead(logFN);
        stat = JSON.parse(str);
    } else {
        stat = {
            games_ammount: 0,
            wins_ammount: 0
        };
    }
}

console.log("Угадайте число 1 или 2. Введите вариант:");

input.on('line', (value) => {
    let res = guessTheNumber(value);

    if (res && stat) {
        if (fs.existsSync('./' + logFN)) stat = JSON.parse(syncFileRead(logFN));
        let data = {
            games_ammount: stat.games_ammount + 1,
            wins_ammount: res === "win" ? stat.wins_ammount + 1 : stat.wins_ammount
        }
        syncFileWrite(logFN, JSON.stringify(data));
    }
});
