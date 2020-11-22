#!/usr/bin/env node

// Утилита командной строки, которая играет в игру "Загадай число". Программа загадывает число и выводит диапазон значений, в пределах которого число было загадано. Пользователь набирает числа в стандартный поток ввода и получает ответ больше или меньше, чем загаданное.

function guessTheNumber(value) {
    if (!Number.isInteger(parseInt(value))) {
        console.log("Введите число");
    }
    if (parseInt(value) < riddle) {
        console.log("Маленькое число");
    }
    if (parseInt(value) > riddle) {
        console.log("Большое число");
    }
    if (parseInt(value) == riddle) {
        console.log("Победа!");
        process.exit(-1);
    }
}

const readline = require('readline');
const input = readline.createInterface(process.stdin);
const riddle = Math.floor(Math.random() * 101);

console.log("Угадайте число от 0 до 100. Введите вариант:");
input.on('line', (value) => guessTheNumber(value));
