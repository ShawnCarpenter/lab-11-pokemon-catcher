import { loadGameData, findById } from './utils.js';
import pokedex from '../data/pokemon.js';
const results = loadGameData();
const resetButton = document.getElementById('reset-button');

function buildTables() {
    const caughtTable = document.getElementById('caught');
    const encounteredTable = document.getElementById('encountered');
    results.forEach(pokemon => {
        const name = findById(pokemon._id, pokedex).pokemon;
        const timesCaught = pokemon.caught;
        const timesEncountered = pokemon.encounters;
        const rowEl = document.createElement('tr');
        const nameEl = document.createElement('td');
        const encounteredEl = document.createElement('td');
        
        nameEl.textContent = name;
        encounteredEl.textContent = timesEncountered;

        rowEl.append(nameEl, encounteredEl);
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

buildTables();

resetButton.addEventListener('click', ()=> {
    window.location = 'index.html';
});
