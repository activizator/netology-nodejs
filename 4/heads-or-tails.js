#!/usr/bin/env node

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

const readline = require('readline');
const input = readline.createInterface(process.stdin);

function guessTheNumber(value) {
    const coin = new Coin();
    let c = parseInt(value);
    if ( c === 1 || c === 2 ) {
        if (c == coin.side) {
            console.log("Победа!");
            //process.exit(-1);
        } else {
            console.log("Победил компьютер");
            //process.exit(-1);
        }
    } else {
        console.log("Нужно ввести 1 или 2");
    }
}

console.log("Угадайте число 1 или 2. Введите вариант:");
input.on('line', (value) => guessTheNumber(value));