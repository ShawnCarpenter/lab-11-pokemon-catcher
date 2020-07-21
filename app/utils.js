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
    const stringyData = JSON.stringify(arr);
    localStorage.setItem('POKEMON', stringyData);
}

export function loadGameData() {
    const rawData = localStorage.getItem('POKEMON');
    const parsedData = JSON.parse(rawData);
    return parsedData;
}

export function mungeData(arr, item) {
    // const namesArray = [];
    // const caughtArray = [];
    // const encounteredArray = [];
    
    const returnArray = [];
    arr.forEach(pokemon => {
        let returnItem = null;
        switch (item) {
            case 'name' :
                returnItem = findById(pokemon._id, pokedex).pokemon;
                break;
            case 'color_1' :
                returnItem = findById(pokemon._id, pokedex).color_1;
                break;
            case 'color_2' :
                returnItem = findById(pokemon._id, pokedex).color_2;
                break;
            case 'encountered' :
                returnItem = pokemon.encounters;
                break;
            case 'caught' :
                returnItem = pokemon.caught;
                break;
        }
        returnArray.push(returnItem);
    });
    return returnArray;
}
