//import data
import pokedex from '../data/pokemon.js';



export function generateGroup(){
    const groupOfThree = [];
    let card1, card2, card3 = 0;
    do {
        card1 = Math.floor(Math.random() * pokedex.length);
        card2 = Math.floor(Math.random() * pokedex.length);
        card3 = Math.floor(Math.random() * pokedex.length);
    } while (card1 === card2 || card2 === card3 || card1 === card3);
    let card1Obj = pokedex[card1];
    let card2Obj = pokedex[card2];
    let card3Obj = pokedex[card3];
    groupOfThree.push(card1Obj, card2Obj, card3Obj);
    return groupOfThree;
}

export function findById(id, array) {
    const foundItem = null;
    for (let i = 0; i < array.length; i++) {
        if (id === array[i]._id) return array[i];
    }
    return foundItem;
}

export function saveGameData(arr) {
    const existingData = loadGameData() || [];
    existingData.push(arr);
    const stringyData = JSON.stringify(existingData);
    localStorage.setItem('POKEMON', stringyData);
}

export function loadGameData() {
    const rawData = localStorage.getItem('POKEMON');
    const parsedData = JSON.parse(rawData);
    return parsedData;
}

export function mungeData(arr, item) {
    const returnArray = [];
    arr.forEach(pokemon => {
        let returnItem = null;
        if (item === 'encounters' || item === 'caught') returnItem = pokemon[item];
        else returnItem = findById(pokemon._id, pokedex)[item];
        returnArray.push(returnItem);
    });
    return returnArray;
}

export function buildTables(results) {
    const caughtTable = document.getElementById('caught');
    const encounteredTable = document.getElementById('encountered');
    results.forEach(pokemon => {
        const url = findById(pokemon._id, pokedex).url_image;
        const name = findById(pokemon._id, pokedex).pokemon;
        const timesCaught = pokemon.caught;
        const timesEncountered = pokemon.encounters;
        const rowEl = document.createElement('tr');
        const pokemonBoxEl = document.createElement('td');
        const nameEl = document.createElement('div');
        const imgEl = document.createElement('img');
        const encounteredEl = document.createElement('td');
        
        nameEl.textContent = name;
        imgEl.src = url;
        imgEl.alt = `Picture of ${name}`;
        imgEl.style.width = '50px';
        encounteredEl.textContent = timesEncountered;
        pokemonBoxEl. append(imgEl, nameEl);
        rowEl.append(pokemonBoxEl, encounteredEl);
        if (timesCaught > 0) {
            const caughtEl = document.createElement('td');
            caughtEl.textContent = timesCaught;
            rowEl.append(caughtEl);
            caughtTable.append(rowEl);
        } else {
            encounteredTable.append(rowEl);
        }
    });
}

export function consolidateResults(allResults) {
    const returnResults = [];
    allResults.forEach(gameResult => {
        gameResult.forEach(pokemon => {
            const thisPokemon = findById(pokemon._id, returnResults);
            if (thisPokemon){
                thisPokemon.encounters += pokemon.encounters;
                thisPokemon.caught += pokemon.caught; 
            } else {
                returnResults.push(pokemon);
            }
        });
    });
    return returnResults;
}
export function count(pokemon){
    const counter = {};
    for (let i = 0; i < pokemon.length; i++) {
        const myPoke = pokemon[i];
        const key = myPoke.pokemon;
        if (counter[key]) {
            counter[key]++;
        } else {
            counter[key] = 1;
        }
    }
}
