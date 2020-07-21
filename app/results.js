import { loadGameData, findById, mungeData } from './utils.js';
import pokedex from '../data/pokemon.js';
const results = loadGameData();
const resetButton = document.getElementById('reset-button');
const ctx = document.getElementById('chart').getContext('2d');
const names = mungeData(results, 'name');
const catchData = mungeData(results, 'caught');
const encounterData = mungeData(results, 'encountered');


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

// const data = [12, 19, 3, 5, 2, 3];
// const labelColors = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];

const myChart = new Chart(ctx, { //eslint-disable-line
    type: 'bar',
    data: {
        labels: names,
        datasets: [
            {
                label: 'Times Caught',
                data: catchData,
                backgroundColor: 'red'
            },
            {
                label: 'Times Encountered',
                data: encounterData,
                backgroundColor: 'blue'
            }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});