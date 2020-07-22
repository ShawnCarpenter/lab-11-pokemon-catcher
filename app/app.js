// import functions and grab DOM elements
import { generateGroup, findById, saveGameData } from './utils.js';
import pokedex from '../data/pokemon.js';
const gamesPlayed = document.getElementById('games');

// initialize state
let count = 0;
let encounteredPokemon = [];

// set event listeners to update state and DOM

populateGameBoard();

function populateGameBoard() {
    if (count >= 2) {
        saveGameData(encounteredPokemon);
        window.location = 'results.html';
    }
    
    gamesPlayed.textContent = `You have caught ${count} Pokemon so far`;
    count++;

    const gameBoard = document.getElementById('game-board');
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    const round = generateGroup();

    for (let i = 0; i < round.length; i++){
        const pokemonId = round[i]._id;
        const pokemonObj = findById(pokemonId, pokedex);
        hasEncountered(pokemonId);
        const caughtCount = findById(pokemonId, encounteredPokemon).caught;
        const encounteredCount = findById(pokemonId, encounteredPokemon).encounters;
        const pokemonName = pokemonObj.pokemon;
        const labelEl = document.createElement('label');
        const nameEl = document.createElement('h2');
        const inputEl = document.createElement('input');
        const imgEl = document.createElement('img');
        const encounteredEl = document.createElement('div');
        const caughtEl = document.createElement('div');
        
        nameEl.textContent = pokemonName;
        encounteredEl.textContent = `Encountered ${encounteredCount} times`;
        caughtEl.textContent = `Caught ${caughtCount} times`;
        inputEl.type = 'radio';
        inputEl.value = round[i]._id;
        inputEl.name = 'wildPokemon';
        inputEl.addEventListener('click', event => {
            const chosenPokemon = event.target.value;
            catchEm(chosenPokemon);
            populateGameBoard();
        });
        imgEl.src = round[i].url_image;
        labelEl.append(nameEl, inputEl, imgEl, encounteredEl, caughtEl);
        
        gameBoard.appendChild(labelEl); 
    }

}

function catchEm(id) {
    let caughtYet = findById(id, encounteredPokemon);
    if (caughtYet) {
        caughtYet.caught++;
    } else {
        const newCatch = {
            _id: id,
            encounters: 0,
            caught: 1
        };
        encounteredPokemon.push(newCatch);
    }
}

function hasEncountered(id) {
    let encounteredYet = findById(id, encounteredPokemon);
    if (encounteredYet) {
        encounteredYet.encounters ++;
    } else {
        const newEncounter = {
            _id: id,
            encounters:1,
            caught:0
        };
        encounteredPokemon.push(newEncounter);
    }
}