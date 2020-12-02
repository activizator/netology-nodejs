#!/usr/bin/env node

const http = require('http');
let argCity = process.argv[2];

let url =`http://api.weatherstack.com/`;
const key = process.env.WEATHER_API_KEY;
let city = argCity ? argCity: "Moscow";
url=url + `/current?access_key=${key}&query=${city}`;

http.get(url, (res) => {
    const statusCode = res.statusCode;
    if (statusCode !== 200) {
        console.error(`Status Code: ${statusCode}`);
        return;
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        let parsedData = JSON.parse(rawData);
        console.log(parsedData);
        process.exit(-1);
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    process.exit(-1);
});