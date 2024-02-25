#!/usr/bin/env node
import choozing from "../chooze.js";
import readlineSync from "readline-sync";
import questions from "../questions.js";
import { randomInteger, capitalize } from "../functions.js";
import trueAnswers from "../trueAnswer.js";
const startGame = () => {
    const notNeeds = [];
    let player1 = 0;
    let player2 = 0;
    console.log('Добро пожаловать в "SiGame"');
    const how = readlineSync.question('Назовите количество вопросов: ')
    for(let i = 0; i < Number(how); i += 1) {
        const rand = randomInteger(1, 2)
        console.log(`Тему выбирает игрок: ${rand} `);
        console.log(Object.keys(questions));
        let tema = readlineSync.question('Тема: ')
        const cap = capitalize(tema);
        if (!Object.hasOwn(questions, cap)) {
            console.log('Выберите существующую тему.');
            i--;
            continue;
        }
        console.log(`Выберите кол-во очков`);
        let chooz = choozing();
        if (notNeeds.some(item => item.cap === cap && item.chooz === chooz)) {
            console.log('Вы уже выбирали эту тему с таким количеством баллов. Пожалуйста, выберите заново.');
            i--;
            continue;
        }
        notNeeds.push({ cap, chooz });
        console.log(`${questions[cap][chooz]}:`);
        const player1Answer = readlineSync.question(`Ответ игрока ${rand}: `);
        
        let getNum = 0;
        if (rand === 1) {
            getNum = 2;
        } else if (rand === 2) {
            getNum = 1;
        }

        const player2Answer = readlineSync.question(`Ответ игрока ${getNum}: `);

        if (capitalize(player1Answer) === trueAnswers[cap][chooz]) {
            if (rand === 1) {
                console.log(`Игрок номер ${rand} + ${chooz}!!!`);
                player1 += chooz;
            } else if (rand === 2) {
                console.log(`Игрок номер ${rand} + ${chooz}!!!`);
                player2 += chooz;
            }
        } else if (capitalize(player1Answer) !== trueAnswers[cap][chooz]) {
            if (rand === 1) {
                console.log(`Игрок номер ${rand}, неверно :(`);
            } else if (rand === 2) {
                console.log(`Игрок номер ${rand}, неверно :(`);
            }
        }
        if (capitalize(player2Answer) === trueAnswers[cap][chooz]) {
            if (getNum === 1) {
                console.log(`Игрок номер ${getNum} + ${chooz}!!!`);
                player1 += chooz;
            } else if (getNum === 2) {
                console.log(`Игрок номер ${getNum} + ${chooz}!!!`);
                player2 += chooz;
            }
        } else if (capitalize(player2Answer) !== trueAnswers[cap][chooz]) {
            if (getNum === 1) {
                console.log(`Игрок номер ${getNum}, неверно :(`);
            } else if (getNum === 2) {
                console.log(`Игрок номер ${getNum}, неверно :(`);
            }
        }
        const want1 = readlineSync.question(`Игрок номер 1, вы хотите узнать счёт?: `);
        if (want1 === 'да') console.log(`Счёт игрока номер 1: ${player1}`);
        const want2 = readlineSync.question(`Игрок номер 2, вы хотите узнать счёт?: `);
        if(want2 === 'да') console.log(`Счёт игрока номер 1: ${player2}`);
    }
        if (player1 > player2) {
            console.log(`Игрок номер 1 - победитель (${player1} баллов)`);
            return { 'Игрок 1':player1 };
        } else if (player2 > player1) {
            console.log(`Игрок номер 2 - победитель (${player2} баллов)`);
            return { 'Игрок 2':player2 }; 
        } else {
            console.log(`Ничья =) (${player1} баллов и ${player2} баллов)`);
            return  {'Ничья': {'Игрок 1': player1, 'Игрок 2': player2}}
        }
    
};

const realStartGame = () => {
    let iter = 1;
    let resultObj = {};
    while(true) {
        const start = readlineSync.question('Вы хотите начать игру?: ');
        if(start === 'да') {
            resultObj[`Игра ${iter}`] = startGame();
        } else if (start === 'нет') {
            return console.log('Очень жаль =(');
        } else {
            return console.log(resultObj);
        }
        iter++
    }
};

realStartGame();