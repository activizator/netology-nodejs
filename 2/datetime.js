#!/usr/bin/env node

// Утилита получения текущей даты и времени с богатым интерфейсом. Для реализации парсинга аргументов командной строки используется yargs
// Текущая дата и время в формате ISO:
// cmd current
// Текущий год:
// cmd current --year или cmd current -y
// Текущий месяц:
// cmd current --month или cmd current -m
// Дата в календарном месяце:
// cmd current --date или cmd current -d
// Есть возможность получать даты в прошлом или будущем через команды add и sub:
// cmd add -d 2 - дата и время в формате ISO на два дня вперед cmd sub --month 1 - дата и время в формате ISO на 1 месяц назад

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const datetime = new Date();
const cmd = argv['_'];

let output = "Используйте верные флаги", option = cmd[0];

switch(option) {
    case 'current':
        (Object.keys(argv).length == 2) && (output = datetime);
        (argv.m || argv.month) && (output = datetime.getUTCMonth() + 1);
        (argv.y || argv.year) && (output = datetime.getUTCFullYear());
        (argv.d || argv.date) && (output = datetime.getUTCDate());
        break;
  
    case 'add':
        (Number.isInteger((argv.d || argv.date))) && (argv.d > 0 || argv.date > 0) && 
            (output = new Date(datetime.setUTCDate(datetime.getUTCDate() + (argv.d || argv.date))));
        (Number.isInteger((argv.m || argv.month))) && (argv.m > 0 || argv.month > 0) && 
            (output = new Date(datetime.setUTCMonth(datetime.getUTCMonth() + (argv.m || argv.month))));
        (Number.isInteger((argv.y || argv.year))) && (argv.y > 0 || argv.year > 0) &&
            (output = new Date(datetime.setUTCFullYear(datetime.getUTCFullYear() + (argv.y || argv.year))));
        break;

    case 'sub':
        (Number.isInteger((argv.d || argv.date))) && (argv.d > 0 || argv.date > 0) && 
            (output = new Date(datetime.setUTCDate(datetime.getUTCDate() - (argv.d || argv.date))));
        (Number.isInteger((argv.m || argv.month))) && (argv.m > 0 || argv.month > 0) &&
            (output = new Date(datetime.setUTCMonth(datetime.getUTCMonth() - (argv.m || argv.month))));
        (Number.isInteger((argv.y || argv.year))) && (argv.y > 0 || argv.year > 0) &&
            (output = new Date(datetime.setUTCFullYear(datetime.getUTCFullYear() - (argv.y || argv.year))));
        break;

  }

console.log(output);
