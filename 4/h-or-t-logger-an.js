#!/usr/bin/env node

const fs = require('fs');
let logFN = process.argv[2];

if (!logFN) {
    console.log('Введите название файла для анализа логов игры в качестве первого аргумента анализатора.');
    console.log('Пример: node ./h-or-t-logger-an.js log.txt');
    process.exit(-1);
}

if (fs.existsSync('./' + logFN)) {

    fs.readFile('./' + logFN, 'utf8', (error, data) => {
        if (error) {
            console.log(`Не могу открыть указанный файл логов ${logFN}`);
            process.exit(-1);
        } else {

            try {
                let jsonData = JSON.parse(data);
                if (!jsonData.games_ammount || !jsonData.wins_ammount) {
                    throw error;
                }
                if (!Number.isInteger(jsonData.games_ammount) || !Number.isInteger(jsonData.wins_ammount)) {
                    throw error;
                }
                console.log(`Общее количество партий: ${jsonData.games_ammount}`);
                console.log(`Количество выигранных: ${jsonData.wins_ammount} / проигранных партий: ${jsonData.games_ammount - jsonData.wins_ammount}`);
                console.log(`Процентное соотношение выигранных партий: ${Math.round(jsonData.wins_ammount/jsonData.games_ammount*100)}%`);
                process.exit(-1);
            } catch(err) {
                console.log('Неверный формат данных в анализируемом файле');
                process.exit(-1);
            }

        }  
    });

} else {
    console.log(`Указанный файл логов ${logFN} не существует`);
    process.exit(-1);
}